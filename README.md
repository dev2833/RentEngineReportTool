# RentEngine Reporting Tool

## Overview
RentEngine Reporting Tool is an end-to-end leasing platform that covers the entire process for property managers. This project provides a web-based reporting tool to show the health statuses for each listing on various partner sites (like Zillow and Zumper). 

## Features
- Automatically create advertising and syndicate it to dozens of websites.
- Display health statuses of listings to help the operations team troubleshoot issues.
- Simple UI to show listing statuses across partner sites.

## Technology Stack
- Backend: Node.js with Express
- Frontend: React
- TypeScript for both backend and frontend
- Local storage for database (in-memory storage for simplicity)

## Prerequisites
- Node.js (version 14.x or later)
- npm (version 6.x or later)

## Getting Started

### Backend Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/pro335/RentEngineReportTool
    cd RentEngineReportTool
    ```

2. **Install backend dependencies:**
    ```bash
    cd server
    npm install
    ```

3. **Run the backend server:**
    ```bash
    npx ts-node server.ts
    ```

### Frontend Setup

1. **Navigate to the `client` directory:**
    ```bash
    cd client
    ```

2. **Install frontend dependencies:**
    ```bash
    npm install
    ```

3. **Run the React development server:**
    ```bash
    npm start
    ```

## Running the Project
1. Ensure the backend server is running by executing:
    ```bash
    npx ts-node src/server.ts
    ```

2. Ensure the frontend server is running by executing:
    ```bash
    cd client
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the RentEngine Reporting Tool.

## Conclusion
This tool helps in monitoring the health statuses of property listings across various partner sites.

