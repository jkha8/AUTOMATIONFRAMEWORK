from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import base64
import io
import numpy as np

app = Flask(__name__)

# Xác định màu dựa trên RGB
def get_color(rgb):
    r, g, b = rgb
    if r > 150 and g < 100 and b < 100:
        return 'đỏ'
    elif g > 150 and r < 100 and b < 100:
        return 'xanh'
    elif r < 100 and g < 100 and b < 100:
        return 'đen'
    return 'khác'

# Cắt ảnh thành từng ký tự
def split_chars(img, num_chars=6):
    width, height = img.size
    char_width = width // num_chars
    return [img.crop((i * char_width, 0, (i + 1) * char_width, height)) for i in range(num_chars)]

# Lấy instruction từ phần đầu ảnh
def extract_instruction_text(img):
    width, height = img.size
    instr_crop = img.crop((0, 0, width, int(height * 0.35)))  # giả định instruction chiếm 35% trên
    text = pytesseract.image_to_string(instr_crop, lang='vie', config='--psm 6')
    return text.strip()

# Trích màu từ instruction tiếng Việt
def extract_color_from_instruction(instr_text):
    instr_text = instr_text.lower()
    for color in ['đỏ', 'xanh', 'đen']:
        if color in instr_text:
            return color
    return None

@app.route("/solve", methods=["POST"])
def solve():
    data = request.get_json()
    image_b64 = data.get("image")
    if not image_b64:
        return jsonify({"error": "No image provided"}), 400

    try:
        img = Image.open(io.BytesIO(base64.b64decode(image_b64.split(",")[-1]))).convert("RGB")
    except Exception as e:
        return jsonify({"error": f"Invalid image: {e}"}), 400

    instruction_text = extract_instruction_text(img)
    expected_color = extract_color_from_instruction(instruction_text)
    if not expected_color:
        return jsonify({
            "error": "Không tìm thấy hướng dẫn màu",
            "instruction_text": instruction_text
        }), 400

    # Cắt phần dưới chứa CAPTCHA
    width, height = img.size
    captcha_area = img.crop((0, int(height * 0.35), width, height))
    char_imgs = split_chars(captcha_area)

    result = ""
    for char_img in char_imgs:
        np_img = np.array(char_img)
        pixels = [get_color(tuple(px)) for row in np_img for px in row]
        dominant_color = max(set(pixels), key=pixels.count)
        if dominant_color == expected_color:
            text = pytesseract.image_to_string(char_img, config='--psm 10 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').strip()
            result += text

    return jsonify({
        "captcha": result,
        "instruction": expected_color,
        "instruction_text": instruction_text
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
