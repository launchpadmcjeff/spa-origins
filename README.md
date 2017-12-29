# SPA Origins


## S3 Spa Bucket Setup
```
export SPA_NAME=spa-origins

export REGION=us-west-2

aws cloudformation create-stack --region ${REGION} \
 --stack-name ${SPA_NAME} \
 --template-body file://cicd/prototype.yaml \
 --parameters ParameterKey=SpaName,ParameterValue=${SPA_NAME}

aws s3 sync --acl public-read \
 --exclude '*' \
 --include 'css/*' \
 --include 'js/*' \
 --include '*.html' \
 --include '*.png' \
 spa s3://${SPA_NAME} --delete
```

##  S3 Spa Bucket Test
```
curl http://${SPA_NAME}.s3-website.${REGION}.amazonaws.com/
curl -I http://${SPA_NAME}.s3-website.${REGION}.amazonaws.com/spa.html
curl -v http://${SPA_NAME}.s3-website.${REGION}.amazonaws.com/error.html
```

##  S3 Spa Bucket Teardown
```
aws s3 rm s3://${SPA_NAME} --recursive --region ${REGION}

aws cloudformation delete-stack --stack-name ${SPA_NAME} --region ${REGION}
```

## Api Setup
aws cloudformation package --template-file version.yaml \
  --s3-bucket robowebi-nexus-${REGION} \
  --output-template-file version-packaged.yaml

aws cloudformation deploy --template-file version-packaged.yaml \
  --stack-name ${SPA_NAME}-api-version \
  --capabilities CAPABILITY_IAM


## Invoke URL Test
  curl -v https://v3v0rc8l1a.execute-api.us-west-2.amazonaws.com/Prod/version


## Api Teardown
aws cloudformation delete-stack --stack-name ${SPA_NAME}-api-version \
  --region ${REGION}
