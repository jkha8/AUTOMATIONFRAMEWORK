import pyautogui
import time

# Toạ độ click (ví dụ: x=500, y=500)
CLICK_X, CLICK_Y = 500, 500

while True:
    # Nhấn Command + R (refresh)
    pyautogui.hotkey("command", "r")
    print("Đã refresh trang")

    # Chờ 2 giây để trang load xong
    time.sleep(2)

    # Click chuột
    pyautogui.click(CLICK_X, CLICK_Y)
    print(f"Đã click tại ({CLICK_X}, {CLICK_Y})")

    # Đợi 10 giây rồi lặp lại
    time.sleep(10)
