FROM node:18

WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./

RUN npm install --production

COPY ./frontend ./

EXPOSE 3000

# Command to start the Node.js server
CMD ["npm", "start"]
