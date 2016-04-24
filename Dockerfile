FROM node:5.11.0

ENV NODE_ENV production
RUN mkdir -p /app/
WORKDIR /app/
COPY dist/ /app/
RUN npm install
EXPOSE 80
CMD node server/app.js
