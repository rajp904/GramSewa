# 🚀 GramSewa Deployment Guide

Complete guide to deploy GramSewa on Netlify (Frontend) and Render (Backend).

---

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub repository: https://github.com/rajp904/GramSewa
- ✅ MongoDB Atlas account (already configured)
- ✅ Cloudinary account (already configured)
- ✅ Firebase project (already configured)
- ✅ Netlify account (free)
- ✅ Render account (free)

---

## 🎯 Deployment Architecture

```
Frontend (Netlify) → Backend (Render) → MongoDB Atlas
                                      ↓
                                  Cloudinary
```

---

## 🔧 Part 1: Deploy Backend on Render

### Step 1: Sign Up on Render

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Step 2: Create Web Service

1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your GitHub repository: `rajp904/GramSewa`
4. Click "Connect"

### Step 3: Configure Backend Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `gramsewa-backend`
- **Region**: Choose closest to you (e.g., Oregon, Frankfurt)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select: **Free** (0.1 CPU, 512 MB RAM)

### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add these:

```
PORT=5001
MONGODB_URI=mongodb+srv://prince4bettiah_db_user:Prince7667@cluster0.x9vm36r.mongodb.net/gramsewa?retryWrites=true&w=majority
JWT_SECRET=gramsewa_super_secret_jwt_key_2026_secure_very_strong
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=dmqyxlipa
CLOUDINARY_API_KEY=124775175496714
CLOUDINARY_API_SECRET=s5Djw4R6ZncZZipYRM65T9HxpmU

FIREBASE_PROJECT_ID=gramsewa-c39e3
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2ZVyw1GEpQMUU\nAkfW4EDw4mzTtXBqV9zvDnWpaM4zgPPpcXqbb3BNiVEb/OihS4t+ytrF65uoek2m\ndk0egrAOQXJDmBbHPfTJypX8rv+xhjuPYFx4N3YmMti8bzR3DQZirB69K61pu++H\n75qnaL2givJaF9XblCwzICI27aReWQHShv3g704RPKv2wtJ15wreDvJgvBEEhxhm\nxEAjEhhmDrGFuJBbTdJbx1Yb88sLKVOBCuFaeo+t9CDbpA2ggiy2GUcD9oT90u9P\nOCLYdWER2XjIZSl98oR19wrJ+pBhJ5aT/0hqJdcq/VLNgep1LsEh089DekiTwGp6\nYE253egdAgMBAAECggEAEZQo0AkT+SobJF/I5TJ1R9IGu4u50yH3MtoBqItnjiqw\nN1A+yRK/L9XbaZdhI0R45AYwehFITf9FkxTFP3rIdYNEvDOBBIBZ4oXiGTmTfpxJ\nirq2hsaPnkRZw6VzGMM6WZGtn71BKBbbEc6bqOVNG1cw3tJ7w78e2GmRKpqSNB51\nmgcq7htcm51MsasQyGL2MMTDMPFFHm3VtCgCLiRorDHe8F74D+IL0o7qi/uAIYIk\n8Lp/vbvBzu3YEXIOIEArgcfVl8OJQxt3UPDC6uHwfA4NdOQ3G0+x+TdwcAvldQBP\nXhMOXBBQK2twaPo4s8bB9QSxmnZjak5KF+8Ju3pKwQKBgQDtiRyFGLQXMPDHMB9T\n4fnUmgB5SkkxaWKLFK1XxtPO+KEH2IwNkMPGl28Acz/EggtFE8UU+3WTI30MuwDP\nN0g3CWijuOi4jone+8Rr/0anQ2wsUhLxpRk6CH/G+Lt/quUwU/TMlON4psfFMR2c\nNr6iIpM5Q6+oWH/m/3tV3HA/QQKBgQDEkvzmTetHnb08B20TAxyeh/JjF3arsuU8\n+sx4WThd5B6sfmAJsUEIRFm/uJGms4BDd0vWrT5BFJD1FvnvdKJDqDKSwLfvFRX/\npDIM+DbeHy6l/GYZL0xIvTFS0G6tnoxkl9U1jwNa81GeAkJ0myHwS35zXBHC/Q9a\ntSQwWoEN3QKBgQDBKGcdwFnqJe0WPQasoq0S+mx6NTNRz/3HVXgkUdW5j6r7A1fY\nTCk3m7szJYTsWkep04rHJjiU/x3YNVVSLAU4ZBlIUbxFH/vzbM5sd/jPWV9kpxUq\nlXPvIiwt8+QczC51X0BJAKX9XbpDm04V0tqwY+dOgMEd52GSyZxU1N4eQQKBgBpD\nWS6b8ndbB9FhXJ1RqR01JJlApUZDXIVNLMxXf0RsGf0J1WL2H64vE56d1jfje5uH\n8MX513tyd/uG2lW3y4Ymjrs0rF5w/sNs+JLrBsmeeOkMU8fBnfuJ63EZD/B6Yl9+\nOaoyNUyNfbYSrzZNE7e7HmXjQyw+CzMfSHp9XQixAoGBALDCULVRYzmc9BHR/g7v\neXsbez84IF9mzc4dZvMI9T5TO8p41fziWopnpPD6cXpa9lORTB4eIcqpU133/kGj\nqfs7dl1KwFpGbMFgsImPEY4XXz+XHhTxRc+zNqRRagC/tWs/5Yu46MH1dF5qjlxZ\nRQQW7FXPue7AHDESHbYeLzuo\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@gramsewa-c39e3.iam.gserviceaccount.com

SUPER_ADMIN_EMAIL=admin@gramsewa.com
SUPER_ADMIN_PASSWORD=Admin@123
SUPER_ADMIN_NAME=Super Admin

NODE_ENV=production
```

