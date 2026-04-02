# Ticket Management Dashboard

A modern, high-performance React application designed for project managers and development teams to track, route, and resolve system issues. This project focuses on strict data validation, enterprise-grade UX, and real-time metric visualization.

## Features

* **Intelligent Dashboard:**
  * Real-time KPI monitoring (Total Pool, Backlog, Active, Resolved).
  * 30-Day Velocity Area Chart tracking opened vs. resolved ticket trends.
  * Active Distribution Pie Chart and Developer Workload Bar Chart.
  * Live feed of recent arrivals.
* **Smart Ticket Creation:**
  * **Auto-Save:** Drafts are continuously saved to `sessionStorage` to prevent data loss on accidental refreshes.
  * **Pipeline Routing:** Instantly route tickets to the "Backlog" (Unassigned) or the "Active Cycle" (In Progress/Done/Ready).
  * **Strict Validation Gates:** Enforces business logic (e.g., Active tickets *must* have an assignee).
* **Enterprise Issue Grid (AG Grid):**
  * High-performance data grid with custom cell renderers and status badges.
  * Quick-filter tabs for All Tickets, Active (Assigned), and Backlog (TODO).
  * Inline editing and dynamic status updating.
* **System Archive:**
  * Dedicated cold-storage screen for `RESOLVED` and `DELETED` tickets to keep the active board clutter-free.
  * One-click restore functionality to send tickets back to the active backlog.

## Tech Stack

* **Framework:** [React 18+](https://react.dev/)
* **Routing:** [React Router v6](https://reactrouter.com/)
* **State Management:** React Context API + `useReducer`
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Data Grid:** [AG Grid Community](https://www.ag-grid.com/react-data-grid/)
* **Data Visualization:** [Recharts](https://recharts.org/)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (Lucide/Feather sets)

## Core Architectural Decisions

1. **Strict UI Validation over Complex UI Toggles:** Instead of using convoluted UI states to manage ticket creation, the application relies on strict, unbreakable validation gates inside the submit handlers. A ticket cannot be saved to an Active state without an Assignee, preventing database pollution.
2. **Separation of Active vs. Archive Data:** Resolved and Deleted tickets are visually and programmatically separated from the active pipeline to reduce cognitive load on the user and simulate enterprise database querying optimization.
3. **Optimized Renders:** Heavy data manipulations (like calculating Recharts metrics or filtering AG Grid rows) are wrapped in `useMemo` to ensure lightning-fast performance even with hundreds of simulated tickets.
4. **Frictionless UI Showcase (No Authentication):** This application is currently architected as a frontend prototype demonstrating advanced state management and UI/UX design. It intentionally omits an authentication layer and backend database to ensure reviewers, developers, and users can instantly interact with the dashboard without encountering a login wall. The modular React Context setup allows for easy integration with backend services (like Firebase, Supabase, or Node.js) when preparing for production.