# Kubernetic Landing page

This is the website for https://kubernetic.com/

## CI/CD

CI/CD is enabled for this repository that does the following:

* For every push on the "master" branch...
  * Upload Content to AWS S3 Bucket `www.kubernetic.com`
  * Invalidate AWS CloudFront distribution with ID: `EQ9PP9HGYEXB6`


# Deploy

```sh
gcloud compute backend-buckets create kubernetic \
    --enable-cdn --gcs-bucket-name=www.kubernetic.com
gsutil web set -m index.html gs://www.kubernetic.com
```