**Important Notes:**
- Keep the `FIREBASE_PRIVATE_KEY` exactly as shown with `\n` for line breaks
- Make sure there are no extra spaces
- Change `SUPER_ADMIN_PASSWORD` to a strong password for production

### Step 5: Deploy Backend

1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. Once deployed, you'll see: `Your service is live 🎉`
4. Copy your backend URL (e.g., `https://gramsewa-backend.onrender.com`)

### Step 6: Test Backend

Visit: `https://your-backend-url.onrender.com`

You should see:
```json
{"message": "GramSewa API is running"}
```

---

## 🎨 Part 2: Deploy Frontend on Netlify

### Step 1: Sign Up on Netlify

1. Go to https://netlify.com
2. Click "Sign up"
3. Sign up with GitHub
4. Authorize Netlify

### Step 2: Import Project

1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Authorize Netlify (if needed)
4. Select repository: `rajp904/GramSewa`

### Step 3: Configure Build Settings

**Site Settings:**
- **Branch to deploy**: `main`
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/build`

### Step 4: Add Environment Variables

Click "Show advanced" → "New variable" and add:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
REACT_APP_FIREBASE_API_KEY=AIzaSyAlnzFhHUgZ51NS-52kxsTucxlKUuk-vR0
REACT_APP_FIREBASE_AUTH_DOMAIN=gramsewa-c39e3.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=gramsewa-c39e3
REACT_APP_FIREBASE_STORAGE_BUCKET=gramsewa-c39e3.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=6138707277
REACT_APP_FIREBASE_APP_ID=1:6138707277:web:ad7c94666800b482fa0b04
```

**Important:** Replace `https://your-backend-url.onrender.com` with your actual Render backend URL!

### Step 5: Deploy Frontend

1. Click "Deploy site"
2. Wait 2-3 minutes for build and deployment
3. Once deployed, you'll get a URL like: `https://random-name-123.netlify.app`

### Step 6: Custom Domain (Optional)

1. Click "Domain settings"
2. Click "Options" → "Edit site name"
3. Change to: `gramsewa` (if available)
4. Your site will be: `https://gramsewa.netlify.app`

---

## 🔐 Part 3: Update Firebase Configuration

### Add Production Domain to Firebase

1. Go to https://console.firebase.google.com
2. Select your project: `gramsewa-c39e3`
3. Go to "Authentication" → "Settings" → "Authorized domains"
4. Click "Add domain"
5. Add your Netlify domain: `gramsewa.netlify.app` (or your custom domain)
6. Click "Add"

---

## ✅ Part 4: Verify Deployment

### Test Backend
```bash
curl https://your-backend-url.onrender.com
```

Should return:
```json
{"message": "GramSewa API is running"}
```

### Test Frontend
1. Visit your Netlify URL
2. You should see the GramSewa homepage
3. Try logging in with Google
4. Create a test complaint
5. Login as admin: `admin@gramsewa.com` / `Admin@123`

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check logs in Render dashboard
- Verify all environment variables are set
- Check MongoDB connection string

**Problem**: MongoDB connection timeout
- Go to MongoDB Atlas
- Network Access → Add IP: `0.0.0.0/0` (allow all)

### Frontend Issues

**Problem**: API calls failing
- Check `REACT_APP_API_URL` is correct
- Verify backend is running
- Check browser console for CORS errors

**Problem**: Google login not working
- Verify Firebase authorized domains include your Netlify domain
- Check Firebase API key is correct

**Problem**: Blank page
- Check browser console for errors
- Verify build completed successfully
- Check Netlify deploy logs

---

## 📊 Deployment Checklist

Before going live:

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Netlify
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Firebase authorized domains updated
- [ ] Environment variables configured
- [ ] Super Admin password changed
- [ ] Test user login (Google OAuth)
- [ ] Test admin login
- [ ] Test complaint creation
- [ ] Test image upload
- [ ] Test status updates
- [ ] Test on mobile devices

---

## 🔄 Continuous Deployment

Both Netlify and Render support automatic deployments:

**How it works:**
1. Push changes to GitHub
2. Netlify/Render automatically detect changes
3. Build and deploy automatically
4. Your site updates in 2-3 minutes

**To push updates:**
```bash
git add .
git commit -m "Your update message"
git push origin main
```

---

## 💰 Cost Breakdown

**Free Tier Limits:**

**Netlify:**
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic HTTPS
- ✅ Custom domain support

**Render:**
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic HTTPS
- ✅ Auto-deploy from Git
- ⚠️ Spins down after 15 min inactivity (free tier)

**MongoDB Atlas:**
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Enough for development/small production

**Cloudinary:**
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ 25,000 transformations/month

**Total Cost: $0/month** 🎉

---

## 🚀 Production Optimization

### For Better Performance:

1. **Enable Caching** (Netlify)
   - Already configured in `netlify.toml`

2. **Compress Images** (Cloudinary)
   - Already handled automatically

3. **Monitor Performance**
   - Use Render dashboard for backend metrics
   - Use Netlify analytics for frontend

4. **Set up Monitoring**
   - Use UptimeRobot (free) to monitor uptime
   - Set up email alerts

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Review this guide
3. Check browser console
4. Verify environment variables

---

## 🎉 Success!

Your GramSewa application is now live and accessible worldwide!

**Share your deployed URLs:**
- Frontend: `https://your-site.netlify.app`
- Backend: `https://your-backend.onrender.com`

Add these to your GitHub README and share with the world! 🌍
