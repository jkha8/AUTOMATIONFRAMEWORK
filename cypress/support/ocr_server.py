from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import base64
import io
import pytesseract

app = Flask(__name__)

def dominant_color(region):
    avg_color = np.mean(region, axis=(0, 1))  # RGB
    r, g, b = avg_color
    if max(r, g, b) < 80:
        return 'black'
    if r > g and r > b:
        return 'red'
    if g > r and g > b:
        return 'green'
    return 'unknown'

@app.route('/solve-captcha', methods=['POST'])
def solve_captcha():
    data = request.json
    b64data = data['image']
    if ',' in b64data:
        b64data = b64data.split(',')[1]
    image = Image.open(io.BytesIO(base64.b64decode(b64data))).convert("RGB")

    # OCR toàn bộ
    config = '--psm 6 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    text = pytesseract.image_to_string(image, config=config).strip()
    text = ''.join(c for c in text if c.isalnum())

    # Tách ảnh thành từng ký tự
    image_np = np.array(image)
    w = image_np.shape[1]
    char_width = w // len(text)
    colors = []
    for i in range(len(text)):
        x_start = i * char_width
        x_end = (i + 1) * char_width
        region = image_np[:, x_start:x_end]
        colors.append(dominant_color(region))

    return jsonify({"text": text, "colors": colors})


if __name__ == '__main__':
    app.run(port=5001, debug=True)
