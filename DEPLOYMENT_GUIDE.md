# Baggista - Deployment Guide

## Frontend Deployment (Vercel)

### Setup Steps:

1. **Push your code to GitHub**
   - Create a GitHub repository for your project
   - Push the `frontend` folder as your main repo

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository for the frontend

3. **Configure Environment Variables in Vercel**
   - In your Vercel project settings, go to "Settings" → "Environment Variables"
   - Add the following variable:
     ```
     VITE_API_BASE_URL=https://your-render-backend-url.onrender.com
     ```
   - Replace `your-render-backend-url` with your actual Render backend URL

4. **Deploy**
   - Vercel will automatically build and deploy your frontend
   - Your app will be available at `https://your-project.vercel.app`

### Vercel Configuration:
- `vercel.json` is already configured with rewrites for React Router SPA

---

## Backend Deployment (Render)

### Setup Steps:

1. **Push your code to GitHub**
   - Create a GitHub repository for your project
   - Push the `backend` folder to the repository

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Click "Create New" and select "Web Service"
   - Connect your GitHub account and select the repository

3. **Configure the Web Service**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Runtime**: Node 18
   - **Plan**: Free or Paid (depending on your needs)

4. **Add Environment Variables in Render**
   - In the Render dashboard, go to "Environment"
   - Add the following variables:
     ```
     NODE_ENV=production
     EXPRESS_SESSION_SECRET=your-secure-random-string
     JWT_KEY=your-secure-random-string
     MONGODB_URI=your-mongodb-atlas-connection-string
     FRONTEND_URL=https://your-frontend.vercel.app
     PORT=5000
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend

### Render Configuration:
- `render.json` is already configured
- Backend will be available at `https://your-backend.onrender.com`

---

## Important Security Notes:

### Environment Variables:
- **Never** commit `.env` files to version control
- Use `.env.example` as a template for developers
- Keep sensitive secrets (JWT_KEY, SESSION_SECRET) secure
- Regenerate them for production

### CORS Configuration:
- CORS is now dynamically configured based on `NODE_ENV`
- In production, it only allows your Vercel frontend URL
- Update `FRONTEND_URL` environment variable if you change your frontend domain

### Cookies:
- `secure` flag is automatically set to `true` in production (HTTPS only)
- `sameSite` is set to `lax` to allow cross-site requests to API
- `httpOnly` is always `true` for security

---

## Testing Connection After Deployment:

1. **Test Frontend → Backend Connection**
   - Open your Vercel app
   - Check browser console for any CORS errors
   - Verify API calls work (add products, login, etc.)

2. **Check Logs**
   - **Vercel**: Check deployment logs in Vercel dashboard
   - **Render**: Check deployment and runtime logs in Render dashboard

3. **Troubleshooting**
   - If CORS errors occur, verify `FRONTEND_URL` in Render environment
   - If API calls fail, check network tab in browser DevTools
   - Check both frontend and backend logs for errors

---

## MongoDB Setup (if not done yet)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Use this string as `MONGODB_URI` in Render environment

---

## To Redeploy After Changes:

- **Frontend**: Push changes to GitHub → Vercel auto-deploys
- **Backend**: Push changes to GitHub → Render auto-deploys (if auto-deploy is enabled)

---

## Production URLs (after deployment)

- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Base**: `https://your-backend.onrender.com/api`
