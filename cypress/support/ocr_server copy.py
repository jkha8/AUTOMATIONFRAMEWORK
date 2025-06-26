from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import base64
import io
import numpy as np
import cv2
import os

app = Flask(__name__)

# Giải mã base64 thành ảnh PIL
def decode_base64_image(base64_str):
    try:
        image_data = base64.b64decode(base64_str)
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        return image
    except Exception as e:
        print("❌ Decode image lỗi:", e)
        return None

# OCR ký tự theo màu
@app.route('/ocr', methods=['POST'])
def ocr_by_color():
    try:
        data = request.get_json()
        base64_str = data.get('image', '')
        color = data.get('color', '').lower()

        if not base64_str:
            return jsonify({'error': 'Missing image'}), 400
        if color not in ['red', 'green', 'black']:
            return jsonify({'error': f'Unsupported color: {color}'}), 400

        pil_img = decode_base64_image(base64_str)
        if pil_img is None:
            return jsonify({'error': 'Image decoding failed'}), 400

        np_img = np.array(pil_img)

        # Debug directory
        debug_dir = './debug'
        os.makedirs(debug_dir, exist_ok=True)

        if color == 'black':
            # Dùng ngưỡng độ sáng (grayscale) để lọc chữ đen
            gray = cv2.cvtColor(np_img, cv2.COLOR_RGB2GRAY)
            _, mask = cv2.threshold(gray, 80, 255, cv2.THRESH_BINARY_INV)  # chữ đen thành trắng
        else:
            # Lọc theo HSV cho red/green
            hsv = cv2.cvtColor(np_img, cv2.COLOR_RGB2HSV)
            if color == 'red':
                mask1 = cv2.inRange(hsv, (0, 70, 50), (10, 255, 255))
                mask2 = cv2.inRange(hsv, (160, 70, 50), (180, 255, 255))
                mask = cv2.bitwise_or(mask1, mask2)
            elif color == 'green':
                mask = cv2.inRange(hsv, (40, 70, 70), (90, 255, 255))

        # Áp dụng mask để giữ lại chỉ phần ký tự theo màu
        filtered = cv2.bitwise_and(np_img, np_img, mask=mask)

        # Chuyển sang grayscale
        gray = cv2.cvtColor(filtered, cv2.COLOR_RGB2GRAY)

        # Threshold để rõ chữ
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # (Tuỳ chọn) Làm dày chữ
        kernel = np.ones((2, 2), np.uint8)
        thresh = cv2.dilate(thresh, kernel, iterations=1)

        # Lưu ảnh debug
        cv2.imwrite(f"{debug_dir}/{color}_mask.png", mask)
        cv2.imwrite(f"{debug_dir}/{color}_filtered.png", filtered)
        cv2.imwrite(f"{debug_dir}/{color}_thresh.png", thresh)

        # OCR
        text = pytesseract.image_to_string(
            thresh,
            config='--psm 7 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        )

        return jsonify({'result': text.strip()})

    except Exception as e:
        print("❌ Lỗi OCR:", e)
        return jsonify({'error': str(e)}), 500

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

if __name__ == '__main__':
    app.run(port=5001, debug=True)
