# SPA Origins


## Setup
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

## Test
```
curl http://${SPA_NAME}.s3-website.${REGION}.amazonaws.com/
curl -I http://${SPA_NAME}.s3-website.${REGION}.amazonaws.com/spa.html
curl -v http://${SPA_NAME}.s3-website.${REGION}.amazonaws.com/error.html
```

## Teardown
```
aws s3 rm s3://${SPA_NAME} --recursive --region ${REGION}

aws cloudformation delete-stack --stack-name ${SPA_NAME} --region ${REGION}
```
