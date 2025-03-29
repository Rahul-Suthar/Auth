#Use latest Node.js LTS version
FROM node:20

#Set working directory
WORKDIR /app

#Copy packag files and install dependencies
COPY package*.json ./
RUN npm install --production

#Copy the entire project
COPY . .

# set permissions
RUN chmod -R 755 /app

#Expose the port app runs on 
EXPOSE 3000

#Start the app
CMD ["node", "server.js"]
