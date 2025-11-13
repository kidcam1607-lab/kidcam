# 🔧 Render Backend Deployment Guide

## 📋 Prerequisites

- ✅ GitHub account with `kidcam` repository
- ✅ Code pushed to main branch
- ✅ Environment variables documented
- ✅ MongoDB Atlas account ready

---

## 🚀 Step 1: Create Render Account

### 1.1 Sign Up

1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Select **"Sign up with GitHub"**
4. Authorize Render to access GitHub

---

## 🔌 Step 2: Connect Repository

### 2.1 Create New Web Service

1. Dashboard → Click **"New +"** → **"Web Service"**
2. Select repository: `kidcam`
3. Click **"Connect"**

### 2.2 Configure Service

| Setting | Value |
|---------|-------|
| **Name** | `kidcam-api` |
| **Environment** | `Node` |
| **Build Command** | `cd backend && npm install` |
| **Start Command** | `cd backend && npm start` |
| **Instance Type** | `Free` (or Starter $7/month for production) |

---

## 🔐 Step 3: Add Environment Variables

Click **"Add Environment Variable"** and add these:

```
MONGODB_URI = mongodb+srv://admin:PASSWORD@cluster.mongodb.net/kidcam
JWT_SECRET = your_super_secret_key_12345
CLOUDINARY_CLOUD_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
EMAIL_USER = your_email@gmail.com
EMAIL_PASSWORD = your_gmail_app_password
FRONTEND_URL = https://kidcam.vercel.app
PORT = 10000
```

### 🔑 Getting These Values

| Variable | Where to Get |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas → Connect → Copy connection string |
| `JWT_SECRET` | Generate random string: `openssl rand -hex 16` |
| `CLOUDINARY_*` | Cloudinary Dashboard → Settings |
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASSWORD` | Gmail → Settings → App passwords |
| `FRONTEND_URL` | From Vercel deployment |

---

## 🚀 Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for first deployment
3. See build logs in real-time
4. Green status = Success ✅

### Deployment URL

Render generates URL: `https://kidcam-api.onrender.com`

---

## 🌐 Step 5: Connect Custom Domain (Optional)

### 5.1 Add Domain

1. Settings → **"Custom Domain"**
2. Enter: `api.kidcam.com`
3. Click "Add Custom Domain"

### 5.2 Update DNS

Add CNAME record to your domain registrar:

```
Name: api
Type: CNAME
Value: kidcam-api.onrender.com
```

Wait 24-48 hours for DNS propagation.

---

## ✅ Step 6: Verify Deployment

### Test 1: Backend Responds

```bash
curl https://kidcam-api.onrender.com/api/auth/login
# Should return: error about missing POST data (expected)
```

### Test 2: Database Connection

```bash
curl -X POST https://kidcam-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","studioName":"Test"}'
# Should return: successful registration
```

### Test 3: Full Flow

1. Go to frontend: `https://kidcam.vercel.app`
2. Try to login
3. Should connect to backend
4. Check Render logs for requests

---

## 🐛 Troubleshooting

### 503 Service Unavailable
**Cause:** Free tier goes to sleep after 15 min  
**Solution:** Upgrade to Starter ($7/month)

### 502 Bad Gateway
**Cause:** Backend not running  
**Solution:**
1. Check logs in Render dashboard
2. Verify environment variables
3. Restart service

### CORS Error
**Cause:** Frontend URL not recognized  
**Solution:**
1. Check `FRONTEND_URL` in env vars
2. Make sure it includes `https://`
3. Redeploy

### Database Connection Failed
**Cause:** MongoDB credentials wrong  
**Solution:**
1. Verify `MONGODB_URI` is correct
2. Check MongoDB Atlas IP whitelist
3. Test connection string locally

### Email Not Sending
**Cause:** Gmail password wrong  
**Solution:**
1. Use Gmail App Password (not regular password)
2. Enable 2-Step Verification
3. Generate new App Password

---

## 🔄 Step 7: Auto-Deployment

### Automatic Deployments

Push changes and Render auto-deploys:

```bash
git push origin main
# Render detects change
# Builds and deploys automatically
# Ready in 2-3 minutes
```

---

## 📊 Step 8: Monitor Backend

### Logs

**Logs** tab shows:
- Deployment progress
- Server startup
- Request logs
- Errors

### Metrics

**Metrics** tab shows:
- CPU usage
- Memory usage
- Requests/second
- Response time

### Alerts

Set up alerts for:
- Build failures
- Memory threshold
- Error rate threshold

---

## 💰 Pricing

| Plan | Price | Best For |
|------|-------|----------|
| **Free** | $0 | Testing/demo |
| **Starter** | $7/month | Small production |
| **Standard** | $25/month | Medium production |
| **Pro** | $100/month | Large scale |

**Free tier limitation:**
- Spins down after 15 min inactivity
- Slow first request

**Recommendation:** Use Free for testing, upgrade to Starter ($7/month) for production.

---

## 📋 Deployment Checklist

- [ ] Render account created
- [ ] GitHub connected
- [ ] Web service created
- [ ] Build command correct
- [ ] Start command correct
- [ ] All environment variables added
- [ ] Deployment succeeded (green)
- [ ] Backend responds to requests
- [ ] Database connection works
- [ ] Email sending works
- [ ] Custom domain added (optional)
- [ ] Monitoring dashboard opened

---

## 🎉 Backend is Live!

Your API is now deployed!

**URL:** `https://kidcam-api.onrender.com`

---

## 🔗 Next Steps

1. ✅ Update Vercel `NEXT_PUBLIC_API_URL` with backend URL
2. ✅ Test full integration (frontend → backend → database)
3. ✅ Monitor both Vercel and Render dashboards
4. ✅ Setup custom domain (optional)

---

## 📞 Support

- Render Docs: [render.com/docs](https://render.com/docs)
- Status: [status.render.com](https://status.render.com)
- Support: [render.com/support](https://render.com/support)

**Happy deploying!** 🚀
