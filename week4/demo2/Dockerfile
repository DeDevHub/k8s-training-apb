FROM openjdk:8u212-jdk-alpine

# Set timezone
# Always have Bangkok timezone file beside Dockerfile
RUN echo "Asia/Bangkok" > /etc/timezone && date

ENV APP_HOME /usr/apps
WORKDIR $APP_HOME

ENV PORT 8080
EXPOSE $PORT
COPY target/*.jar ./

ENTRYPOINT ["sh", "-c"]
CMD ["exec java -jar $(ls | grep .jar -m 1)"]
