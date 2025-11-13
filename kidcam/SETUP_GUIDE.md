# 🚀 KidCam - Local Testing Setup Guide

## Prerequisites
- Node.js v16+ installed
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)
- Gmail account (for email testing)

---

## 📌 Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" and create account
3. Create a **free cluster**
4. Go to "Database" → Click "Connect"
5. Choose "Drivers" → Copy connection string
6. Replace `<username>`, `<password>`, and `<cluster-name>`
7. Add `/kidcam-dev` at the end (database name)

**Example:** 
```
mongodb+srv://testuser:testpass123@cluster0.mongodb.net/kidcam-dev
```

Paste this in `.env` as `MONGODB_URI`

---

## 🖼️ Step 2: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for **free account**
3. Go to Dashboard
4. Copy these three values:
   - Cloud Name
   - API Key
   - API Secret

Paste in `.env` as:
```
CLOUDINARY_CLOUD_NAME=your_value_here
CLOUDINARY_API_KEY=your_value_here
CLOUDINARY_API_SECRET=your_value_here
```

---

## ✉️ Step 3: Setup Gmail for Email Testing

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable "2-Step Verification"
3. Go to "App passwords"
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy this password

Paste in `.env` as:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=the_16_char_password_here
```

---

## 💻 Step 4: Install & Run Backend

```bash
cd backend

# Install dependencies
npm install

# Start dev server (watches for changes)
npm run dev
```

✅ Backend running at: `http://localhost:5000`

---

## 🎨 Step 5: Install & Run Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ Frontend running at: `http://localhost:3000`

---

## 🧪 Step 6: Test the Application

### Test Admin Signup/Login
1. Open `http://localhost:3000`
2. Click "Admin Login"
3. Click "Create new account"
4. Fill signup form:
   - Email: `test@example.com`
   - Password: `test123456`
   - Studio Name: `My Test Studio`
5. Click "Sign Up"

✅ Should redirect to Dashboard

### Test Create Album
1. On Dashboard, click "+ Create New Album"
2. Fill form:
   - Client Name: `Riya Birthday`
   - Album Title: `Birthday Photos 2025`
   - Password: `12345` (optional)
3. Click "Create Album"

✅ Album should appear on dashboard

### Test Upload Photos
1. Click "Upload Photos" for your album
2. Select 3-5 test images from your computer
3. Click upload

✅ Photos should appear in grid

### Test View Album (Client Side)
1. Copy the album link from dashboard
2. Open in **new incognito window**
3. If password protected, enter password
4. Browse photos

✅ Should see photo gallery

### Test Photo Management
1. Click "Manage" button on album card
2. Drag photos to reorder
3. Click "Save Order"

✅ Photos should reorder

### Test Generate QR Code
1. On Manage page, click "Generate QR Code"
2. Click "Download QR Code"

✅ QR code PNG file should download

### Test Email Sharing
1. On Manage page, enter your email
2. Click "Send Email Link"
3. Check your email inbox

✅ Should receive email with album link

### Test WhatsApp Sharing
1. On Manage page, enter phone number: `+919876543210`
2. Click "Share on WhatsApp"
3. Browser opens WhatsApp share dialog

✅ WhatsApp share should open

### Test Slideshow
1. Open album (client view)
2. Click "▶ Slideshow"
3. Photos auto-advance every 3 seconds

✅ Slideshow should work

### Test Download Tracking
1. On album, click a photo to expand
2. Click "⬇ Download"
3. Go to Manage page → Analytics

✅ Download count should increase

---

## 🐛 Troubleshooting

### Backend won't start
```
Error: connect ECONNREFUSED
```
**Solution:** Check MongoDB connection string in `.env`

### Photos won't upload
```
Error: 401 Unauthorized
```
**Solution:** Verify Cloudinary credentials in `.env`

### Email not sending
```
Error: Invalid login
```
**Solution:** Use Gmail **App Password**, not regular password

### Frontend can't reach backend
```
Network Error
```
**Solution:** Make sure backend is running on port 5000

### Port already in use
```
Error: listen EADDRINUSE
```
**Solution:** 
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

---

## 📊 Test Data to Create

### Album 1: Birthday Party
- Client: Riya Sharma
- Title: 1st Birthday Party
- Password: ❌ No password
- Photos: 5-10 photos

### Album 2: Wedding
- Client: Priya & Arjun
- Title: Wedding Ceremony
- Password: ✅ yes123
- Photos: 5-10 photos

### Album 3: Corporate Event
- Client: Tech Company XYZ
- Title: Annual Meetup 2025
- Password: ❌ No password
- Photos: 5-10 photos

---

## ✅ Testing Checklist

- [ ] Admin can signup
- [ ] Admin can login
- [ ] Admin can create album
- [ ] Admin can upload photos
- [ ] Client can view album
- [ ] Client can download photo
- [ ] QR code generates
- [ ] Email sends
- [ ] WhatsApp link works
- [ ] Slideshow plays
- [ ] Analytics track views
- [ ] Analytics track downloads
- [ ] Photos can be reordered
- [ ] Photos can be deleted

---

## 🎉 Ready to Deploy?

Once all tests pass, run:
```bash
# Build frontend for production
cd frontend
npm run build

# This generates optimized files in .next folder
```

Then you can deploy to Vercel + Render!

---

## 📞 Need Help?

Common issues and fixes are in the **Troubleshooting** section above.
