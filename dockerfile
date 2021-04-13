FROM node:14.16.0

MAINTAINER mo

LABEL version="1.0"

#Env
ENV PORT=23810
ENV kafkaProducerId=rest-kafka-pang
ENV kafkaProducerBrokerList=localhost:9092
ENV kafkaConsumerBrokerList=localhost:9092

#Create work directory for container
WORKDIR /mo/app

#now in /mo/app
#Copy package.json file to work directory and install all packages
COPY package.json .
RUN npm install

#Copy all other source code to work dir 
ADD . /mo/app

#tsc
RUN npm run compile 

#start
CMD ["npm", "start"]
EXPOSE 23810
