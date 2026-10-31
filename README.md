# NEXUS — Intelligent SaaS Analytics Platform

A production-grade, commercial-style SaaS Analytics Dashboard engineered with **React**, **Tailwind CSS**, **Recharts**, and **Framer Motion**.

Built by **Muhammad Rehan** (Software Engineering Student & Full-Stack Developer) as a flagship frontend portfolio showcase.

---

## 🌟 Live Features & Capabilities

### 1. Executive Analytics Overview
- **Dynamic Greeting**: *"Good morning, Alex 👋 — Here's what's happening with your business today."*
- **4 Premium KPI Stat Cards**:
  - **Total Revenue**: `$48,294.00` (+12.8% vs previous period)
  - **Total Customers**: `2,845` (+8.2% vs previous period)
  - **Total Orders**: `1,429` (+15.4% vs previous period)
  - **Conversion Rate**: `4.85%` (+2.1% vs previous period)
  - Includes real-time mathematical SVG sparkline charts, custom indicator badges, and hover elevation.
- **Interactive Revenue Trajectory**: Area chart with multi-stop gradients, previous period comparison dashed curves, and dynamic period toggling (**Weekly**, **Monthly**, **Yearly**).
- **Revenue Distribution Matrix**: Product Sales (41%), Subscriptions (34%), Services (17%), and Other Revenue (8%).
- **Live Event Stream**: Real-time customer upgrade, purchase, renewal, and refund notifications with instant status tags.

### 2. Deep-Dive Analytics & Intelligence
- **Full-Funnel Conversion Analysis**: Drop-off rates across 5 stages (Site Impressions → Unique Visitors → Trial Accounts → Checkout Initiated → Paid Subscriptions).
- **Cohort Growth & Churn Metrics**: Dual-area chart comparing active accounts against newly acquired users.
- **Customer Acquisition Donut**: Interactive breakdown of organic search, social media, direct traffic, referrals, and paid advertising.
- **Geographic Revenue Distribution**: Market penetration and revenue share across the US, UK, EU, Japan & APAC, and International territories.

### 3. Dedicated Financial & Revenue Management
- **Key Financial Ledger Metrics**: Total Revenue, Net Revenue, Gross Invoiced, and Refunds.
- **Payment Gateway Allocation**: Direct breakdown across Stripe (Credit Card), PayPal, Bank Wire (ACH), and Web3 Crypto rails.
- **Itemized Stream Breakdown**: Multi-column ledger tracking individual subscription tiers and enterprise contracts.

### 4. Interactive Transaction Management & Digital Receipts
- **Status Filtering**: Filter instantly between *Completed*, *Pending*, *Failed*, and *Refunded*.
- **Live Sorting & Pagination**: Sort by date or dollar amount, with customizable pagination.
- **Transaction Receipt Modal**: Detailed receipt view displaying invoice items, tax calculation, gateway processing fees, net settlement, and status changer.

### 5. Product Catalog & Inventory Management (CRUD)
- **Grid & Table View Switcher**: Choose between responsive high-density card grid and enterprise table layout.
- **Create & Edit Modal**: Validated modal form allowing catalog creation, pricing, stock count, description, and cover photo preset selection.
- **Delete Confirmation Dialog**: Accessible destructive confirmation modal preventing accidental data loss.
- **LocalStorage Persistence**: Additions and edits remain saved across page refreshes.

### 6. Executive Reports & Working CSV Data Export
- 4 Report Domains: **Revenue Report**, **Customer Report**, **Sales Performance**, **Product Performance**.
- **Browser-Native CSV Downloader**: True client-side RFC 4180 compliant CSV export generated via `Blob` and downloadable with one click.

### 7. Global Command Palette & Search (`⌘K` / `Ctrl+K`)
- Accessible from any page via shortcut or top navigation trigger.
- Simultaneous real-time multi-index search across **Pages**, **Products**, **Customers**, and **Transactions**.

### 8. Notification Center
- Dropdown alert tray with unread badge counter, category-specific icons, "Mark as read", "Mark all read", and "Clear all" controls.

### 9. Customization & Settings
- **Dark Obsidian (Default) & Slate Light Theme**: Smooth theme switcher with persistent HTML root class injection.
- **Profile Customizer**: Edit Full Name, Email, Role, and Avatar.
- **Preferences**: Currency selector (`$`, `€`, `£`, `¥`), timezone, and language.
- **Factory Reset Demo Data**: Restore default data state with one click.

---

## 🛠️ Technology Stack

- **Framework**: React 18+ (Functional Components & Hooks)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Micro-Interactions**: Framer Motion
- **Routing**: React Router DOM (v6+)
- **Notifications**: React Hot Toast
- **State Management**: React Context API (`ThemeContext`, `DashboardContext`)
- **Persistence**: Browser `localStorage`

---

## 📂 Project Architecture

```
nexus-saas-dashboard/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   ├── ThemeContext.jsx
    │   └── DashboardContext.jsx
    ├── hooks/
    │   └── useLocalStorage.js
    ├── utils/
    │   ├── formatCurrency.js
    │   └── exportCSV.js
    ├── data/
    │   ├── dashboardData.js
    │   ├── revenueData.js
    │   ├── customersData.js
    │   ├── transactionsData.js
    │   ├── productsData.js
    │   ├── notificationsData.js
    │   └── reportsData.js
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx
    │   │   ├── Topbar.jsx
    │   │   ├── MobileSidebar.jsx
    │   │   └── PageLayout.jsx
    │   ├── common/
    │   │   ├── Button.jsx
    │   │   ├── Badge.jsx
    │   │   ├── Modal.jsx
    │   │   ├── DataTable.jsx
    │   │   ├── DateFilter.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── MiniSparkline.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── LoadingSkeleton.jsx
    │   │   ├── GlobalSearchModal.jsx
    │   │   └── NotificationPanel.jsx
    │   ├── charts/
    │   │   ├── RevenueChart.jsx
    │   │   ├── CustomerGrowthChart.jsx
    │   │   └── AcquisitionDonutChart.jsx
    │   └── modals/
    │       ├── TransactionDetailModal.jsx
    │       ├── AddEditProductModal.jsx
    │       ├── DeleteConfirmModal.jsx
    │       ├── HelpCenterModal.jsx
    │       └── DocumentationModal.jsx
    └── pages/
        ├── Overview.jsx
        ├── Analytics.jsx
        ├── Revenue.jsx
        ├── Customers.jsx
        ├── Transactions.jsx
        ├── Products.jsx
        ├── Reports.jsx
        └── Settings.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### 1. Installation
Clone the repository or navigate to the project directory:
```bash
cd nexus-saas-dashboard
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` (or `http://localhost:5174/`) in your browser.

### 3. Build for Production
```bash
npm run build
```
This generates optimized, minified production assets in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Install the Vercel CLI or import the repository on [Vercel](https://vercel.com).
2. Set **Framework Preset** to `Vite`.
3. Set **Build Command** to `npm run build`.
4. Set **Output Directory** to `dist`.
5. For single-page app client routing, ensure a `vercel.json` rewrite file is present:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Deploy to Netlify
1. Link the repository on [Netlify](https://netlify.com).
2. Set **Build command**: `npm run build`
3. Set **Publish directory**: `dist`
4. Add a `_redirects` file in `public/` or `dist/`:
```
/*    /index.html   200
```

---

## 👨‍💻 Developer & Author

**Muhammad Rehan**  
Software Engineering Student & Aspiring Full-Stack Developer  
*Flagship Portfolio Project: NEXUS SaaS Analytics*
