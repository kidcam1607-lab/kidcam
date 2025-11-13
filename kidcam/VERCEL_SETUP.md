# 🎨 Vercel Frontend Deployment Guide

## 📋 Prerequisites

- ✅ GitHub account with `kidcam` repository
- ✅ Code pushed to main branch
- ✅ Backend deployed to Render (get API URL)
- ✅ Custom domain registered (optional)

---

## 🚀 Step 1: Connect Vercel to GitHub

### 1.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Select "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### 1.2 Import Project

1. Click "Import Project"
2. Paste GitHub URL:
   ```
   https://github.com/YOUR_USERNAME/kidcam
   ```
3. Click "Continue"

---

## ⚙️ Step 2: Configure Project

### 2.1 Project Settings

1. **Project Name:** `kidcam` (or your preference)
2. **Framework Preset:** Select **Next.js**
3. **Root Directory:** Click "Edit" → Select `frontend` folder

### 2.2 Build & Development

Vercel auto-detects for Next.js, but verify:

```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

---

## 🔐 Step 3: Add Environment Variables

### Click "Environment Variables"

Add this variable:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://api.kidcam.com` |

**Note:** Replace `api.kidcam.com` with your actual Render backend URL if different.

### Important!
- ✅ `NEXT_PUBLIC_` prefix is required for client-side variables
- ✅ Backend URL must be production URL (not localhost)
- ✅ No trailing slash

---

## 🚀 Step 4: Deploy

1. Click **"Deploy"** button
2. Wait 3-5 minutes
3. See deployment progress
4. Green checkmark = Success ✅

### Deployment URL

Vercel generates URL: `https://kidcam.vercel.app`

---

## 🌐 Step 5: Connect Custom Domain (Optional)

### 5.1 If you have a domain

1. Dashboard → Select `kidcam` project
2. Go to **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter: `kidcam.com`

### 5.2 Update DNS Records

Vercel shows 4 nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

Go to your domain registrar (Namecheap, GoDaddy, etc):
1. Find **Nameservers** setting
2. Replace with Vercel nameservers
3. Save

### 5.3 Wait for DNS Propagation

DNS can take 24-48 hours to fully propagate.

Check status:
- Vercel dashboard shows "Pending" or "Active"
- Visit `https://kidcam.com` (will take time)

---

## ✅ Step 6: Verify Deployment

### Test 1: Frontend Loads
```
Visit: https://kidcam.vercel.app
Should see: KidCam homepage
```

### Test 2: Admin Login
```
Click: "Admin Login"
Should see: Login form
```

### Test 3: API Connection
```
Try logging in
Check browser Network tab → API requests should go to Render backend
```

### Test 4: Custom Domain (if added)
```
Visit: https://kidcam.com
Should work same as vercel.app URL
```

---

## 🔄 Step 7: Auto-Deployment Setup

### Automatic Deployments

Vercel auto-deploys when you push to `main`:

```bash
# Make changes
git add .
git commit -m "Fix: description"
git push origin main

# Vercel automatically:
# 1. Detects the push
# 2. Starts build
# 3. Deploys to production
```

### Disable Auto-Deploy (Optional)

**Settings** → **Git** → Uncheck "Deploy on push"

---

## 📊 Step 8: Monitor Deployment

### Vercel Dashboard

1. **Deployments** tab - See all deployment history
2. **Analytics** tab - Page views, response times
3. **Logs** tab - Build logs, errors
4. **Settings** tab - Configure options

### Build Logs

If deployment fails:
1. Click failed deployment
2. View build logs
3. Look for error messages
4. Common issues:
   - Missing environment variables
   - Node modules error
   - Build script error

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
**Cause:** Missing dependency  
**Fix:**
```bash
npm install [module-name]
git push origin main
```

### Error: "Build failed"
**Cause:** Build script error  
**Fix:**
```bash
npm run build  # Test locally first
# Fix errors
git push origin main
```

### Error: "Cannot reach API"
**Cause:** Backend URL wrong  
**Fix:**
1. Check Render backend URL
2. Update `NEXT_PUBLIC_API_URL` in Vercel env vars
3. Redeploy

### Custom domain not working
**Cause:** DNS not propagated  
**Fix:**
- Wait 24-48 hours
- Check propagation: [dnschecker.org](https://dnschecker.org)
- Verify nameservers changed

### Pages load but styling broken
**Cause:** Tailwind CSS not building  
**Fix:**
```bash
npm run build  # Test locally
# If works locally, try:
npm cache clean --force
git push origin main
```

---

## 📈 Performance Optimization

### Vercel Features (Automatic)

- ✅ Edge Caching - CDN in 300+ cities
- ✅ Auto-Scaling - Handles traffic spikes
- ✅ Image Optimization - Auto-compress images
- ✅ Code Splitting - Load only needed JS

### Enable Advanced Features

**Settings** → **Regions** → Select regions closest to users

---

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| **Hobby** | Free | Perfect for testing |
| **Pro** | $20/month | Production ready |
| **Enterprise** | Custom | Large scale |

### Free Tier Limits
- 100GB/month bandwidth
- Unlimited deployments
- Edge Functions: Limited

Upgrade to **Pro** ($20/month) for production use.

---

## 🔒 Security

### HTTPS/SSL

✅ Auto-enabled on all domains  
✅ Free certificate from Let's Encrypt  
✅ Auto-renewal

### Environment Variables

✅ Encrypted at rest  
✅ Not exposed in logs  
✅ Only deployed instances can access

### Secrets Management

For sensitive data, use Vercel Secrets:
```bash
vercel env add SENSITIVE_KEY
```

---

## 📋 Deployment Checklist

- [ ] GitHub account linked
- [ ] Repository pushed to main
- [ ] Vercel project created
- [ ] Root directory set to `frontend`
- [ ] Environment variables added
- [ ] Deployment succeeded
- [ ] Homepage loads
- [ ] API connection works
- [ ] Custom domain connected (optional)
- [ ] DNS propagated (optional)
- [ ] Monitoring dashboard opened

---

## 🎉 You're Live!

Your frontend is now deployed!

**URLs:**
- Vercel: `https://kidcam.vercel.app`
- Custom: `https://kidcam.com` (if added)

**Next Step:**
Deploy backend to Render using `RENDER_SETUP.md`

---

## 🔄 Continuous Deployment

Every time you push to main:
```bash
git push origin main
↓
GitHub notifies Vercel
↓
Vercel builds project
↓
Vercel deploys to production
↓
Live in 2-3 minutes!
```

---

## 📞 Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Status Page: [status.vercel.com](https://status.vercel.com)
- Support: [vercel.com/support](https://vercel.com/support)

**Happy deploying!** 🚀
