pipeline {
  agent any
  stages {
    stage('Hello') {
      when {
        branch 'master'
      }
      steps {
          sh 'echo "Hello"'
          files = s3FindFiles(bucket:'www.kubernetic.com')
          echo "Files: ${files}"
      }
    }
  }
}
