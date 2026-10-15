pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timestamps()
    timeout(time: 20, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build image') {
      steps {
        sh 'docker build -t aniverse/frontend:latest .'
      }
    }
  }
}
