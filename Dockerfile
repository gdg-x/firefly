# [START docker]
# This Dockerfile is optional and was generated using:
#   $ gcloud preview app gen-config .
# The default base image is a Debian-based container with Node.js installed.
# The image will execute "npm start" to run the application. You can customize
# this Dockerfile to modify your application's runtime environment, or you can
# use a different base image entirely.
FROM gcr.io/google_appengine/nodejs

COPY package.json /app/
RUN npm install grunt-cli -g
RUN npm install
COPY . /app/
CMD npm start
