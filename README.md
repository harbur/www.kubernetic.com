# Kubernetic Landing page

This is the website for https://kubernetic.com/

## CI/CD

CI/CD is enabled for this repository that does the following:

* For every push on the "master" branch...
  * Upload Content to AWS S3 Bucket `www.kubernetic.com`
  * Invalidate AWS CloudFront distribution with ID: `EQ9PP9HGYEXB6`
