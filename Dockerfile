# Base Image
FROM node:12-alpine as base

# Directory in our container
WORKDIR /app

# Copy/Install dependencies into our directory
COPY package.json package-lock.json ./
RUN npm ci

# Test
FROM base as test
COPY . .
RUN npm run test

# Production
FROM base as prod
COPY . .
CMD ["npm", "start"]