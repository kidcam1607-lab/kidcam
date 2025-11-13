# 🌐 Custom Domain Setup Guide

## 📋 Prerequisites

- ✅ Frontend deployed to Vercel
- ✅ Backend deployed to Render
- ✅ Domain registered (kidcam.com or similar)

---

## 🛒 Step 1: Register Domain

### Option A: Namecheap (Cheapest)

1. Go to [namecheap.com](https://namecheap.com)
2. Search `kidcam.com`
3. Add to cart
4. Checkout (~$10/year)
5. Save login credentials

### Option B: GoDaddy

1. Go to [godaddy.com](https://godaddy.com)
2. Search `kidcam.com`
3. Add to cart
4. Checkout (~$12/year)
5. Save login credentials

### Option C: Google Domains

1. Go to [domains.google.com](https://domains.google.com)
2. Search `kidcam.com`
3. Add to cart
4. Checkout (~$12/year)
5. Save login credentials

---

## 🎯 Step 2: Setup Frontend Domain (Vercel)

### 2.1 Add Domain to Vercel

1. **Vercel Dashboard** → Select `kidcam` project
2. **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter: `kidcam.com`
5. Click **"Add"**

### 2.2 Choose DNS Method

Vercel offers two options:

#### Option A: Nameserver (Recommended)

**Best for:** Managing all DNS from Vercel

Vercel shows 4 nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

Copy these for next step.

#### Option B: CNAME

**Best for:** Complex DNS setups

Creates CNAME record pointing to Vercel.

---

## 🌍 Step 3: Update DNS at Registrar

### For Namecheap

1. Login to Namecheap account
2. Go to "Dashboard" → "Domain List"
3. Click "Manage" next to `kidcam.com`
4. **Nameservers** section
5. Choose "Custom DNS"
6. Enter Vercel's 4 nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```
7. Save changes

### For GoDaddy

1. Login to GoDaddy account
2. Go to "My Products" → "Domains"
3. Click `kidcam.com`
4. **DNS** section
5. Change nameservers to Vercel's 4
6. Save

### For Google Domains

1. Login to Google Domains
2. Select `kidcam.com`
3. Go to **DNS** → **Custom nameservers**
4. Enter Vercel's 4 nameservers
5. Save

---

## ⏳ Step 4: Wait for DNS Propagation

**Time needed:** 24-48 hours (sometimes up to 72 hours)

### Check Status

**In Vercel Dashboard:**
- Status shows "Pending" → "Active"

**Online Tool:**
- Visit [dnschecker.org](https://dnschecker.org)
- Enter: `kidcam.com`
- Nameservers should show Vercel's values

### Once Propagated

✅ Visit `https://kidcam.com`  
✅ Should load Vercel app  
✅ SSL certificate auto-issued  
✅ Green lock icon in browser  

---

## 🔧 Step 5: Setup Backend Subdomain (Optional)

### 5.1 Add Subdomain to Render

1. **Render Dashboard** → Select `kidcam-api`
2. **Settings** → **Custom Domain**
3. Enter: `api.kidcam.com`
4. Click **"Add Custom Domain"**

### 5.2 Add CNAME Record

Render shows CNAME target:
```
api.kidcam.com CNAME kidcam-api.onrender.com
```

Go back to your registrar:

**Namecheap:**
1. Domain → Manage
2. **Advanced DNS** tab
3. Add CNAME record:
   - Host: `api`
   - Value: `kidcam-api.onrender.com`
   - TTL: `3600`
4. Save

**GoDaddy:**
1. Domain → Manage DNS
2. Add CNAME:
   - Name: `api`
   - Value: `kidcam-api.onrender.com`
3. Save

**Google Domains:**
1. DNS tab
2. Add custom record:
   - Name: `api`
   - Type: `CNAME`
   - Value: `kidcam-api.onrender.com`
3. Save

### 5.3 Wait for DNS

Wait 24-48 hours for `api.kidcam.com` to propagate.

---

## 🔐 Step 6: Update Environment Variables

### Update Vercel Frontend

1. **Vercel Dashboard** → `kidcam` project
2. **Settings** → **Environment Variables**
3. Edit `NEXT_PUBLIC_API_URL`
4. Change from: `https://kidcam-api.onrender.com`
5. Change to: `https://api.kidcam.com`
6. Save

### Update Render Backend

1. **Render Dashboard** → `kidcam-api` service
2. **Environment**
3. Edit `FRONTEND_URL`
4. Change from: `https://kidcam.vercel.app`
5. Change to: `https://kidcam.com`
6. Save (auto-redeploys)

---

## ✅ Step 7: Verify Everything

### Test Frontend Domain
```
Visit: https://kidcam.com
Should load homepage
Check: Green lock (HTTPS working)
```

### Test Backend Domain
```bash
curl https://api.kidcam.com/api/auth/login
Should return: JSON error (expected, no POST data)
```

### Test Full Integration
1. Go to `https://kidcam.com`
2. Try admin login
3. Should connect to `https://api.kidcam.com`
4. Check Network tab in browser
5. API requests should go to `api.kidcam.com`

---

## 🐛 Troubleshooting

### Domain shows "Pending"

**Cause:** DNS not propagated yet  
**Solution:** Wait 24-48 hours

### Website shows "DNS Failed"

**Cause:** Nameservers not updated at registrar  
**Solution:**
1. Verify nameservers were saved at registrar
2. Wait 24-48 hours
3. Check with `dnschecker.org`

### SSL Certificate Missing (No HTTPS)

**Cause:** DNS not propagated to Vercel  
**Solution:**
1. Verify nameservers are Vercel's
2. Wait for DNS propagation
3. Vercel auto-issues certificate

### API endpoint returns 502

**Cause:** Backend URL not updated  
**Solution:**
1. Check `NEXT_PUBLIC_API_URL` in Vercel
2. Should be `https://api.kidcam.com`
3. Redeploy Vercel

### CORS errors

**Cause:** Backend `FRONTEND_URL` wrong  
**Solution:**
1. Check `FRONTEND_URL` in Render
2. Should be `https://kidcam.com`
3. Redeploy Render

---

## 📊 Final Domain Setup

```
┌─────────────────────────────────┐
│   kidcam.com (Frontend)          │
│   ↓                              │
│   Vercel (Next.js app)           │
│   ↓                              │
│   Calls → api.kidcam.com         │
│                                  │
├─────────────────────────────────┤
│   api.kidcam.com (Backend)       │
│   ↓                              │
│   Render (Node.js API)           │
│   ↓                              │
│   Connects → MongoDB Atlas       │
└─────────────────────────────────┘
```

---

## ✅ Complete Checklist

- [ ] Domain registered
- [ ] Nameservers updated at registrar
- [ ] DNS propagated to Vercel
- [ ] `https://kidcam.com` loads frontend
- [ ] SSL certificate active (green lock)
- [ ] `https://api.kidcam.com` responds
- [ ] Frontend `NEXT_PUBLIC_API_URL` updated
- [ ] Backend `FRONTEND_URL` updated
- [ ] Full flow tested (signup → login → create album)
- [ ] Custom domain fully working

---

## 🎉 You're Done!

Your complete stack is now live:

```
Frontend: https://kidcam.com
Backend:  https://api.kidcam.com
Admin:    https://kidcam.com/admin/login
```

---

## 📞 Support

- **DNS Issues:** Contact your registrar
- **Vercel Issues:** [vercel.com/support](https://vercel.com/support)
- **Render Issues:** [render.com/support](https://render.com/support)

**Everything is live!** 🚀
