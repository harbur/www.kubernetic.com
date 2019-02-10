pipeline {
  agent any
  stages {
    stage('Hello') {
      when {
        branch 'master'
      }
      steps {
          sh 'echo "Hello"'
      }
    }
  }
}
