# E-Commerce Project

Welcome to the E-Commerce Project! This project is a comprehensive e-commerce platform built using NestJS for the backend, with PostgreSQL as the database and TypeORM as the ORM.

## Features

- User Registration and Login
- Product Management
- Shopping Cart
- Order Management
- JWT-based Authentication
- Encrypted Passwords with Bcrypt
- Image Storage with Cloudinary
- API Documentation with Swagger

## Technologies Used

- **Backend**: NestJS, TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT, Bcrypt
- **Image Storage**: Cloudinary
- **API Documentation**: Swagger
- **UUID**: for unique identifiers

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/ecommerce-project.git
cd ecommerce-project
```

2. **Install the dependencies**

```bash
npm install
```

3. **Configure the environment variables**

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
DB_NAME= dbname
DB_HOST= host
DB_PORT= dbport
DB_USERNAME= dbusername
DB_PASSWORD= dbpassword
CLOUDINARY_CLOUD_NAME= cloudinary name
CLOUDINARY_API_SECRET= cloudinary api secret
CLOUDINARY_API_KEY= cloudinary api key
JWT_SECRET= idontknowwhattosay
```

Replace the placeholder values with your actual configuration details.

4. **Run database migrations**

```bash
npm run migration:run
```

5. **Start the development server**

```bash
npm run start
```

Your application should now be running at `http://localhost:3000`.

## Usage

- Register a new user or log in with an existing account.
- Browse products and add them to your shopping cart.
- Proceed to checkout and complete the purchase.
- Manage your orders and view order history.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any questions or suggestions, please contact [your-email@example.com](mailto:angel.gaitan.ev@gmail.com).

Thank you for using the E-Commerce Project! Happy shopping!
