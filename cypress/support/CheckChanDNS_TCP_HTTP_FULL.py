import dns.resolver
import requests
import json
import time
from datetime import datetime

# Danh sách DNS các nhà mạng
DNS_SERVERS = {
    "Viettel": "203.113.131.1",
    "VNPT": "203.162.4.191",
    "FPT": "210.245.24.20"
}

# Danh sách domain cần kiểm tra
DOMAINS = [
    "https://vin88.com",
    "https://sun.win",
    "https://zo88.com",
    "https://vic88.com"
]

def check_domain(domain, dns_server):
    resolver = dns.resolver.Resolver()
    resolver.nameservers = [dns_server]
    result = {
        "domain": domain,
        "dns_server": dns_server,
        "status": "Failed",
        "reason": "",
        "http_code": None
    }

    host = domain.replace("https://", "").replace("http://", "").split("/")[0]

    try:
        # 1. Resolve domain qua DNS nhà mạng
        answers = resolver.resolve(host, "A")
        ip = answers[0].to_text()

        # 2. Gọi HTTP
        resp = requests.get(domain, timeout=5)
        result["http_code"] = resp.status_code

        if resp.status_code == 200:
            result["status"] = "Passed"
        else:
            result["reason"] = f"HTTP {resp.status_code}"

    except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer,
            dns.resolver.LifetimeTimeout, dns.resolver.NoNameservers) as e:
        result["reason"] = f"DNS Error: {type(e).__name__}"

        # Thử request trực tiếp để có http_code (nếu domain tồn tại ở DNS hệ thống)
        try:
            resp = requests.get(domain, timeout=5)
            result["http_code"] = resp.status_code
        except requests.exceptions.RequestException as e_http:
            result["reason"] += f", HTTP Error: {str(e_http)}"

    except requests.exceptions.RequestException as e:
        result["reason"] = f"HTTP Error: {str(e)}"

    return result


def main():
    start_time = time.time()
    report = {
        "start": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "results": []
    }

    for domain in DOMAINS:
        for isp, dns_server in DNS_SERVERS.items():
            result = check_domain(domain, dns_server)
            result["isp"] = isp
            report["results"].append(result)

    end_time = time.time()
    report["end"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    report["duration_sec"] = round(end_time - start_time, 2)

    # Xuất JSON
    with open("report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    # Xuất TXT
    with open("report.txt", "w", encoding="utf-8") as f:
        f.write(f"Report Start: {report['start']}\n")
        f.write(f"Report End:   {report['end']}\n")
        f.write(f"Duration:     {report['duration_sec']}s\n\n")
        for r in report["results"]:
            f.write(
                f"[{r['isp']}] {r['domain']} -> {r['status']} "
                f"(reason={r['reason']}, http_code={r['http_code']})\n"
            )

    print("✅ Report saved: report.json & report.txt")


if __name__ == "__main__":
    main()
