import dns.resolver

def check_dns(domain, dns_server):
    resolver = dns.resolver.Resolver()
    resolver.nameservers = [dns_server]
    try:
        answers = resolver.resolve(domain, "A")
        return [str(r) for r in answers]
    except Exception as e:
        return f"Blocked or failed: {e}"

# Example: DNS server của 3 ISP
viettel_dns = "203.113.131.1"
vnpt_dns = "203.162.4.190"
fpt_dns = "210.245.24.20"

print("Viettel:", check_dns("https://vin88.com/", viettel_dns))
print("VNPT:", check_dns("https://vin88.com/", vnpt_dns))
print("FPT:", check_dns("https://vin88.com/", fpt_dns))
