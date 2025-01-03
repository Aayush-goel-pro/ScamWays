# ScamWays

A modern, secure, and user-friendly article management system built with React, TypeScript, and Supabase. This application allows users to create, read, update, and delete articles while maintaining proper authentication and authorization.

## Features

- 🔐 **Secure Authentication**: Email and password-based authentication using Supabase Auth
- 📝 **Article Management**: Full CRUD operations for articles
- 🔒 **Row Level Security**: Ensures users can only modify their own articles
- 🎨 **Modern UI**: Clean and responsive design using Tailwind CSS
- ✨ **Rich Content**: Support for articles with titles, content, and optional images
- ⚡ **Real-time Updates**: Instant UI updates when articles are modified
- 🛡️ **Input Validation**: Comprehensive validation for article creation and editing

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Router**: React Router v6
- **Database & Auth**: Supabase
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Formatting**: date-fns

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ArticleCard.tsx
│   ├── AuthForm.tsx
│   ├── Header.tsx
│   ├── ProtectedRoute.tsx
│   └── ValidationErrors.tsx
├── hooks/             # Custom React hooks
│   └── useAuth.ts
├── lib/              # Core utilities and configurations
│   ├── auth.ts
│   └── supabase.ts
├── pages/            # Page components
│   ├── ArticleCreate.tsx
│   ├── ArticleDetail.tsx
│   ├── ArticleEdit.tsx
│   └── ArticleList.tsx
├── types/            # TypeScript type definitions
│   └── article.ts
└── utils/            # Helper functions
    └── articleValidation.ts
```

## Key Features Explained

### Authentication
- Secure email/password authentication
- Protected routes for authenticated users
- Persistent sessions

### Article Management
- Create new articles with title, content, and optional image URL
- View article listings with preview cards
- Detailed article view
- Edit existing articles
- Delete articles with proper authorization

### Validation
- Title length: 5-100 characters
- Content length: 50-10,000 characters
- Required fields validation
- Input sanitization

### Security
- Row Level Security (RLS) policies
- User-specific data access
- Secure API endpoints
- Protected routes

## Database Schema

### Articles Table
```sql
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);
```

## Security Policies

- Articles are viewable by everyone
- Only authenticated users can create articles
- Users can only update/delete their own articles
- Row Level Security enabled on all tables

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Best Practices

- **Component Structure**: Small, focused components with single responsibilities
- **Type Safety**: Comprehensive TypeScript types for all data structures
- **Error Handling**: Proper error messages and validation feedback
- **Code Organization**: Modular code structure with clear separation of concerns
- **Security**: Implementation of proper authentication and authorization
- **Performance**: Optimized rendering and data fetching
- **Accessibility**: Semantic HTML and proper ARIA attributes

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License - feel free to use this project for your own purposes.