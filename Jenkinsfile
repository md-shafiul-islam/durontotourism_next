pipeline {
  agent any
  
  tools {
    nodejs 'node-v14.18.0'
  }
  
  stages {
    stage('Initializing') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm next build'
      }
    }

    stage('Start Or Deploye') {
      steps {
        sh 'npm next start'
      }
    }

  }
}
