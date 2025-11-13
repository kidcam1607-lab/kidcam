# 🎨 Frontend Manual Testing Guide

## Setup

```bash
cd frontend
npm run dev
```

Open: `http://localhost:3000`

---

## 🧪 Test Scenarios

### Scenario 1: Admin Journey
**Time: 5 minutes**

1. **Login Page**
   - Click "Admin Login"
   - See login form ✅
   - See "Create new account?" link ✅

2. **Sign Up**
   - Click "Create new account"
   - Fill form:
     - Email: `admin@test.com`
     - Password: `test123456`
     - Studio: `My Studio`
   - Click "Sign Up"
   - Redirects to dashboard ✅

3. **Dashboard**
   - See "Admin Dashboard" title ✅
   - See "+ Create New Album" button ✅
   - See "Logout" button ✅

4. **Create Album**
   - Click "+ Create New Album"
   - Form appears ✅
   - Fill:
     - Client: `Riya Birthday`
     - Title: `Birthday 2025`
     - Password: `12345`
   - Click "Create Album"
   - Album appears in grid ✅

5. **Logout**
   - Click "Logout"
   - Redirects to login ✅
   - Cannot access dashboard ✅

---

### Scenario 2: Photo Upload
**Time: 5 minutes**

1. **Login again**
   - Email: `admin@test.com`
   - Password: `test123456`
   - Successfully logged in ✅

2. **Upload Photos**
   - Find "Riya Birthday" album
   - Click "Upload Photos"
   - Select 3 test images
   - Photos upload ✅
   - Counter shows "3" ✅
   - Cover image appears ✅

3. **Manage Photos**
   - Click "Manage" button
   - See all 3 photos ✅
   - Hover over photo → "Delete" appears ✅
   - Delete 1 photo
   - Counter shows "2" ✅

---

### Scenario 3: Client Gallery
**Time: 5 minutes**

1. **Copy Album Link**
   - On dashboard
   - Click "Copy Link"
   - Alert shows "Link copied" ✅

2. **Open in Incognito**
   - Paste link in new incognito window
   - Album loads ✅
   - Password prompt appears ✅

3. **Enter Password**
   - Enter wrong password → Error ✅
   - Enter correct (12345) → Gallery shows ✅
   - 2 photos in grid ✅

4. **View Photos**
   - Click first photo
   - Expands full-screen ✅
   - Navigation arrows visible ✅
   - "Download" button visible ✅

5. **Navigate**
   - Click "Next" → shows photo 2 ✅
   - Click "Prev" → shows photo 1 ✅
   - Click "X" → closes modal ✅

---

### Scenario 4: Slideshow
**Time: 3 minutes**

1. **Start Slideshow**
   - Back to gallery
   - Click "▶ Slideshow"
   - Full-screen mode ✅
   - Auto-advances every 3 sec ✅

2. **Manual Control**
   - Click "Next" → skips to next ✅
   - Click "Prev" → goes back ✅
   - Counter shows position ✅

3. **Stop**
   - Click "⏸ Stop Slideshow"
   - Back to grid view ✅

---

### Scenario 5: Download
**Time: 2 minutes**

1. **Expand Photo**
   - Click any photo
   - Modal opens ✅

2. **Download**
   - Click "⬇ Download"
   - File downloads ✅
   - Browser shows download ✅

3. **Check File**
   - Open Downloads folder
   - Image file exists ✅
   - Can open in viewer ✅

---

### Scenario 6: QR Code
**Time: 3 minutes**

1. **Go to Manage**
   - Dashboard → "Manage" button

2. **Generate QR**
   - Scroll to "QR Code" section
   - Click "Generate QR Code"
   - QR image appears ✅

3. **Download QR**
   - Click "Download QR Code"
   - PNG file downloads ✅

4. **Scan QR**
   - Take photo of QR on screen
   - Phone camera recognizes ✅
   - Opens album link ✅

---

### Scenario 7: Email Share
**Time: 3 minutes**

1. **Send Email**
   - In Manage page
   - Enter email: `test@gmail.com`
   - Click "Send Email Link"
   - Alert: "Email sent successfully" ✅

2. **Check Email**
   - Open Gmail
   - Subject: "Your Riya Birthday Photo Album is Ready!" ✅
   - Contains album link ✅
   - "View Album" button works ✅

---

### Scenario 8: WhatsApp Share
**Time: 2 minutes**

1. **Generate Link**
   - In Manage page
   - Enter phone: `+919876543210`
   - Click "Share on WhatsApp"
   - WhatsApp share opens ✅
   - Message prepopulated ✅

---

### Scenario 9: Analytics
**Time: 2 minutes**

1. **View Downloads**
   - In Manage page
   - See "Analytics" card
   - Download count increases ✅
   - View count increases ✅

---

### Scenario 10: Responsive Design
**Time: 5 minutes**

1. **Mobile (375px)**
   - Resize browser to 375px width
   - All text readable ✅
   - Buttons clickable ✅
   - Photos stack vertically ✅
   - Navigation functional ✅

2. **Tablet (768px)**
   - Resize to 768px
   - Grid shows 3 columns ✅
   - Layout optimized ✅

3. **Desktop (1920px)**
   - Maximize browser
   - Grid shows 4 columns ✅
   - Professional layout ✅

---

## ✅ Test Checklist

- [ ] Admin can signup
- [ ] Admin can login
- [ ] Admin can create album
- [ ] Admin can upload photos
- [ ] Admin can delete photos
- [ ] Admin can reorder photos
- [ ] Client can view album
- [ ] Client needs password for protected album
- [ ] Client can view full-screen
- [ ] Client can navigate photos
- [ ] Client can download photos
- [ ] Slideshow works
- [ ] QR code generates
- [ ] Email sends
- [ ] WhatsApp link generates
- [ ] Analytics track downloads
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] No console errors
- [ ] No network errors

---

## 🐛 Common Issues

### Photos not uploading
- Check Cloudinary credentials
- Check browser console for errors
- Try smaller image file

### Email not sending
- Check GMAIL_USER and GMAIL_PASSWORD
- Use Gmail App Password (not regular password)
- Check spam folder

### QR not generating
- Check backend running
- Check JWT token valid
- Try refreshing page

### Styling broken
- Run `npm run build` in frontend
- Clear browser cache (Ctrl+Shift+Del)
- Restart dev server

---

## 📱 Browser Testing

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

---

**All tests passing?** 🎉 Ready to deploy!
