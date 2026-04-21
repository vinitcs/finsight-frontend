# FinSight Frontend

**Personal Finance Analytics Dashboard** - React + Vite frontend for tracking and analyzing personal finances.

## Overview

Modern, responsive React application for managing bank accounts, uploading statements, and viewing financial analytics with interactive charts.

### Key Features

- User authentication (login/register)
- Bank account management
- PDF bank statement upload
- Transaction history viewer
- Advanced analytics dashboards with charts
- Monthly and yearly balance trends
- Cash flow analysis (credits vs debits)
- Top transactions visualization
- User settings & preferences
- Responsive design

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **React DatePicker** - Date selection

## Project Structure

```
src/
├── api/              # API client modules (axios instances & endpoints)
├── components/       # Reusable React components
│   ├── common/       # Shared components (navbar, sidebar)
│   ├── layout/       # Layout wrappers
│   ├── charts/       # Chart components
│   ├── account/      # Account components
│   ├── analytics/    # Analytics components
│   └── DatePicker/   # Date picker
├── pages/            # Page components
│   ├── Auth/         # Login/Register pages
│   ├── Dashboard/    # Main dashboard
│   ├── Analytics/    # Analytics page
│   ├── Transactions/ # Transactions page
│   ├── Account/      # Account management
│   ├── Upload/       # File upload page
│   └── Settings/     # User settings
├── hooks/            # Custom React hooks
├── store/            # Redux store & slices
├── config/           # App configuration & routes
├── theme/            # Theming & colors
├── utils/            # Utility functions
├── App.jsx           # Root component
└── main.jsx          # Entry point
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

```
VITE_API_URL=http://localhost:5000/api/v1
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Key Pages

- **Dashboard** - Overview with stats and recent transactions
- **Analytics** - Multiple charts: yearly, monthly trends, amount ranges, top transactions, balance tracking
- **Transactions** - List of all user transactions
- **Upload** - Upload bank statement PDFs
- **Accounts** - Manage bank accounts
- **Settings** - User preferences
- **Auth** - Login and registration

## Development Workflow

The frontend communicates with the backend API at `/api/v1`:
- Axios interceptors handle authentication & errors
- Redux manages global state (auth, transactions, analytics)
- Custom hooks provide easy data fetching & caching
- Components are modular and reusable

## Deployment

```bash
npm run build
# Deploy dist/ folder to hosting platform
```

## License

ISC

## Author

Vinit Chavan
