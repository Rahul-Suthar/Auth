#Use latest Node.js LTS version
FROM node:20-alpine

#Set working directory
WORKDIR /app

#Copy packag files and install dependencies
COPY package*.json ./
RUN npm install --production

#Copy the entire project
COPY . .

#Expose the port app runs on 
EXPOSE 3000

#Start the app
CMD ["npm", "start"]
