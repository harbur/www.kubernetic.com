pipeline {
  agent any
  options {
    withAWS(credentials:'aws')
  }
  stages {
    stage('Hello') {
      when {
        branch 'master'
      }
      steps {
        script {
          sh 'echo "Hello"'
          files = s3FindFiles(bucket:'www.kubernetic.com')
          echo "Files: ${files}"
        }
      }
    }
  }
}
