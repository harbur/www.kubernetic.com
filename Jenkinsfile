#!groovy
@Library("kubernetic-pipeline") _
  pipeline {
    agent any
    options {
      withAWS(region: params.region, credentials:"aws")
    }
    stages {
      stage("Push to CDN") {
        steps {
	  //sh("gsutil cp -r docs/* gs://www.kubernetic.com")
         step([$class: "ClassicUploadStep", credentialsId: "woven-computing-234012",  bucket: "gs://www.kubernetic.com", pattern: "docs/*"])
        }
      }
    }
  }
