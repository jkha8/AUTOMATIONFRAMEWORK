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

LOG_FILE = "isp_block_report.txt"
TIMEOUT = 5
# ================


def write_report(msg):
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(msg + "\n")


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
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    write_report(f"\n=== Report at {timestamp} ===")

    for domain in DOMAINS:
        write_report(f"\n--- Checking {domain} ---")

        baseline = check_dns(domain, ISP_DNS["Google"][0])
        write_report(f"Google DNS: {baseline}")

        for isp, dns_list in ISP_DNS.items():
            if isp == "Google":
                continue
            for dns_ip in dns_list:
                result = check_dns(domain, dns_ip)
                write_report(f"{isp} ({dns_ip}): {result}")

                # Compare với baseline
                if result != baseline:
                    write_report(f"[ALERT] {isp} ({dns_ip}) khác với Google!")

        # HTTPS test
        https_result = check_https(domain)
        write_report(f"HTTP check: {https_result}")


if __name__ == "__main__":
    main()
