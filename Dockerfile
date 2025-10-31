# Use Node.js 18 LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all server files
COPY . .

# Expose server port (adjust if your server uses another port)
EXPOSE 5000

# Start server
CMD ["npm", "start"]
