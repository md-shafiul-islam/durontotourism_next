pipeline {
  agent {
    node {
      label 'node'
    }

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
