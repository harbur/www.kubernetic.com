# Kubernetic Landing page

This is the website for https://kubernetic.com/

## CI/CD

CI/CD is enabled for this repository that does the following:

* For every push on the "master" branch...
* Content is uploaded to AWS S3 Bucket `www.kubernetic.com`
* AWS CloudFront is invalidated for all files
