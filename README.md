# Travel Booking System - Frontend

A modern ReactJS frontend for a travel booking platform built with Vite, TypeScript, Axios, and TailwindCSS.

## Features

✅ **User Authentication**
- Login page with credentials (username/password)
- Session management using tokens
- Protected routes for authenticated users

✅ **Tour Management**
- Browse all available tours
- View detailed tour information
- Dynamic tour listing with loading states

✅ **Booking System**
- Book tours with automatic user ID from auth context
- Real-time booking status feedback
- Success and error handling
- Booking confirmation display

✅ **UI/UX**
- Responsive design with TailwindCSS
- Loading spinners during API calls
- Error messages for failed requests
- Clean and modern interface

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **PostCSS + Autoprefixer** - CSS processing

## Project Structure

```
src/
├── components/           # React components
│   ├── Login.tsx        # Login page
│   ├── TourList.tsx     # Tour listing page
│   ├── TourDetails.tsx  # Single tour details & booking
│   ├── Layout.tsx       # Main layout with header/footer
│   └── ProtectedRoute.tsx # Route protection component
├── context/             # React context for state management
│   └── AuthContext.tsx  # Authentication context
├── services/            # API service layer
│   └── api.ts          # Axios API client
├── types/              # TypeScript types
│   └── index.ts        # Shared type definitions
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point
├── index.css           # Global styles with Tailwind directives
└── App.css             # Component-specific styles
```

## API Integration

The frontend connects to an **Orchestrator API** (not individual services).

### Available Endpoints

- **POST /login** - User authentication
- **GET /tours** - Get all tours
- **GET /tours/:id** - Get specific tour details
- **POST /book-tour** - Book a tour

### API Configuration

Set the API base URL in `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Development

```bash
npm run dev
```

The app will start at `http://localhost:5173` (Vite default port).

### 1. Login
- Navigate to the login page at `/login`
- Enter any username and password to authenticate
- The auth token is stored in localStorage

### 2. Browse Tours
- After login, you'll be redirected to `/tours`
- The tour list is fetched from the Orchestrator
- Cards display key tour information

### 3. View Tour Details
- Click "View Details" on any tour card
- See full tour information, pricing, and duration
- Click "Book Now" to make a reservation

### 4. Booking
- Booking sends userId and tourId to the Orchestrator
- Success/failure message is displayed
- Booking confirmation is stored

### 5. Logout
- Click "Logout" button in the header
- Session is cleared and user is redirected to login

## Component Details

### AuthContext
- Manages authentication state globally
- Provides `login()` and `logout()` functions
- Stores userId and token in localStorage
- Used by all protected components

### Login Component
- Form with username/password inputs
- Loading state during authentication
- Error message display
- Redirects to tours on successful login

### TourList Component
- Fetches all tours on mount
- Loading spinner while fetching
- Grid layout with tour cards
- Click card to view details

### TourDetails Component
- Dynamic tour loading based on URL parameter
- Displays tour information in sections
- Booking form with price summary
- Booking result notification

### Layout Component
- Header with navigation and logout
- Footer with copyright info
- Wraps main content area
- Responsive navigation

### ProtectedRoute Component
- Redirects unauthenticated users to login
- Allows access only when authenticated
- Used for all sensitive routes

## State Management

- **Authentication**: React Context (AuthContext)
- **Component State**: React Hooks (useState, useEffect)
- **API Communication**: Axios with interceptors for token injection

## Error Handling

- Try-catch blocks in all API calls
- User-friendly error messages
- Loading states to prevent UI blocking
- Graceful fallbacks for failed requests

## Styling

- **TailwindCSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Indigo/blue theme
- **Animations**: Smooth transitions and loading spinners

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api  # Orchestrator API base URL
```

## Building for Production

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

## Important Notes

⚠️ **API Requirements**:
- The Orchestrator API must be running on `http://localhost:3000`
- All requests go through the Orchestrator, not individual services
- Booking endpoint expects: `{ userId: string, tourId: string }`

⚠️ **Demo Mode**:
- Login accepts any username/password combination for testing
- Tours are fetched from the mock/live Orchestrator
- Booking shows success/failure based on Orchestrator response

## Future Enhancements

- [ ] User profile page
- [ ] Booking history
- [ ] Favorites/Wishlist
- [ ] Tour reviews and ratings
- [ ] Payment integration
- [ ] Email confirmation
- [ ] Advanced filtering and search
- [ ] User account management

## License

MIT

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
