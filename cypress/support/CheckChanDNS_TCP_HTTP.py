import dns.resolver
import requests
import datetime

# ==== Config ====
DOMAINS = ["vin88.com", "vic88.com"]  # domain cần kiểm tra

ISP_DNS = {
    "Viettel": ["203.113.131.1", "203.113.131.2"],
    "VNPT": ["203.162.4.190", "203.162.4.191"],
    "FPT": ["210.245.24.20", "210.245.24.22"],
    "Google": ["8.8.8.8"]  # baseline
}

TELEGRAM_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"
LOG_FILE = "isp_block_check.log"
TIMEOUT = 5
# ================


def log_message(msg):
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"{datetime.datetime.now()} - {msg}\n")


def notify_telegram(msg):
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        requests.post(url, data={"chat_id": TELEGRAM_CHAT_ID, "text": msg})
    except Exception as e:
        log_message(f"Telegram error: {e}")


def check_dns(domain, dns_server):
    resolver = dns.resolver.Resolver()
    resolver.timeout = TIMEOUT
    resolver.lifetime = TIMEOUT
    resolver.nameservers = [dns_server]
    try:
        answers = resolver.resolve(domain, "A")
        return [str(r) for r in answers]
    except Exception as e:
        return f"Blocked/Fail: {e}"


def check_https(domain):
    url = f"https://{domain}"
    try:
        r = requests.get(url, timeout=TIMEOUT)
        return f"HTTPS {r.status_code}, len={len(r.text)}"
    except Exception as e:
        return f"HTTPS error: {e}"


def main():
    for domain in DOMAINS:
        log_message(f"\n=== Checking {domain} ===")

        # Baseline từ Google DNS
        baseline = check_dns(domain, ISP_DNS["Google"][0])
        log_message(f"Google DNS: {baseline}")

        # Loop qua tất cả DNS của các ISP
        for isp, dns_list in ISP_DNS.items():
            if isp == "Google":
                continue
            for dns_ip in dns_list:
                result = check_dns(domain, dns_ip)
                log_message(f"{isp} ({dns_ip}): {result}")

                # So sánh với baseline
                if result != baseline:
                    alert = f"[ALERT] {isp} ({dns_ip}) có thể đã chặn {domain}! Google: {baseline}, {isp}: {result}"
                    log_message(alert)
                    notify_telegram(alert)

        # HTTP test
        https_result = check_https(domain)
        log_message(f"HTTP check: {https_result}")


if __name__ == "__main__":
    main()
