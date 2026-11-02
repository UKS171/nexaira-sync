# Nexaira Sync

**Nexaira Sync** is a lightweight merchant dashboard designed to help small businesses manage products, inventory, sales, and customer orders from one simple workspace.

The prototype focuses on a simple workflow: a merchant receives a customer message such as **"2 red shirts, size L"**, and the application extracts the product, quantity, and optional size to create an order, update inventory, and calculate sales.

## Live Demo

**Netlify:** https://scintillating-capybara-a26ce4.netlify.app/

## GitHub

**Repository:** https://github.com/UKS171/nexaira-sync

## Features

### 1. Product Management

- Displays products with price and current stock.
- Shows inventory status including in-stock, low-stock, and out-of-stock states.
- Updates stock immediately after a successful order.

### 2. Sales Tracking

- Calculates the total value of completed orders.
- Displays the number of completed orders.
- Updates sales totals immediately when a new order is created.

### 3. Customer Message → Order

Merchants can enter a customer message such as:

```text
2 red shirts, size L
```

The application extracts:

- Product
- Quantity
- Optional size

It then validates the available inventory, creates the order, reduces stock, and adds the order value to total sales.

### 4. Recent Orders

Created orders are displayed in the Recent Orders section with:

- Order ID
- Product
- Quantity
- Size
- Total
- Creation time

### 5. Responsive Interface

The dashboard is designed to work across desktop, tablet, and mobile screen sizes.

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React**
- **Browser localStorage**

## Project Structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── DashboardHeader.tsx
│   ├── OrderForm.tsx
│   ├── ProductTable.tsx
│   ├── RecentOrders.tsx
│   └── StatCard.tsx
│
├── data/
│   └── products.ts
│
├── lib/
│   ├── orderParser.ts
│   └── storage.ts
│
└── types/
    └── index.ts
```

## Order Processing Flow

```text
Customer Message
       ↓
Order Parser
       ↓
Product & Quantity Detection
       ↓
Inventory Validation
       ↓
Order Creation
       ↓
Stock Reduction
       ↓
Sales Update
       ↓
Recent Orders
```

The parser intentionally uses a lightweight rule-based approach for this prototype. This keeps the behavior predictable and avoids adding unnecessary complexity for the required use case.

## Data Persistence

The current prototype uses browser `localStorage` to persist:

- Products and inventory
- Created orders
- Sales data

This was chosen to keep the trial implementation lightweight and focused on the requested functionality without introducing authentication, database infrastructure, or unnecessary backend complexity.

Because the data is stored locally in the browser, different browsers or devices will have separate data.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/UKS171/nexaira-sync.git
```

Move into the project:

```bash
cd nexaira-sync
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

To verify the production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Production Improvements

For a production version, I would extend the prototype with:

- A database-backed product and order system
- Authenticated merchant accounts
- Server-side inventory transactions
- Multi-user synchronization
- Stronger natural-language order parsing or an LLM-powered extraction layer
- Product creation and editing
- Order status management
- Audit/history tracking
- Server-side validation and API endpoints
- Automated tests
- Role-based access control

These improvements were intentionally kept outside the trial scope so the implementation remains focused on the three requested core features.

## Design Approach

The interface uses a restrained merchant-focused design with clear hierarchy, simple tables, compact summary cards, and responsive layouts.

The goal was to make the dashboard practical for a small merchant rather than turning it into a visually heavy AI dashboard.

---

**Built as a focused prototype for the Nexaira Sync trial task.**
