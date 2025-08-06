import dns.resolver
import aiohttp
import asyncio
import time
import json
import os
from datetime import datetime
from aiohttp.client_exceptions import ClientError

# Hàm check DNS với Google DNS
async def check_dns(domain):
    resolver = dns.resolver.Resolver()
    resolver.nameservers = ["8.8.8.8", "8.8.4.4"]  # Google DNS
    try:
        resolver.resolve(domain, "A")
        return "OK"
    except Exception as e:
        return f"DNS Error: {e}"

# Hàm check HTTP request
async def check_http(url):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=10, allow_redirects=True) as resp:
                final_url = str(resp.url)
                status = resp.status
                return status, final_url
    except ClientError as e:
        return None, f"HTTP Error: {e}"
    except asyncio.TimeoutError:
        return None, "HTTP Timeout"

# Phân loại block
def classify_block(http_status, url, final_url):
    if http_status != 200:
        return "http_error", True
    elif url.rstrip("/") != final_url.rstrip("/"):  # redirect khác domain
        return "redirect", True
    else:
        return "not_blocked", False

# Main
async def main():
    urls = [
        "https://xo88.pro",
        "https://uk88.vip/",
        "https://five88.com",
        "https://sv88.com",
        "https://may88.com",
        "https://vivu88.com",
        "https://fo88.com",
        "https://dom88.com",
        "https://rik88.bet",
        "https://red88.com",
        "https://sky88.com",
        "https://mibet.com",
        "https://8live.biz",
        "https://86bet.net",
        "https://topbet.top",
        "https://debet.so",
        "https://zbet.tv",
        "https://sin88.com",
        "https://vin88.com",
        "https://9win.top",
        "https://vic88.com",
        "https://zo88.com",
        "https://bbet.win",
        "https://yo88.is",
        "https://hit.club",
        "https://zo.win",
        "https://nhat.vip",
        "https://sun.win",
        "https://gem.win",
        "https://may.club",
        "https://rikvip.win",
        "https://win79.club"

    ]

    start_time = time.time()
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    now_file = datetime.now().strftime("%Y%m%d_%H%M%S")

    results = []
    for url in urls:
        domain = url.split("//")[-1].split("/")[0]
        dns_status = await check_dns(domain)
        if dns_status != "OK":
            results.append({
                "url": url,
                "dns": dns_status,
                "http": None,
                "final": None,
                "block_type": "dns_failed",
                "blocked": True
            })
            continue

        http_status, final_url = await check_http(url)
        block_type, blocked = classify_block(http_status, url, final_url)

        results.append({
            "url": url,
            "dns": dns_status,
            "http": http_status,
            "final": final_url,
            "block_type": block_type,
            "blocked": blocked
        })

    runtime = round(time.time() - start_time, 2)

    # Tạo folder breport nếu chưa có
    os.makedirs("B_Report", exist_ok=True)

    # Xuất file txt
    txt_report = f"B_Report/report_{now_file}.txt"
    with open(txt_report, "w", encoding="utf-8") as f:
        f.write(f"Report time: {now}\n")
        f.write(f"Total runtime: {runtime} sec\n\n")
        for r in results:
            f.write(f"{r['url']} -> DNS={r['dns']}, HTTP={r['http']}, Final={r['final']}, "
                    f"BlockType={r['block_type']}, Blocked={r['blocked']}\n")

    # Xuất file json
    json_report = f"B_Report/report_{now_file}.json"
    with open(json_report, "w", encoding="utf-8") as f:
        json.dump({
            "report_time": now,
            "runtime": runtime,
            "results": results
        }, f, ensure_ascii=False, indent=2)

    print(f"✅ Report saved to {txt_report} and {json_report}")

if __name__ == "__main__":
    asyncio.run(main())
