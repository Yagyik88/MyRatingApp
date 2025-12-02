FROM node:18
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of backend
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
