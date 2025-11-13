# KidCam - Client Photo Album System

## Project Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account

### Installation

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your credentials to .env
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

### Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kidcam
JWT_SECRET=your_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Features
- ✅ Admin authentication
- ✅ Create client albums
- ✅ Upload photos to Cloudinary
- ✅ Generate unique album links
- ✅ Password-protected albums
- ✅ Responsive photo gallery
- ✅ Download photos

### Folder Structure
```
kidcam/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── pages/
│   ├── styles/
│   ├── next.config.js
│   └── package.json
└── README.md
```
