import asyncio
import aiohttp
import dns.resolver
import json
import os
import time
from datetime import datetime

# ISP DNS map
DNS_MAP = {
    "Google": "8.8.8.8",
    "Viettel": "203.113.131.1",
    "VNPT": "203.162.57.108",
    "FPT": "210.245.24.20"
}

# folder report
REPORT_FOLDER = "B_Report"


async def resolve_async(domain: str, nameserver: str, timeout=5):
    """DNS resolution via specific nameserver"""
    loop = asyncio.get_event_loop()

    def func():
        try:
            resolver = dns.resolver.Resolver()
            resolver.nameservers = [nameserver]
            resolver.lifetime = timeout
            resolver.timeout = timeout
            answers = resolver.resolve(domain, "A")
            return [r.address for r in answers]
        except Exception as e:
            return f"DNS Error: {e}"

    try:
        return await loop.run_in_executor(None, func)
    except asyncio.CancelledError:
        return "DNS Cancelled"


async def fetch_http(domain: str, timeout=8):
    """HTTP fetch with redirect following"""
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(domain, timeout=timeout, allow_redirects=True) as resp:
                final_url = str(resp.url)
                status = resp.status
                history = len(resp.history)
                return status, final_url, history
    except asyncio.CancelledError:
        return "Cancelled", None, None
    except Exception as e:
        return f"HTTP Error: {e}", None, None


async def check_domain_for_isp(domain: str, isp: str, nameserver: str):
    bare_domain = domain.replace("https://", "").replace("http://", "").strip("/")
    dns_result = await resolve_async(bare_domain, nameserver)

    result = {
        "domain": domain,
        "isp": isp,
        "dns": dns_result,
        "http": None,
        "final": None,
        "block_type": None,
        "blocked": None,
    }

    # DNS failed
    if isinstance(dns_result, str) and dns_result.startswith("DNS Error"):
        result["block_type"] = "dns_block"
        result["blocked"] = True
        return result

    # DNS OK → check HTTP
    http_code, final_url, history = await fetch_http(domain)
    result["http"] = http_code
    result["final"] = final_url

    if isinstance(http_code, str) and http_code.startswith("HTTP Error"):
        result["block_type"] = "http_block"
        result["blocked"] = True
    elif http_code == "Cancelled":
        result["block_type"] = "http_block"
        result["blocked"] = True
    else:
        if http_code != 200 or (history and history > 0):
            result["block_type"] = "http_block"
            result["blocked"] = True
        else:
            result["block_type"] = "not_blocked"
            result["blocked"] = False

    return result


async def run_and_tag(domains):
    tasks = []
    for domain in domains:
        for isp, ns in DNS_MAP.items():
            tasks.append(check_domain_for_isp(domain, isp, ns))

    results = await asyncio.gather(*tasks, return_exceptions=True)

    safe_results = []
    for r in results:
        if isinstance(r, Exception):
            safe_results.append({"error": str(r)})
        else:
            safe_results.append(r)
    return safe_results


def save_report(records, runtime_sec):
    os.makedirs(REPORT_FOLDER, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    txt_path = os.path.join(REPORT_FOLDER, f"report_{timestamp}.txt")
    json_path = os.path.join(REPORT_FOLDER, f"report_{timestamp}.json")

    report_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # TXT
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(f"Report time: {report_time}\n")
        f.write(f"Total runtime: {runtime_sec:.2f} sec\n\n")
        for rec in records:
            f.write(
                f"{rec['isp']:7} {rec['domain']} -> DNS={rec['dns']}, "
                f"HTTP={rec['http']}, Final={rec['final']}, "
                f"BlockType={rec['block_type']}, Blocked={rec['blocked']}\n"
            )

    # JSON
    output_json = {
        "report_time": report_time,
        "total_runtime_sec": round(runtime_sec, 2),
        "records": records,
    }
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(output_json, f, ensure_ascii=False, indent=2)

    print(f"Saved reports -> {txt_path}, {json_path}")


def main():
    domains = [
        "https://vin88.com",
        "https://vic88.com",
        "https://sun.win",
        "https://zo88.com"
    ]

    start = time.time()
    all_records = asyncio.run(run_and_tag(domains))
    runtime_sec = time.time() - start

    save_report(all_records, runtime_sec)


if __name__ == "__main__":
    main()
