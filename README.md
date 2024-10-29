# E-Renting Website

An e-renting website created to improve knowledge in Next.js, React Query, Ant Design, Zustand, Prisma, PostgreSQL, and NextAuth.

## Features

- **User Features:**
  - View all available items.
  - Add item to borrow to their carts.
  - Request to borrow items from their carts.
  - View all requests made by the user.
  - Notice if the borrowed item need to be return via FloatButton

- **Admin Features:**
  - Product dashboard to edit product properties.
  - Request dashboard to approve or reject user requests.

## Features to add

- **User Features:**
   - Edit User profile (name, image, change password)
  
- **Admin Features:**
   - User dashboard

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/)
  - [React Query](https://react-query.tanstack.com/)
  - [Ant Design (antd)](https://ant.design/)
  - [Zustand](https://zustand.surge.sh/)
  - [Sass](https://sass-lang.com/)

- **Backend:**
  - [Prisma](https://www.prisma.io/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [NextAuth](https://next-auth.js.org/)

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a .env file in the root directory and add the following:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/database
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret
   ```

4. Run Prisma migrations to set up the database:
   ```bash
   pnpm dlx prisma migrate dev
   ```

### Running the Application

Start the development server via ```pnpm dev``` and then open your browser and navigate to `http://localhost:3000`.

