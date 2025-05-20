# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Development environment
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies including devDependencies
RUN npm install

# Copy source code
COPY . .

# Expose development port
EXPOSE 8080

# Start development server directly
CMD ["npm", "run", "dev"]

# Stage 3: Production environment
FROM node:20-alpine AS production

WORKDIR /app

# Set to production environment
ENV NODE_ENV production

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

# Set the correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 8080

# Environment variables
ENV PORT 8080
ENV HOSTNAME "0.0.0.0"
# Start the application
CMD ["node", "server.js"]
