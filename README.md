# Team Task Manager

A modern, full-stack task management application built with Next.js and Supabase. Users can securely manage their personal tasks with authentication and real-time database operations.

## 🚀 Features

- **User Authentication**: Secure signup and login using Supabase Auth
- **Task Management**: Create, read, update, and delete tasks
- **Status Tracking**: Organize tasks by status (Todo, In Progress, Done)
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Row Level Security**: Users can only access their own tasks
- **Responsive Design**: Clean UI built with Tailwind CSS
- **Real-time Updates**: Instant task updates using Supabase

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Deployment**: Vercel
- **Language**: JavaScript

## 📊 Database Schema

### Tasks Table

```sql
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Todo' CHECK (status IN ('Todo', 'In Progress', 'Done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)

RLS ensures users can only access their own tasks:

```sql
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tasks"
ON tasks FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks"
ON tasks FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
ON tasks FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
ON tasks FOR DELETE
USING (auth.uid() = user_id);
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Git installed

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "Team Task Manager"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the SQL from `database-setup.sql`
3. Go to **Settings → API** and copy your credentials

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

Your app will be live in minutes!

## 🔐 How Row Level Security Works

Row Level Security (RLS) is a PostgreSQL feature that restricts database access at the row level:

1. **Authentication**: When a user logs in, Supabase creates a session with their `user_id`
2. **Policy Enforcement**: Every database query automatically includes the user's ID
3. **Automatic Filtering**: RLS policies use `auth.uid()` to match the logged-in user
4. **Security**: Users cannot access other users' data, even if they try to manipulate the query

**Example**: When User A fetches tasks, RLS automatically adds `WHERE user_id = 'User A's ID'` to the query.

## 📁 Project Structure

```
Team Task Manager/
├── app/
│   ├── dashboard/
│   │   └── page.js          # Dashboard with task management
│   ├── login/
│   │   └── page.js          # Login page
│   ├── signup/
│   │   └── page.js          # Signup page
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   └── page.js              # Homepage
├── lib/
│   └── supabaseClient.js    # Supabase client configuration
├── .env.local               # Environment variables (not committed)
├── database-setup.sql       # Database schema and RLS policies
├── package.json             # Dependencies
└── README.md                # Project documentation
```

## 🎯 Future Improvements

- [ ] Add task due dates and reminders
- [ ] Implement task categories/tags
- [ ] Add task priority levels
- [ ] Enable task sharing between users
- [ ] Add search and filter functionality
- [ ] Implement dark mode
- [ ] Add email notifications
- [ ] Create mobile app version
- [ ] Add task comments and attachments
- [ ] Implement team collaboration features

## 📝 License

MIT License - feel free to use this project for learning and interviews.

## 👨‍💻 Author

Built as an interview assignment to demonstrate full-stack development skills with Next.js and Supabase.
