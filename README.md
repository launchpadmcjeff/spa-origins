# SPA Origins - Where SPA Evolves

## Deployment Steps
Update the cicd/setup.sh file to use your settings for SPA_NAME
and region like so:

```
export SPA_NAME=spa-origins
export REGION=us-east-1
```

Then run the following:

```
cicd/setup.sh uninstall
```

The Source stage of the codepipeline will fail, because there is no
repo.  Configure one:
```
aws codecommit create-repository --region us-east-1 --repository-name spa-origins --repository-description 'Repo for spa-origins'
```

Configure us-east-1 as a git remote and push:
```
git remote add us-east-1 <cloneUrlHttp>
git push --all us-east-1
```

The codepipeline should automatically start and push the code to the web.

## Teardown Steps
run the following:

```
cicd/setup.sh uninstall
```

## TODO
Add build badge enabled to codedeploy project
https://docs.aws.amazon.com/codebuild/latest/userguide/sample-build-badges.html


##  S3 Spa Bucket Test
```
curl http://${SPA_NAME}.s3-website.${REGION}.amazonaws.com/
curl -I http://${SPA_NAME}.s3-website.${REGION}.amazonaws.com/spa.html
curl -v http://${SPA_NAME}.s3-website.${REGION}.amazonaws.com/error.html
```

## Invoke URL Test
  curl -v https://Cfn::WwwSiteUrl/Prod/version


## Api Teardown
aws cloudformation delete-stack --stack-name ${SPA_NAME}-api-version \
  --region ${REGION}

## Spa Api Integration
spa/js/data.js needs AWS integration API URL coded
ap/version.js needs Access-Control-AllowOrigin coded with spa.html CORS info

