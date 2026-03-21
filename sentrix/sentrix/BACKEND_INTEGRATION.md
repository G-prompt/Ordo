# Sentrix Frontend - Backend Integration Guide

## Project Structure

```
sentrix/
├── public/
│   ├── logo.svg              # Sentrix logo (monitor icon)
│   └── favicon.svg           # Browser tab icon
├── src/
│   ├── assets/
│   │   ├── icons/            # Reusable UI icons (empty - add as needed)
│   │   └── logos/            # Additional logos (empty - for future use)
│   ├── components/
│   │   ├── pages/
│   │   │   ├── auth/         # Authentication pages (Login, Signup)
│   │   │   └── mainscreens/  # Dashboard screens
│   │   ├── Reusable UI components/
│   │   │   ├── charts/       # RiskChart, TransactionChart
│   │   │   ├── layout/       # Navbar, Sidebar, PageContainer
│   │   │   ├── tables/       # MerchantTable, TransactionTable
│   │   │   └── ui/           # Badge, Button, Card, Modal
│   ├── features/             # Redux slices and API utilities
│   │   ├── alerts/
│   │   ├── auth/
│   │   ├── merchants/
│   │   └── transactions/
│   ├── hooks/                # Custom React hooks
│   ├── services/
│   │   ├── apiClient.js      # HTTP client for API calls
│   │   └── transactionService.js
│   ├── store/                # Redux store configuration
│   ├── routes/               # React Router setup
│   └── utils/                # Utilities & constants
```

## Backend API Integration

### Current Setup
- **API Client**: `src/services/apiClient.js` - Simple fetch-based HTTP client
- **Mock Data**: Using dummy data with setTimeout for development

### Expected Endpoints

The frontend expects these API endpoints. Ensure your backend implements them:

#### 1. **Authentication**
```
POST /auth/login
  Request: { email: string, password: string }
  Response: { token: string, user: object }

POST /auth/signup
  Request: { email: string, password: string, name: string }
  Response: { token: string, user: object }

GET /auth/me (with Authorization header)
  Response: { user: object }
```

#### 2. **Transactions**
```
GET /transactions
  Response: Array of { id, amount, merchant, risk, score, date }

GET /transactions/:id
  Response: { transaction details }

POST /transactions/analyze
  Request: { transactionData }
  Response: { riskScore, analysis }
```

#### 3. **Merchants**
```
GET /merchants
  Response: Array of merchant objects

GET /merchants/:id
  Response: { merchant details }
```

#### 4. **Alerts**
```
GET /alerts
  Response: Array of { id, type, message, severity, timestamp }

PATCH /alerts/:id/acknowledged
  Response: { updated alert }
```

### Integration Steps for Backend Developer

1. **Update API Client** (`src/services/apiClient.js`):
   - Add base URL: `process.env.VITE_API_URL`
   - Add authentication token handling
   - Implement error responses

2. **Replace Mock Data** in `src/features/*/` files:
   - Remove `setTimeout` mock calls
   - Use actual `apiClient.get()` calls
   - Handle errors and loading states

3. **Environment Variables**:
   - Create `.env.local` with `VITE_API_URL=your-backend-url`
   - Frontend uses Vite's `import.meta.env.VITE_API_URL`

4. **CORS Configuration**:
   - Ensure backend allows frontend origin in CORS headers
   - Accept `Authorization: Bearer {token}` headers

### Redux Store Structure
- Auth slice: `src/features/auth/authSlice.js`
- Transactions slice: `src/features/transactions/transactionSlice.js`
- Merchants slice: `src/features/merchants/merchantSlice.js`
- Alerts slice: `src/features/alerts/alertSlice.js`

### Key Frontend Files to Know
- **Entry**: `src/main.jsx`
- **App Setup**: `src/App.jsx`
- **Router**: `src/routes/AppRoutes.jsx`
- **Protected Route**: `src/components/ProtectedRoute.jsx` (checks auth token)

## Asset Information

### Logo
- **File**: `public/logo.svg`
- **Design**: Monitor icon with concentric circles
- **Colors**: White with circular ring design
- **Usage**: Navbar brand, favicon
- **Format**: SVG (scalable, lightweight)

### Configuration Files
- **Vite**: `vite.config.js` (build tool)
- **Tailwind**: `tailwind.config.js` (CSS framework)
- **ESLint**: `eslint.config.js` (code quality)
- **PostCSS**: `postcss.config.js` (CSS processing)

## Development Workflow
1. `npm install` - Install dependencies
2. `npm run dev` - Start dev server
3. `npm run lint` - Check code quality
4. `npm run build` - Production build
5. `npm run preview` - Preview production build

## Notes for Backend Integration
- ✅ Frontend uses modern React 19 with hooks
- ✅ Redux for state management
- ✅ Tailwind CSS for styling (no conflicting CSS)
- ✅ React Router for navigation
- ✅ Vite for fast development
- ⚠️ Keep API responses consistent with frontend expectations
- ⚠️ Send proper HTTP status codes and error messages
- ⚠️ Include `Content-Type: application/json` in responses
