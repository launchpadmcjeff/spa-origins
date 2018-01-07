#!/bin/sh

export SPA_NAME=spa-origins
export REGION=us-east-1
export SPA_DOMAIN_NAME=robowe.be
export GIT_BRANCH=cloudfront-integration

function getBooleanHss {
	echo "getBooleanHss [1/0y/n/Y/N]"
	echo $1
	read junk
	if [ $junk = "y" ]
	then
		return 0
	else
		return 1
	fi
}


function getBooleanHssOrDie {
	while :
	do
		echo "getBooleanHss [1/0y/n/Y/N]"
		echo $1
		read junk
		if [ $junk = "y" ]
		then
			break	
		fi
	done

}

function install {
    aws cloudformation create-stack --stack-name ${SPA_NAME} \
        --template-body file://cicd/cicd-template.yaml --region ${REGION} \
        --parameters ParameterKey=SpaName,ParameterValue=${SPA_NAME} \
        ParameterKey=SpaDomainName,ParameterValue=${SPA_DOMAIN_NAME} \
        ParameterKey=SiteUploadBucketName,ParameterValue=${SPA_NAME}-upload-${REGION} \
        ParameterKey=PipelineBucketName,ParameterValue=${SPA_NAME}-pipeline-${REGION} \
        ParameterKey=CodeCommitRepo,ParameterValue=${SPA_NAME} \
        ParameterKey=CodeCommitBranch,ParameterValue=${GIT_BRANCH} \
        --capabilities CAPABILITY_IAM
}


function uninstall {
    aws s3 rm s3://${SPA_NAME}.${SPA_DOMAIN_NAME} --recursive --region ${REGION}
    aws s3 rm s3://${SPA_NAME}-upload-${REGION} --recursive --region ${REGION}
    aws s3 rm s3://${SPA_NAME}-pipeline-${REGION} --recursive --region ${REGION}

    aws s3 rb s3://${SPA_NAME}.${SPA_DOMAIN_NAME}
    aws s3 rb s3://${SPA_NAME}-upload-${REGION}
    aws s3 rb s3://${SPA_NAME}-pipeline-${REGION}

    aws cloudformation delete-stack --stack-name ${SPA_NAME} --region ${REGION}
}



if [ "$1" = "install" ]
then
	echo "installing spa to ${REGION} as ${SPA_NAME}"
	install
fi

if [ "$1" = "uninstall" ]
then
	echo "uninstalling spa ${SPA_NAME} from ${REGION}"
	uninstall
fi

echo "done $1"
