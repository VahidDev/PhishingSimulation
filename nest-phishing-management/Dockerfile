# Use an official Node.js image
FROM node:18-alpine

# Install build dependencies
RUN apk add --no-cache python3 make g++ 

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Ensure bcrypt is rebuilt for the correct platform
RUN npm rebuild bcrypt --build-from-source

# Copy application files
COPY . .

# Build the app
RUN npm run build

# Expose the app on port 3001
EXPOSE 3001

# Run the app in production mode
CMD ["npm", "run", "start:prod"]
