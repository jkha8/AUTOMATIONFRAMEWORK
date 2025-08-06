import requests, socket

def check_http(domain):
    try:
        r = requests.get(f"https://{domain}", timeout=5)
        return f"Status: {r.status_code}, Length: {len(r.text)}"
    except Exception as e:
        return f"Blocked or failed: {e}"

print(check_http("vin88.com"))
