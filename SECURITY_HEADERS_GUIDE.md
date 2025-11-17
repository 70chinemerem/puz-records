# Security Headers Guide - Meta Tags vs HTTP Headers

## Understanding the Error

**Error:** "X-Frame-Options may only be set via an HTTP header sent along with a document. It may not be set inside <meta>."

This error occurs because some security headers **cannot** be set using HTML `<meta>` tags. They must be set via HTTP response headers from the server.

## Headers That CANNOT Be Set via Meta Tags ❌

These headers **must** be set via HTTP headers (like in `vercel.json`):

1. **X-Frame-Options** ❌
   - **Why:** Browser security policy - must come from server
   - **Set in:** `vercel.json` (HTTP headers)
   - **Purpose:** Prevents clickjacking attacks

2. **Strict-Transport-Security (HSTS)** ❌
   - **Why:** Must be sent before any content loads
   - **Set in:** `vercel.json` (HTTP headers)
   - **Purpose:** Forces HTTPS connections

3. **Content-Length** ❌
   - **Why:** Server-controlled header
   - **Set in:** Automatically by server

4. **Set-Cookie** ❌
   - **Why:** Server-controlled header
   - **Set in:** Server-side code

## Headers That CAN Be Set via Meta Tags ✅

These headers **can** be set via HTML `<meta>` tags (but HTTP headers are preferred):

1. **X-Content-Type-Options** ✅
   - **Meta tag:** `<meta http-equiv="X-Content-Type-Options" content="nosniff">`
   - **Better:** Set via HTTP header
   - **Purpose:** Prevents MIME type sniffing

2. **X-XSS-Protection** ✅
   - **Meta tag:** `<meta http-equiv="X-XSS-Protection" content="1; mode=block">`
   - **Note:** Deprecated in modern browsers, but still works
   - **Purpose:** Enables XSS protection

3. **Referrer-Policy** ✅
   - **Meta tag:** `<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">`
   - **Also:** Can use `<meta name="referrer" content="...">`
   - **Purpose:** Controls referrer information

4. **Permissions-Policy** ✅
   - **Meta tag:** `<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">`
   - **Purpose:** Controls browser features

5. **Content-Security-Policy** ✅
   - **Meta tag:** `<meta http-equiv="Content-Security-Policy" content="...">`
   - **Better:** Set via HTTP header (more secure)
   - **Purpose:** Prevents XSS and injection attacks

## Best Practice: Use HTTP Headers

**Always prefer HTTP headers over meta tags when possible:**

### Why HTTP Headers Are Better:
1. ✅ **Applied before content loads** - More secure
2. ✅ **Cannot be removed** - Meta tags can be modified
3. ✅ **Standard practice** - Industry standard
4. ✅ **Better performance** - No need to parse HTML

### Current Setup in Your Project:

**✅ HTTP Headers (vercel.json):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000" }
      ]
    }
  ]
}
```

**✅ Meta Tags (HTML - as fallback):**
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">
```

## Summary

| Header | Meta Tag? | HTTP Header? | Current Setup |
|--------|-----------|--------------|---------------|
| X-Frame-Options | ❌ No | ✅ Yes | ✅ vercel.json |
| Strict-Transport-Security | ❌ No | ✅ Yes | ✅ vercel.json |
| X-Content-Type-Options | ✅ Yes | ✅ Yes | ✅ Both |
| X-XSS-Protection | ✅ Yes | ✅ Yes | ✅ Both |
| Referrer-Policy | ✅ Yes | ✅ Yes | ✅ Both |
| Permissions-Policy | ✅ Yes | ✅ Yes | ✅ HTML only |
| Content-Security-Policy | ✅ Yes | ✅ Yes | ✅ HTML only |

## Testing Your Headers

After deployment, verify headers are set correctly:

```bash
curl -I https://puz-records.vercel.app
```

You should see:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## References

- [MDN: X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
- [OWASP: Security Headers](https://owasp.org/www-project-secure-headers/)
- [Vercel: Headers Documentation](https://vercel.com/docs/edge-network/headers)

---

**Your current setup is correct!** X-Frame-Options is set via HTTP headers in `vercel.json`, and the meta tag has been removed from HTML files to prevent the error.

