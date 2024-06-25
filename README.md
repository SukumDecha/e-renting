# E-Renting Website

An e-renting website created to improve knowledge in Next.js, React Query, Ant Design, Zustand, Prisma, PostgreSQL, and NextAuth.

## Preview

### User view:
<div style="display: flex; flex-wrap: wrap;">
    <img src="screenshots/user/unauth.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/user/login.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/user/register.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/user/index.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/user/product-list.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/user/product-item.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/user/cart.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/user/cart-form.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/user/request.png" alt="E-Renting Website Preview" width="200">
</div>

### Admin View

<div style="display: flex; flex-wrap: wrap;">
    <img src="screenshots/admin/product-dashboard.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/admin/product-edit.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/admin/request-table.png" alt="E-Renting Website Preview" width="200">
    <img src="screenshots/admin/request-action.png" alt="E-Renting Website Preview" width="200">
</div>

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

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/)
  - [React Query](https://react-query.tanstack.com/)
  - [Ant Design (antd)](https://ant.design/)
  - [Zustand](https://zustand.surge.sh/)

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

