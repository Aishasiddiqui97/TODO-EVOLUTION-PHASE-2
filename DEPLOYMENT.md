# Deployment Guide

## Architecture

This application uses a **split deployment** strategy:
- **Frontend (Next.js)**: Deployed on Vercel
- **Backend (FastAPI)**: Deployed on Render (or Railway/Heroku)

## Quick Deploy

### 1. Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `https://github.com/Aishasiddiqui97/TODO-EVOLUTION-PHASE-2`
4. Configure:
   - **Name**: `todo-evolution-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables:
   - `SECRET_KEY`: Generate a random string (e.g., `openssl rand -hex 32`)
   - `ALLOWED_ORIGINS`: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
6. Click "Create Web Service"
7. **Copy the backend URL** (e.g., `https://todo-evolution-backend.onrender.com`)

### 2. Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `https://github.com/Aishasiddiqui97/TODO-EVOLUTION-PHASE-2`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your Render backend URL (from step 1.7)
6. Click "Deploy"

### 3. Update Backend CORS

After frontend is deployed:
1. Go back to Render dashboard
2. Update `ALLOWED_ORIGINS` environment variable with your Vercel URL
3. Redeploy the backend

## Alternative: Deploy Backend to Railway

1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables (same as Render)
6. Copy the generated URL and use it in Vercel

## Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8001

# Frontend
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key-here
ALLOWED_ORIGINS=http://localhost:3000,https://your-app.vercel.app
DATABASE_URL=sqlite:///./todo.db
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## Troubleshooting

### 404 Error on Vercel
- Ensure `Root Directory` is set to `frontend`
- Check that `vercel.json` is in the project root
- Verify build logs for errors

### CORS Error
- Update `ALLOWED_ORIGINS` in backend environment variables
- Include your Vercel domain (e.g., `https://your-app.vercel.app`)

### Backend Not Starting
- Check that `requirements.txt` is in the `backend` directory
- Verify Python version is 3.9+
- Check Render/Railway logs for errors
