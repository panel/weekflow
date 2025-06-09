# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
WeekFlow is a personal productivity application for VP of Engineering to track weekly/daily goals, manage recurring meetings, and maintain light journaling with AI-generated summaries.

## Tech Stack
- **Frontend**: SvelteKit + TypeScript
- **Backend**: Supabase (Database + Auth + RLS)
- **Deployment**: Vercel
- **AI Integration**: Claude Haiku API
- **Authentication**: Supabase Auth (Google OAuth, GitHub OAuth)
- **Text Format**: Markdown for all free text fields

## Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run check

# Run linting
npm run lint

# Run tests
npm test

# Database setup (Supabase CLI)
npx supabase start
npx supabase db reset
npx supabase migration up
```

## Architecture Overview

### Database Schema (Supabase)
- **meetings**: Recurring meeting definitions with frequency and type
- **meeting_instances**: Individual meeting occurrences with prep/reaction notes
- **meeting_types**: Extensible meeting type definitions (1:1s, staff meetings, etc.)
- **weekly_goals**: Weekly goal setting with AI summaries (time-restricted editing)
- **daily_goals**: Daily goal setting (time-restricted editing)
- **daily_notes**: Free-form daily progress notes
- All tables use RLS policies for user data isolation

### Time-Based Restrictions
- **Weekly Goals**: Editable Friday 5:00 PM - Monday 9:00 AM (user's local timezone)
- **Daily Goals**: Editable 5:00 PM - 9:00 AM next day (user's local timezone)
- Always use user's timezone for time calculations and display

### Authentication Flow
- OAuth-based authentication via Supabase Auth
- Protected routes with session management
- User profile includes timezone settings
- Multi-user support with proper data isolation

### AI Integration
- Claude Haiku API for weekly summaries
- Triggered manually on Friday afternoons
- Aggregates week's goals, notes, and meeting data
- User can edit AI-generated summaries before saving

## Environment Variables
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY= 
CLAUDE_API_KEY=
```

## Key Development Patterns
- Use Supabase client for all database operations
- Implement RLS policies for security
- Handle timezone conversions for time restrictions
- Use markdown rendering for all text content
- Implement optimistic updates for better UX
- Auto-generate meeting instances 3 months in advance