# Base Image
FROM node:12-alpine

# Directory in our container
WORKDIR /app

# Copy/Install dependencies into our directory in our container
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of files into the directory in our container
COPY . .

# Commands to start the app
CMD ["npm", "start"]