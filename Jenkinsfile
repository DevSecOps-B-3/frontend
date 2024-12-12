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
        sh 'npm install'
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
            if [ \$(docker ps -q -f name=ambamovie-fe-vulner) ]; then
              docker stop ambamovie-fe-vulner
            fi
            """

            sh """
            if [ \$(docker ps -a -q -f name=ambamovie-fe-vulner) ]; then
              docker rm ambamovie-fe-vulner
            fi
            """

            sh """
            if [ \$(docker images -q ambamovie-img-vulner) ]; then
              docker rmi ambamovie-img-vulner
            fi
            """
        }
      }
    }
    stage("Build Image"){
      steps{
        script{
          sh '''
          docker build --build-arg VITE_APP_BASE_URL_VULNER=${VITE_APP_BASE_URL_VULNER} -t ambamovie-img-vulner .
          '''
        }
      }
    }
    stage('Deploy to Production') {
      steps {
        script{
          sh 'docker run -p 880:80 --restart=unless-stopped -d --name ambamovie-fe-vulner ambamovie-img-vulner:latest' 
        }
      }
    }
  }
}