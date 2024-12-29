# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application's code to the working directory
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose port 3000 to the host
EXPOSE 3000

# Define the command to run your app
CMD ["pnpm", "start"]
