# Pre-Deployment Checklist

## Frontend (Vercel)

- [ ] All hardcoded `localhost:5000` URLs have been replaced with environment variables
- [ ] `vercel.json` is in place for SPA routing
- [ ] `.env.example` file created with `VITE_API_BASE_URL` template
- [ ] `frontend/src/utils/api.js` created for centralized API calls
- [ ] Build test passed: `npm run build`
- [ ] No console errors or warnings in local dev
- [ ] `.gitignore` includes `.env` (don't commit secrets)

## Backend (Render)

- [ ] `render.json` is in place with correct Node version
- [ ] `.env.example` created with all required variables
- [ ] CORS configuration uses `NODE_ENV` variable for dynamic origin
- [ ] Session cookie `secure` flag set based on `NODE_ENV`
- [ ] `package.json` has `start` script: `"node app.js"`
- [ ] All hardcoded environment variables replaced with `process.env`
- [ ] `.gitignore` includes `.env` (don't commit secrets)
- [ ] MongoDB Atlas connection string ready

## Deployment Steps

### Frontend (Vercel):
1. [ ] Push frontend code to GitHub
2. [ ] Go to vercel.com and create new project
3. [ ] Import GitHub repo (frontend folder)
4. [ ] Add environment variable: `VITE_API_BASE_URL=https://your-backend.onrender.com`
5. [ ] Deploy (auto-triggers on push to main)
6. [ ] Test the deployed app

### Backend (Render):
1. [ ] Push backend code to GitHub
2. [ ] Go to render.com and create new Web Service
3. [ ] Connect GitHub repo
4. [ ] Set Build Command: `npm install`
5. [ ] Set Start Command: `npm start`
6. [ ] Add all environment variables (see `.env.example`)
7. [ ] Deploy
8. [ ] Test the deployed API

## Environment Variables

### Frontend (.env or Vercel Settings)
```
VITE_API_BASE_URL=https://your-backend.onrender.com
```

### Backend (.env or Render Settings)
```
NODE_ENV=production
EXPRESS_SESSION_SECRET=<generate-secure-random-string>
JWT_KEY=<generate-secure-random-string>
MONGODB_URI=<your-mongodb-atlas-connection>
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
```

## After Deployment

- [ ] Test login functionality
- [ ] Test adding products to cart
- [ ] Test checkout process
- [ ] Check browser console for CORS errors
- [ ] Verify API calls in Network tab
- [ ] Test admin login and dashboard
- [ ] Monitor logs on both Vercel and Render dashboards

## URLs to Update

- Backend API: Replace `http://localhost:5000` with actual Render URL
- CORS origin: Should match your Vercel URL
- Frontend API calls: Should use `VITE_API_BASE_URL` environment variable

---

**All configurations are ready! Follow the deployment steps above.**
