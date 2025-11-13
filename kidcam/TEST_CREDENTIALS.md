# 🧪 Test Credentials & Quick Reference

## Admin Test Account
```
Email: test@example.com
Password: test123456
Studio: My Test Studio
```

## Test Album 1 (No Password)
```
Client Name: Riya Sharma
Album Title: Birthday Party
Password: (none)
Link: http://localhost:3000/album/riya-sharma-XXXXXX
```

## Test Album 2 (Password Protected)
```
Client Name: Priya & Arjun
Album Title: Wedding Photos
Password: wedding123
Link: http://localhost:3000/album/priya-arjun-XXXXXX
```

## Test Emails
```
Admin Email: your_email@gmail.com
Test Client Email: test.client@gmail.com
```

## Test Phone Numbers
```
WhatsApp: +91 9876543210
Test Format: +{country_code}{number}
```

## API Endpoints (Backend)

### Auth
- POST `/api/auth/register` - Admin signup
- POST `/api/auth/login` - Admin login

### Albums (Admin Only)
- GET `/api/admin/albums` - List all albums
- POST `/api/admin/albums/create` - Create album
- GET `/api/admin/albums/:id` - Get album details
- POST `/api/admin/albums/:id/upload` - Upload photos
- DELETE `/api/admin/albums/:id` - Delete album
- PUT `/api/admin/albums/:id/reorder` - Reorder photos

### Gallery (Public)
- GET `/api/gallery/:slug` - View album
- POST `/api/gallery/:slug/verify` - Verify password
- POST `/api/gallery/:slug/track-download/:photoIndex` - Track download

### Sharing (Admin Only)
- GET `/api/sharing/:id/qrcode` - Generate QR code
- POST `/api/sharing/:id/send-email` - Send email link
- GET `/api/sharing/:id/whatsapp-link` - Get WhatsApp link

## File Sizes for Testing
```
Small Image: < 1MB (fast upload)
Medium Image: 1-5MB (realistic)
Large Image: 5-10MB (slow upload test)
```

## Test URLs
```
Home: http://localhost:3000
Admin Login: http://localhost:3000/admin/login
Dashboard: http://localhost:3000/admin/dashboard
Album View: http://localhost:3000/album/{slug}
```

## Postman Collection
Import this in Postman for API testing:

**Base URL:** `http://localhost:5000`

### Register
```
POST /api/auth/register
Body: {
  "email": "test@example.com",
  "password": "test123456",
  "studioName": "My Studio"
}
```

### Login
```
POST /api/auth/login
Body: {
  "email": "test@example.com",
  "password": "test123456"
}
Response: { "token": "jwt_token_here" }
```

### Get Albums
```
GET /api/admin/albums
Headers: Authorization: Bearer {token}
```
