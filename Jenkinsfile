pipeline {
  agent any
  options {
    withAWS(region: 'eu-west-1', credentials:'aws')
  }
  stages {
    stage('Hello') {
      when {
        branch 'master'
      }
      steps {
        script {
          s3Upload(file:'docs', bucket:'www.kubernetic.com', path:'/')
          sh 'echo "Hello"'
          files = s3FindFiles(bucket:'www.kubernetic.com')
          echo "Files: ${files}"
        }
      }
    }
  }
}
