## TDC Frontend


### URL
[Frontend](https://tdc-frontend.patricksantino.com)

[Backend](https://tdc-backend.patricksantino.com)

# Project Setup Guide

This guide will walk you through the steps to set up the project.

## Step 1: Clone the Repository

```bash
git clone https://github.com/sotobakar/tdc-frontend.git
```

## Step 2: Navigate to the Project Directory

```bash
cd tdc-frontend
```

## Step 3: Install Dependencies

```bash
yarn
```

## Step 4: Configure Environment Variables

Create a `.env` file in the root of your project and add the following:

```dotenv
VITE_API_URL=YOUR_API_URL
```

Adjust the values according to your project requirements.

## Step 5: Run the Application

```bash
yarn dev
```

Your website should now be running at [http://localhost:5000](http://localhost:5000).

## Additional Notes

- Make sure you have Node.js and yarn installed.
- Make sure you also run the backend, because the frontend will hit the REST API provided by the backend.