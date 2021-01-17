#FROM openjdk:8-jre-alpine
#ENV APP_FILE demo1-0.0.1-SNAPSHOT.jar
#ENV APP_HOME /usr/apps
#EXPOSE 8181
#COPY target/$APP_FILE $APP_HOME/
#WORKDIR $APP_HOME
#ENTRYPOINT ["sh", "-c"]
#CMD ["exec java -jar $APP_FILE"]

FROM openjdk:8u212-jdk-alpine
#
#LABEL maintainer="khamphai@ldblao.com"
#ENV APP_FILE demo1-0.0.1-SNAPSHOT.jar
#VOLUME /tmp
#
#EXPOSE 8181
#ARG JAR_FILE=target/$APP_FILE
#ADD ${JAR_FILE} demo-service-1.jar
#
#ENTRYPOINT ["java", "-Dspring.application.name=demo 1", "-jar", "demo-service-1.jar"]


#FROM openjdk:11-jdk

# Set timezone
# Always have Bangkok timezone file beside Dockerfile
#RUN echo "Asia/Bangkok" > /etc/timezone && date

ENV APP_HOME /usr/apps
WORKDIR $APP_HOME

ENV PORT 8080
EXPOSE $PORT
COPY target/*.jar ./

ENTRYPOINT ["sh", "-c"]
CMD ["exec java -jar $(ls | grep .jar -m 1)"]
