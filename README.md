
# MERN Stack Agriculture Based E-Commerce Platform

## Overview

This project is a comprehensive e-commerce platform built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform supports two types of users: retailers and companies. It includes features such as email-based authentication, product management, order management, loan management, and scheduling calls.
## Features

### Retailers:

- **Authentication:**
  - Register and login via email (NodeMailer)
- **Product Management:**
  - Browse products
  - Add products to cart
  - Manage cart
  - Checkout
- **Loan Management:**
  - Apply for loans
  - View loan statuses
- **Order Management:**
  - View order status
- **Company Interaction:**
  - View all available companies
  - See top-rated companies and products
- **Scheduling:**
  - Schedule calls with companies
  - View Schedule
  - Make call
- **Feedback and rating:**
  - Give feedback and rating


### Companies:

- **Authentication:**
  - Register and login via email (NodeMailer)
- **Product Management:**
  - Add products
  - Manage products
- **Order Management:**
  - Manage and view orders
- **Loan Management:**
  - View and track loan statuses of retailers
  - Accept or reject loan requests
- **Retailer Interaction:**
  - View all available retailers
- **Scheduling:**
  - Schedule calls with retailers
  - View Schedule
  - Make call



## Installation

### Prerequisites

  - Nodejs
  - MongoDB

### Backend Setup

1. First clone this to your local machine using git:

```bash
git clone https://github.com/osamullah420/Agrosage-MernStack.git

cd Agrosage-MernStack/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create .env File  in the `backend` directory and set your credentials:


```env
PORT = 8080

MONGO_URL = your mongo url

JWT_SECRET = your jwt secret

EMAIL= your email for node mailer
EMAIL_PASSWORD= less secure app passwrd for email

CLOUDINARY_CLIENT_NAME = your cloudinary client name
CLOUDINARY_CLIENT_API = your cloudinary api
CLOUDINARY_CLIENT_SECRET = your cloudinary client secret
```

### Frontend Setup

1. Navigate to the `frontend` directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

### Starting Project

1. Run this Command to concurrently run frontend & backend ( make sure you are in backend directory):

```bash
npm run get
```

2. Copy and Paste this in your browsser :

```bash
http://localhost:5173/
```

### Usage

- Access the application at http://localhost:5173.
- Register as a retailer or company and log in using the email-based authentication.
- Retailers can browse products, manage carts, checkout, apply for loans, give feedback and schedule calls.
- Companies can add and manage products, manage orders, track loan statuses, and schedule calls.


This README provides step-by-step instructions for cloning the repository, setting up the backend and client, and running the application.




    
