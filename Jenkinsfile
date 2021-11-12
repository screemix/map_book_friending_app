pipeline {
  agent any
  stages {
    stage('Docker Compose') {
      agent any
      steps {
        sh "docker-compose build"
        sh "docker-compose up -d"
      }
    }
  }
}
