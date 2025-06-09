# Engineering Leadership Goals Tracker - Project Specification

## Overview
A personal productivity application for VP of Engineering to track weekly/daily goals, manage recurring meetings, and maintain light journaling with AI-generated summaries.

## Tech Stack
- **Frontend**: SvelteKit + TypeScript
- **Backend**: Supabase (Database + Auth)
- **Deployment**: Vercel
- **Repository**: GitHub
- **AI Integration**: Claude Haiku API
- **Text Format**: Markdown for all free text fields

## Authentication Requirements
- Supabase Auth integration
- Supported providers:
  - Google OAuth
  - GitHub OAuth
- Multi-user support with proper data isolation

## Core Features

### 1. Recurring Meetings Management
**Data Model**: `meetings` table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to auth.users)
- `title` (text)
- `day_of_week` (integer, 0-6 where 0=Sunday)
- `frequency` (enum: 'weekly', 'bi-weekly', 'monthly', 'quarterly')
- `meeting_type` (text, foreign key to meeting_types.name)
- `time` (time)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Meeting Instances**: `meeting_instances` table
- `id` (UUID, primary key)
- `meeting_id` (UUID, foreign key to meetings)
- `scheduled_date` (date)
- `prep_notes` (text, markdown)
- `reaction_notes` (text, markdown)
- `status` (enum: 'scheduled', 'completed', 'cancelled')
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Meeting Types**: `meeting_types` table (operator-extensible)
- `id` (UUID, primary key)
- `name` (text, unique)
- `display_name` (text)
- `created_at` (timestamp)

**Features**:
- Add/edit/delete recurring meetings
- Auto-generate meeting instances 3 months in advance
- Add prep notes before meetings
- Add reaction notes after meetings
- Calendar view of upcoming meetings

### 2. Weekly Goals
**Data Model**: `weekly_goals` table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to auth.users)
- `week_start_date` (date, Monday of the week)
- `goals` (text, markdown)
- `progress_notes` (text, markdown)
- `ai_summary` (text, markdown)
- `ai_summary_edited` (boolean, default false)
- `status` (enum: 'draft', 'active', 'completed')
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Time Window**: Friday 5:00 PM - Monday 9:00 AM (user's local time)
- Lock goal setting outside this window
- Show countdown to next goal-setting window

### 3. Daily Goals
**Data Model**: `daily_goals` table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to auth.users)
- `goal_date` (date)
- `goals` (text, markdown)
- `progress_notes` (text, markdown)
- `status` (enum: 'draft', 'active', 'completed')
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Time Window**: 5:00 PM - 9:00 AM next day (user's local time)
- Lock goal setting outside this window

### 4. Daily Progress Notes
**Data Model**: `daily_notes` table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to auth.users)
- `note_date` (date)
- `content` (text, markdown)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Features**:
- Quick note entry throughout the day
- Link to current daily/weekly goals
- Markdown editor with preview

### 5. AI-Generated Weekly Summary
**Integration**: Claude Haiku API
**Trigger**: Friday afternoons (user-initiated)
**Input Data**:
- Current week's daily goals and progress
- Daily notes from the week
- Meeting prep notes and reactions
- Weekly goal progress
- All user markdown content from the week

**Process**:
1. Fetch week's data from Supabase
2. Send structured prompt to Claude Haiku
3. Generate summary focusing on:
   - Goal completion analysis
   - Key insights from meetings
   - Recommendations for next week
4. Allow user to edit AI-generated summary
5. Save final summary to `weekly_goals.ai_summary`

## User Interface Requirements

### Dashboard
- Current week overview
- Today's goals and progress
- Upcoming meetings (next 7 days)
- Quick note entry
- Weekly summary status

### Navigation
- Dashboard
- Weekly Goals
- Daily Goals
- Meetings
- Notes Archive
- Settings

### Meeting Views
- Recurring meetings list
- Calendar view
- Meeting prep/reaction forms
- Meeting history

### Goal Views
- Weekly goal setting (time-restricted)
- Daily goal setting (time-restricted)
- Progress tracking
- Goal history and analytics

## Technical Requirements

### Database Schema (Supabase)
```sql
-- Meeting Types (seed data)
INSERT INTO meeting_types (name, display_name) VALUES
  ('1on1_direct', '1:1 with Direct Report'),
  ('1on1_manager', '1:1 with Manager'),
  ('1on1_skip', '1:1 Skip Level'),
  ('1on1_peer', '1:1 with Peer'),
  ('staff_meeting', 'Staff Meeting'),
  ('org_meeting', 'Org Meeting'),
  ('leadership_meeting', 'Leadership Meeting');

-- Enable RLS on all tables
-- Create policies for user data isolation
-- Set up proper indexes for performance
-- Add foreign key constraints
-- Create automated cleanup job for 2-year retention
```

### Authentication Flow
1. Landing page with sign-in options
2. OAuth redirect handling
3. User profile setup with timezone detection and confirmation
4. Protected route middleware
5. Session management

### Time Zone Handling
- Store user's timezone in profile
- All time-based restrictions use user's local time
- Display times in user's timezone
- Handle DST transitions

### API Integration
- Claude Haiku API key stored in environment variables
- Rate limiting for AI requests
- Error handling for API failures
- Structured prompts for consistent summaries

## Deployment Configuration

### Environment Variables
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CLAUDE_API_KEY=
```

### Vercel Configuration
- Automatic deployments from main branch
- Environment variable configuration
- Domain setup

## Security Considerations
- Row Level Security (RLS) policies in Supabase
- API key protection
- User data isolation
- Input sanitization for markdown content
- Rate limiting on AI API calls

## Performance Considerations
- Lazy loading for historical data
- Pagination for notes and goals
- Optimistic updates for better UX
- Caching for frequently accessed data

## Future Enhancements (Out of Scope)
- Mobile app
- Team sharing features
- Advanced analytics
- Calendar integrations
- Notification system

## Development Phases
1. **Phase 1**: Authentication + Basic CRUD for goals and meetings
2. **Phase 2**: Time-restricted goal setting + meeting instances
3. **Phase 3**: AI summary integration + polished UI
4. **Phase 4**: Testing, optimization, and deployment