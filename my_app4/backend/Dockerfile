FROM eclipse-temurin:17-jdk-focal

WORKDIR /app

COPY build.gradle settings.gradle ./
COPY gradlew ./
COPY gradle ./gradle

COPY src ./src

COPY "build/libs/*.jar" "app.jar"

CMD ["java", "-jar", "app.jar"]