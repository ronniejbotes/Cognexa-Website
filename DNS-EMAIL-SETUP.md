# DNS records for cognexa.co.za (email authentication)

SEOptimer flagged **SPF Record** and **DMARC Record** as missing. Neither lives
in this repo — both are DNS TXT records, added in **hPanel → Domains →
cognexa.co.za → DNS / Nameservers → DNS Records**.

## STATUS: resolved 26 July 2026 — all three verified live

| Fact | Value |
| --- | --- |
| Nameservers | `ns1.dns-parking.com`, `ns2.dns-parking.com` (Hostinger) |
| Mail routing | `mx1.hostinger.com` (5), `mx2.hostinger.com` (10) — Hostinger Email |
| SPF at root | ✅ `v=spf1 include:_spf.mail.hostinger.com ~all` (exactly one record) |
| DMARC at `_dmarc` | ✅ `v=DMARC1; p=none; rua=mailto:hello@cognexa.co.za; fo=1` |
| DKIM | ✅ `hostingermail-a/-b/-c._domainkey` → `*.dkim.mail.hostinger.com` |
| SPF lookup count | 3 of the permitted 10 — plenty of headroom |

Note on the DKIM selectors: they are `hostingermail-a/-b/-c` (letters), **not**
`hostingermail1/2` (digits). An earlier check used the digit form and wrongly
concluded DKIM was absent. Use the letter form when verifying.

---

## 1. SPF — add one TXT record

| Field | Value |
| --- | --- |
| Type | `TXT` |
| Name / Host | `@` |
| TTL | `14400` |
| Value | `v=spf1 include:_spf.mail.hostinger.com ~all` |

The include was verified to resolve:
`_spf.mail.hostinger.com` → `v=spf1 include:relay.mail.hostinger.com include:relay.mailchannels.net ~all`

**A domain may only ever have ONE SPF record.** If another appears later (a
newsletter tool, a CRM), do not add a second — merge its `include:` into this
one. Two SPF records is itself an authentication failure.

`~all` (softfail) is deliberate. Use `-all` (hardfail) only once you are certain
every system that sends as `@cognexa.co.za` is listed, or legitimate mail starts
bouncing.

## 2. DMARC — add one TXT record

| Field | Value |
| --- | --- |
| Type | `TXT` |
| Name / Host | `_dmarc` |
| TTL | `14400` |
| Value | `v=DMARC1; p=none; rua=mailto:hello@cognexa.co.za; fo=1` |

`p=none` is monitor-only: it satisfies the audit and starts sending you reports
without any risk of legitimate mail being rejected. Leave it there for 2–4 weeks,
read the reports, and only then tighten:

`p=none` → `p=quarantine` → `p=reject`

Do not start at `p=reject`. If SPF or DKIM is misaligned, that silently destroys
your deliverability — including quotes and lead replies.

## 3. DKIM — already in place

Not audited by SEOptimer, but DMARC is far weaker without it. Hostinger had
already published three CNAME selectors, so nothing was needed here.

## Verifying

```bash
dig +short TXT cognexa.co.za                                 # v=spf1 …
dig +short TXT _dmarc.cognexa.co.za                          # v=DMARC1 …
dig +short CNAME hostingermail-a._domainkey.cognexa.co.za    # …dkim.mail.hostinger.com
dig +short TXT cognexa.co.za | grep -c v=spf1                # must be exactly 1
```

All four confirmed on 26 July 2026.

## Next step, in a few weeks

DMARC is deliberately at `p=none` (monitor only). Once the `rua` reports at
hello@cognexa.co.za show legitimate mail passing SPF and DKIM consistently,
tighten in order:

`p=none` → `p=quarantine` → `p=reject`

Skipping straight to `p=reject` is how businesses silently lose real email.
