import dns.resolver
import requests
import json
import time
from datetime import datetime

# Danh sách DNS phổ biến VN + Google baseline
DNS_SERVERS = {
    "Google": "8.8.8.8",
    "Viettel": "203.113.131.1",
    "VNPT": "203.162.4.190",
    "FPT": "210.245.24.20"
}

# Danh sách domain cần kiểm tra
DOMAINS = [
    "vin88.com",
    "vic88.com",
    "sun.win",
    "zo88.com"
]

def test_domain(domain, dns_server):
    resolver = dns.resolver.Resolver()
    resolver.nameservers = [dns_server]
    result = {
        "domain": domain,
        "dns": dns_server,
        "dns_status": None,
        "http_code": None,
        "final_url": None,
        "status_type": None,
        "redirect_flag": None,
        "redirect_chain": []
    }

    # 1. Kiểm tra DNS
    try:
        resolver.resolve(domain, "A")
        result["dns_status"] = "ok"
    except Exception as e:
        result["dns_status"] = f"DNS Error: {e}"
        result["status_type"] = "dns_failed"
        return result

    # 2. Kiểm tra HTTP/HTTPS
    try:
        resp = requests.get("https://" + domain, timeout=10, allow_redirects=True)

        result["http_code"] = resp.status_code
        result["final_url"] = resp.url

        if resp.history and any(r.status_code in (301, 302) for r in resp.history):
            result["redirect_flag"] = "redirected"
            result["redirect_chain"] = [f"{r.status_code}->{r.url}" for r in resp.history]
        else:
            result["redirect_flag"] = "direct"

        result["status_type"] = "ok"

    except requests.exceptions.RequestException as e:
        result["http_code"] = None
        result["final_url"] = None
        result["status_type"] = "http_failed"
        result["redirect_flag"] = None

    return result


def run_check():
    all_results = []
    for domain in DOMAINS:
        for isp, dns_server in DNS_SERVERS.items():
            result = test_domain(domain, dns_server)
            result["isp"] = isp
            all_results.append(result)
    return all_results


if __name__ == "__main__":
    start_time = time.time()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    file_stamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    results = run_check()
    total_runtime = round(time.time() - start_time, 2)

    # Ghi file JSON
    json_filename = f"report_{file_stamp}.json"
    with open(json_filename, "w", encoding="utf-8") as f:
        json.dump({
            "timestamp": timestamp,
            "total_runtime_sec": total_runtime,
            "results": results
        }, f, ensure_ascii=False, indent=2)

    # Ghi file text
    txt_filename = f"report_{file_stamp}.txt"
    with open(txt_filename, "w", encoding="utf-8") as f:
        f.write(f"Check Report - {timestamp}\n")
        f.write(f"Total runtime: {total_runtime} sec\n\n")
        for r in results:
            f.write(f"[{r['isp']}] {r['domain']} -> "
                    f"dns={r['dns_status']}, "
                    f"http={r['http_code']}, "
                    f"final={r['final_url']}, "
                    f"status={r['status_type']}, "
                    f"redirect={r['redirect_flag']}, "
                    f"chain={r['redirect_chain']}\n")

    print(f"✅ Report generated: {txt_filename}, {json_filename}")
