# Use an official Node.js runtime as a parent image
FROM node:14-alpine as development

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . ./

# Build the Next.js app
RUN npm run build

# Set the environment variable for the production build
ENV NODE_ENV=production

# Expose port 3000 for the app to run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

# # --------------------------------------------------------------


FROM node as production

WORKDIR /app

COPY package.json package.json

COPY . ./

RUN npm install --force

# Build
RUN npm run build

# # --------------------------------------------------------------


FROM node as test

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force --only=development

COPY . ./

