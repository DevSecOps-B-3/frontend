pipeline {
  agent any
  stages {
    stage('Clone Repository') {
      steps {
        git branch: 'main', url: 'https://github.com/DevSecOps-B-3/frontend'
      }
    }
    stage('Dependency Installation') {
      steps {
        sh 'npm install --include=dev'
      }
    }
    stage('Debug Husky Installation') {
      steps {
        sh 'ls -al node_modules/.bin'
      }
    }
    stage('Fix Husky Permissions') {
      steps {
        sh 'chmod +x .husky/*'
      }
    }
    stage('Reinitialize Husky') {
      steps {
        sh 'npm run prepare'
      }
    }
    stage('Verify Husky and Git') {
      steps {
        sh 'ls -al .husky'
        sh 'git status'
        sh 'cat .git/config'
      }
    }
    stage('Run Unit Tests') {
      steps {
        sh 'npm test'
      }
    }
    stage('SonarQube Analysis') {
      steps {
          script {
              def scannerHome = tool 'sonarscanner';
              withSonarQubeEnv('sonarserver') {
                  sh "${scannerHome}/bin/sonar-scanner"
              }
          }
      }
    }

    stage('Quality Gate') {
      steps {
        script {
          def qualityGate = waitForQualityGate()
            if (qualityGate.status != 'OK') {
              error "Pipeline failed due to SonarQube quality gate status: ${qualityGate.status}"
            }
        }
      }
    }
    stage ("Clean Up Docker Container and Image"){
      steps{
        script{
          sh """
            if [ \$(docker ps -q -f name=ambamovie-fe) ]; then
              docker stop ambamovie-fe
            fi
            """

            sh """
            if [ \$(docker ps -a -q -f name=ambamovie-fe) ]; then
              docker rm ambamovie-fe
            fi
            """

            sh """
            if [ \$(docker images -q ambamovie-img) ]; then
              docker rmi ambamovie-img
            fi
            """
        }
      }
    }
    stage("Build Image"){
      steps{
        script{
          sh '''
          docker build --build-arg VITE_APP_BASE_URL=${VITE_APP_BASE_URL} -t ambamovie-img .
          '''
        }
      }
    }
    stage('Deploy to Production') {
      steps {
        script{
          sh 'docker run -p 80:80 --restart=unless-stopped -d --name ambamovie-fe ambamovie-img:latest' 
        }
      }
    }
  }
}