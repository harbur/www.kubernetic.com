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
        s3Upload(file:'docs', bucket:'www.kubernetic.com')
        cfInvalidate(distribution:'EQ9PP9HGYEXB6', paths:['/*'], waitForCompletion: true)
      }
    }
  }
}