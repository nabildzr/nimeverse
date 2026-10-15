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
      agent {
        docker {
          image 'node:22-alpine'
          reuseNode true
          args '-e HOME=/tmp -e CI=true'
        }
      }
      steps {
        sh '''
          npm install
          npm test
        '''
      }
    }

    stage('Build image') {
      steps {
        sh 'docker build -t aniverse/frontend:latest .'
      }
    }
  }
}
