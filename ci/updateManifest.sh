#!/bin/bash
set -xe
# This script is used to update the deployment manifest, and trigger a deployment in the k8s cluster

# this key will be used to look up the image in the images.jsonnet file. Need to change for each service
PROJECT_NAME="omelet"
IMAGE_KEY="#FRONTEND" # key to replace in the kustomization.yaml file

# apk add bash && apk add git && apk add --update curl && rm -rf /var/cache/apk/*
#
# # clone repo manifest
git clone "https://${PERSONAL_ACCESS_TOKEN}@${REPO_MANIFEST_URL}"
cd ./${REPO_MANIFEST_NAME}
git checkout ${REPO_MANIFEST_BRANCH} && git pull

ESCAPED_VALUE=$(echo "$IMAGE_FULL_PATH" | sed 's/\//\\\//g')

if [[ ${BRANCH_NAME} == "main" ]]; then
	ENV="production"
else
	ENV="${BRANCH_NAME}"
fi
FILE_PATH="overlays/$PROJECT_NAME/$ENV/kustomization.yaml"

sed -i "/$IMAGE_KEY/{n;s/.*/    newTag: $IMAGE_TAG/;}" "$FILE_PATH"

# cat $FILE_PATH

git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "devops@omelet.finance"
git add $FILE_PATH
git commit -m "Update image to ${IMAGE_FULL_PATH}"
git push
