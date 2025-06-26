from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import base64
import io
import numpy as np
import cv2
import os

app = Flask(__name__)

# Decode base64 -> PIL image
# def decode_base64_image(base64_data):
#     image_data = base64.b64decode(base64_data)
#     return Image.open(io.BytesIO(image_data)).convert("RGB")

def decode_base64_image(base64_str):
    try:
        image_data = base64.b64decode(base64_str)
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        return image
    except Exception as e:
        print("❌ Decode image lỗi:", e)
        return None

# OCR hướng dẫn (text màu bất kỳ, ví dụ: "Nhập chữ màu đỏ")
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

# OCR ký tự có màu cụ thể
@app.route('/ocr', methods=['POST'])
def ocr_by_color():
    try:
        data = request.get_json()

        # Lấy ảnh base64 từ request
        base64_str = data.get('image', '')
        if not base64_str:
            return jsonify({'error': 'Missing image'}), 400

        pil_img = decode_base64_image(base64_str)
        if pil_img is None:
            return jsonify({'error': 'Image decoding failed'}), 400

        # Lấy màu cần OCR
        color = data.get('color', '').lower()
        if color not in ['red', 'green', 'black']:
            return jsonify({'error': f'Unsupported color: {color}'}), 400

        # Convert sang OpenCV format
        np_img = np.array(pil_img)
        hsv = cv2.cvtColor(np_img, cv2.COLOR_RGB2HSV)

        # Lọc theo màu
        if color == 'red':
            mask1 = cv2.inRange(hsv, (0, 70, 50), (10, 255, 255))
            mask2 = cv2.inRange(hsv, (160, 70, 50), (180, 255, 255))
            mask = cv2.bitwise_or(mask1, mask2)
        elif color == 'green':
            mask = cv2.inRange(hsv, (40, 70, 70), (90, 255, 255))
        elif color == 'black':
            mask = cv2.inRange(hsv, (0, 0, 0), (180, 255, 60))  # tăng V một chút

        # Lọc ảnh
        filtered = cv2.bitwise_and(np_img, np_img, mask=mask)

        # Convert sang grayscale
        gray = cv2.cvtColor(filtered, cv2.COLOR_RGB2GRAY)

        # Threshold để làm rõ
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Gỡ nhiễu nhỏ nếu cần (tuỳ vào captcha)
        # kernel = np.ones((2, 2), np.uint8)
        # thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

        # OCR
        text = pytesseract.image_to_string(
            thresh,
            config='--psm 7 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        )

        # Lưu debug nếu cần
        debug_dir = './debug'
        os.makedirs(debug_dir, exist_ok=True)
        cv2.imwrite(f"{debug_dir}/{color}_mask.png", mask)
        cv2.imwrite(f"{debug_dir}/{color}_filtered.png", filtered)
        cv2.imwrite(f"{debug_dir}/{color}_thresh.png", thresh)

        return jsonify({'result': text.strip()})

    except Exception as e:
        print("❌ Lỗi OCR:", e)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5001, debug=True)