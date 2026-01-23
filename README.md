# 🍽️ Ayadi Catering — Frontend

This repository contains the **frontend application** for the **Ayadi Catering** platform — a responsive and user-friendly web app built with **Next.js**, **TypeScript**, and modern React best practices. This frontend is designed to work with the corresponding backend API to deliver a seamless catering experience.

---

## 🚀 Live Demo

You can view the hosted frontend application:  
👉 https://ayadicatering.com

---

## 🛠️ Features

- 🖥️ **Modern Frontend Framework**: Built using Next.js (React) for server-side rendering and static site generation.
- 🧠 **TypeScript Support**: Fully typed codebase for enhanced developer experience and fewer runtime errors.
- 🎨 **Responsive UI**: Designed to work smoothly on mobile and desktop screens.
- 🔁 **API Integration Ready**: Connects to a backend catering API to fetch and submit data.
- 📦 **Custom Hooks & Utilities**: Includes reusable hooks and utility functions for clean code organization.
- 🌍 **Internationalization (i18n)** (if supported): Ready for localization and multi-language support.

---

## 🧩 Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Framework        | Next.js (React)         |
| Language         | TypeScript              |
| Styling          | CSS / Tailwind or other |
| State Management | React Hooks / Redux?    |
| Environment      | Vercel deployment       |

---

## 📦 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/muhammadranju/ayadicatering-frontend.git
cd ayadicatering-frontend
```

### 2. Install dependencies

Using bun:

```bash
bun install
```

Or using bun:

```bash
bun
```

### 3. Create your environment variables

Create a `.env.local` file in the root and add environment variables required by your app. A typical example might be:

```
NEXT_PUBLIC_API_URL=<your_backend_api_url>
```

### 4. Run the development server

```bash
bun run dev
```

or

```bash
bun dev
```

Your app will start at `http://localhost:3000`.

---

## 📁 Project Structure

````plaintext
├── app/                # Next.js pages and layouts
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── i18n/               # Localization files
├── interface/          # TypeScript interfaces
├── lib/                # Utilities and helper functions
├── locales/            # Language translations
├── public/             # Static assets (images, icons)
├── types/              # TypeScript type definitions
├── next.config.ts      # Next.js configuration
├── package.json        # Project metadata & scripts
└── tsconfig.json       # TypeScript configuration
``` :contentReference[oaicite:9]{index=9}

---

## 📱 Usage

After starting the development server, you can:

- Browse the UI in your browser
- Test API flows with your backend (e.g., login, menus, orders)
- Modify UI components and styles
- Build for production:

```bash
bun run build
````

---

## 🧪 Testing

Add unit or integration tests using tools such as **Jest** and **React Testing Library**. Testing ensures UI stays reliable as you enhance the application.

---

## 💬 Contact

If you have questions or need help, open an issue or connect via GitHub.
