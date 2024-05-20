# Development stage
FROM --platform=linux/amd64 node:alpine AS development

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy necessary files
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Copy your source code
COPY apps/job apps/job
COPY libs libs

# Install dependencies
RUN pnpm install -r

# Your application's default command
CMD ["pnpm", "run", "start:dev", "job"]