# Coesya – React + TypeScript Learning Project

This project is a **personal learning playground** built to deepen my understanding of **React**, **TypeScript**, and modern front-end development practices.

It combines a realistic application structure (authentication, routing, API integration, UI components) with an emphasis on code organization, type safety, and reusable patterns.

---

## 🧩 Stack Overview

| Area | Technology / Library | Purpose |
|------|----------------------|----------|
| **Framework** | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Component-based UI with static typing |
| **Routing** | [TanStack Router](https://tanstack.com/router) | File-based routing and route guards |
| **Data fetching & cache** | [TanStack Query (React Query)](https://tanstack.com/query) | Server-state management and API cache |
| **HTTP client** | [Axios](https://axios-http.com/) | Simplified API requests |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **State & context** | React Context (custom `AuthContext`) | Authentication and user session management |
| **Dev tools** | Vite + React Query Devtools + TanStack Router Devtools | Fast build, debugging, and introspection |

---

## ⚙️ Project Goals

- Strengthen understanding of **React component architecture**
- Practice **TypeScript** with React hooks, contexts, and generics  
- Learn **client-side authentication** patterns (login/logout, protected routes)
- Experiment with **TanStack Router** and **React Query** integration
- Build **reusable UI components** (Button, Input, etc.) using Tailwind CSS
- Structure a realistic app with **feature-based folders**

---

## 📁 Folder Structure

```
src/
├─ features/
│  ├─ auth/               # Authentication logic (context, hooks, API)
│  └─ ...                 # Future features
├─ lib/                   # Shared utilities (axios, helpers)
├─ routes/                # TanStack Router route files
├─ components/            # UI components
└─ main.tsx               # App entry point
```

---

## 🚀 Development

Run locally with:

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**

---

## 🧠 Notes

This is **not a production project**, but a hands-on environment to explore patterns, tools, and libraries in the modern React ecosystem.

Feel free to use it as a reference or starting point for your own experiments!
