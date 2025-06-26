from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import base64
import io
import numpy as np
import cv2
import os

app = Flask(__name__)

def decode_base64_image(base64_str):
    try:
        image_data = base64.b64decode(base64_str)
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        return np.array(image)
    except Exception as e:
        print("❌ Decode lỗi:", e)
        return None

def filter_color(image_np, color_name):
    hsv = cv2.cvtColor(image_np, cv2.COLOR_RGB2HSV)
    if color_name == 'red':
        mask1 = cv2.inRange(hsv, (0, 70, 50), (10, 255, 255))
        mask2 = cv2.inRange(hsv, (160, 70, 50), (180, 255, 255))
        return cv2.bitwise_or(mask1, mask2)
    elif color_name == 'green':
        return cv2.inRange(hsv, (40, 70, 70), (90, 255, 255))
    elif color_name == 'black':
        return cv2.inRange(hsv, (0, 0, 0), (180, 255, 60))
    else:
        return None

def extract_by_color(image_np, color_name):
    mask = filter_color(image_np, color_name)
    if mask is None:
        return '', None

    filtered = cv2.bitwise_and(image_np, image_np, mask=mask)
    gray = cv2.cvtColor(filtered, cv2.COLOR_RGB2GRAY)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(thresh, connectivity=8)

    components = []
    for i in range(1, num_labels):
        x, y, w, h, area = stats[i]
        if area < 30:
            continue
        char_img = thresh[y:y+h, x:x+w]
        char_img = cv2.copyMakeBorder(char_img, 10, 10, 10, 10, cv2.BORDER_CONSTANT, value=0)
        char_img = cv2.resize(char_img, (40, 40))
        components.append((x, char_img))

    components.sort(key=lambda x: x[0])
    text = ''
    for _, char_img in components:
        char = pytesseract.image_to_string(
            char_img,
            config='--psm 7 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        ).strip()
        text += char

    return text, thresh

# Test OCR hướng dẫn
@app.route('/ocr-instruction', methods=['POST'])
def ocr_instruction():
    try:
        data = request.get_json()
        img = decode_base64_image(data.get('image', ''))
        if img is None:
            return jsonify({'error': 'Image decoding failed'}), 400
        text = pytesseract.image_to_string(img, lang='vie')
        return jsonify({'result': text.strip()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ocr', methods=['POST'])
def ocr_by_color():
    try:
        data = request.get_json()
        base64_str = data.get('image', '')
        color = data.get('color', '').lower()

        if not base64_str or color not in ['black', 'red', 'green']:
            return jsonify({'error': 'Invalid input'}), 400

        image_np = decode_base64_image(base64_str)
        if image_np is None:
            return jsonify({'error': 'Decode failed'}), 400

        text, _ = extract_by_color(image_np, color)

        return jsonify({'result': text})

    except Exception as e:
        print("❌ OCR lỗi:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
