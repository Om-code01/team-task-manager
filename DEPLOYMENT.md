# Deployment Guide - Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Supabase project already set up

## Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Ready for deployment"

# Create main branch
git branch -M main
```

### 2. Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/your-username/team-task-manager.git

# Push to GitHub
git push -u origin main
```

### 3. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your **team-task-manager** repository
5. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 4. Add Environment Variables

In the Vercel deployment settings, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Deploy

Click **"Deploy"** and wait 2-3 minutes.

### 6. Access Your Live App

Once deployed, Vercel provides a URL like:
```
https://team-task-manager-xyz.vercel.app
```

## Automatic Deployments

Every time you push to the `main` branch, Vercel automatically redeploys your app.

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys!
```

## Custom Domain (Optional)

1. Go to your project in Vercel
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

**Build fails?**
- Check that all dependencies are in `package.json`
- Verify environment variables are set correctly

**App loads but can't connect to Supabase?**
- Verify environment variables in Vercel dashboard
- Check Supabase URL and key are correct

**Authentication not working?**
- Add your Vercel domain to Supabase allowed URLs:
  - Go to Supabase → Authentication → URL Configuration
  - Add `https://your-app.vercel.app` to Site URL

## Success!

Your Team Task Manager is now live and accessible worldwide! 🎉
