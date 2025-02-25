# Use Node.js 20 LTS slim version as the base image to reduce size
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory and install dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force

# Copy the rest of the application code to the working directory
COPY . .

# Copy the .env file to the working directory
# COPY .env .

# Expose the port your app runs on
EXPOSE 5001

# Command to run the application
CMD ["npm", "start"]
