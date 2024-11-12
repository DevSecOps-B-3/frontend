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