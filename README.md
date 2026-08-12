# InvoiceFlow

A clean, client-side invoice generator built with React, TypeScript, and Tailwind CSS. It allows freelancers and small businesses to instantly fill details, validate inputs, calculate tax/discount ratios, and compile professional PDF invoices directly within the browser with zero server latency.

[![InvoiceFlow Live Site](https://img.shields.io/badge/Live_Demo-invoiceflow--maker.vercel.app-purple?style=flat-to-the-badge)](https://invoiceflow-maker.vercel.app)


<img width="1911" height="945" alt="InvoiceFlow Interface Preview" src="https://github.com/user-attachments/assets/79beb493-2733-4d66-8d71-8f0772363ae2" />




---

## Overview

InvoiceFlow is designed as a direct, friction-free tool for generating business documents. Traditional invoicing systems often require database syncs, mandatory sign-ups, or remote server-side document rendering which introduces latency and exposes transactional data. 

InvoiceFlow processes, calculates, and compiles everything on the client’s machine. The user inputs their company, client, and item configurations, watches the totals balance in real time, and exports a formatted PDF instantly.

---

## Key Features

*   **Dynamic Line-Item Adjustments:** Append, modify, or remove transaction lines on the fly without affecting the rest of the form state.
*   **Real-Time Math Engine:** Instantly calculates subtotals, flat-rate discounts, customizable tax percentages, and final totals as inputs change.
*   **Schema-Validated Data Entry:** Form inputs are backed by a programmatic validation layer checking for valid emails, numeric bounds, and empty states.
*   **Zero-Server PDF Compiling:** Generates and downloads structured multi-column PDF layouts instantly on the client side.
*   **Responsive Dark Interface:** Mobile-friendly dashboard designed with accessible interactive card sections.

---

## Engineering Highlights

### 1. Unified Form State with Schema Validation
*   **What:** Managing complex nested objects (multiple clients, company info, and dynamic line item arrays) within a single form can easily lead to layout re-renders or computation errors (`NaN` values).
*   **Why:** Combining standard native React state with complex math risks out-of-sync calculations.
*   **How:** Integrated `react-hook-form` along with custom `Zod` schemas (`invoiceSchema.ts`). This guarantees that all strings and numbers are strictly parsed, validates email formats instantly, and flags incorrect inputs before any rendering takes place.

### 2. Isolated Field Array Management
*   **What:** Users need to dynamically add, edit, or delete dynamic list elements (Line Items) without triggering performance bottlenecks.
*   **Why:** Global state updates on every keystroke in a massive input list can cause input lag.
*   **How:** Implemented the `useFieldArray` hook to isolate state mutations to the list items specifically, keeping the parent components stable and keeping typing interactions fast and responsive.

### 3. Client-Side Document Generation
*   **What:** Rendering styled PDFs usually requires hosting a virtual chromium engine (like Puppeteer) on a remote server, introducing high hosting fees and data privacy concerns.
*   **Why:** Offline functionality and absolute data privacy are major assets for freelance business operations.
*   **How:** Created an client-side generation pipeline inside `pdfGenerator.ts` using `jspdf` and `jspdf-autotable`. The browser reads raw state, calculates spacing parameters, draws dynamic table rows, and triggers a local file download directly in the user's browser.

### 4. Interactive State Synchronization
*   **What:** All pricing parameters must dynamically update the visual financial card on every keystroke.
*   **Why:** Static calculation buttons or manual updates degrade user satisfaction and feel outdated.
*   **How:** Employed `watch` observables inside the form runtime hooked into reactive state arrays. Updates to item counts, rates, taxes, or discounts recalculate final equations in real time.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & Engine** | React 18, TypeScript, Vite |
| **Styling & UI Kit** | Tailwind CSS, Shadcn Components |
| **State & Validation** | React Hook Form, Zod Schemas |
| **Document Compiling** | jsPDF, jsPDF AutoTable |
| **Motion & Alerts** | Framer Motion, Sonner Notifications, Lucide Icons |
| **Package Management** | Bun |

---

## Project Structure

```directory
invoice-flow/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── AnimatedBackground.tsx
│   │   ├── InvoiceForm.tsx        # Main invoice form
│   │   └── Footer.tsx
│   ├── hooks/
│   ├── lib/
│   │   ├── invoiceSchema.ts       # Form validation
│   │   └── utils.ts
│   ├── pages/
│   │   └── Index.tsx
│   ├── types/
│   │   └── invoice.ts             # Invoice data types
│   ├── utils/
│   │   └── pdfGenerator.ts        # PDF generation
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── vite.config.ts
```

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/abdul-rahman-0x/invoice-flow.git
   cd invoice-flow
   ```

2. Install the necessary project dependencies:
   ```bash
   bun install  # or npm install
   ```

3. Fire up the local development runtime:
   ```bash
   bun run dev  # or npm run dev
   ```

4. Open your browser and navigate to the address shown in your terminal (typically `http://localhost:5173`).

---

## What This Project Demonstrates

*   **Type-Safe Frontend Architecture:** Clean TypeScript compilation with strict interface safety across form states, utility functions, and document generation modules.
*   **Complex Form Lifecycles:** Managing multi-step, dynamic, nested user inputs while keeping execution performance and UI transitions smooth.
*   **Serverless Document Compiling:** Turning complex visual data states into print-ready document streams entirely inside standard client runtimes.
*   **Modern Frontend Styling:** Combining a dark user interface with custom background shaders and layout stability.


---

## Author

Build by **[Abdul Rahman](https://github.com/abdul-rahman-0x)**.
