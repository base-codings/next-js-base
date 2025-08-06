#!/bin/bash
#

# Auto build the docker image and generate image tag base on git repository information
# tagname:
#   if tag exists, use tag as image tag
#   if tag not exists, use commit hash + user provided version (optional) as image tag
#   add the branch name to the image tag
#   if the repo is dirty (has some uncommitted modification), add -dirty to the image tag
# Especially for the frontend image
# the script will select the env file based on the branch name when compiling the javascript
# for example, if the branch name is dev, the script will use .env-dev as the env file
PREFIX="unleashprotocol" #dockerhub username
APP_NAME="omelet-frontend" #docker image name

# check if the script should have exactly one argument
if [ $# -eq 1 ]; then
	VERSION="-$1"
fi


# check if the git repository is clean
if [[ -z $(git status --porcelain) ]]; then
	STATUS=""
else
	# dirty means there are uncommitted changes
	STATUS="-dirty"
fi

BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"
TAG_NAME=$(git tag --points-at HEAD)
# get the current commit hash
COMMIT=$(git rev-parse --short HEAD)
if [ -z $TAG_NAME ]; then
	echo "No tag found, using commit hash as tag."
	IMAGE_TAG=${COMMIT}${VERSION}-${BRANCH_NAME}${STATUS}
else
	echo "Tag found: $TAG_NAME"
	IMAGE_TAG=${TAG_NAME}-${BRANCH_NAME}${STATUS}
fi

echo "Building image for ${APP_NAME} with tag ${IMAGE_TAG}"

#Login to registry
# echo "Username: ${#GITHUB_USERNAME}"
# echo "Password: ${#GITHUB_PASSWORD}"
echo $DOCKER_TOKEN | docker login docker.io -u $DOCKER_USERNAME --password-stdin

# determine the environment file to use for the front end only
# as nextjs use .env at the build time
# for BE, Dockerfile just ignore ENV_FILE argument

if [ -z $ENV_FILE ]; then
	echo "ENV_FILE not set, determining based on branch name."
	if [[ $BRANCH_NAME == "main" ]]; then
		ENV_FILE=".env.prod"
	else
		ENV_FILE=".env.${BRANCH_NAME}"
	fi
fi

echo docker build -t ${PREFIX}/${APP_NAME}:${IMAGE_TAG} --build-arg ENV_FILE=${ENV_FILE} .
docker build -t ${PREFIX}/${APP_NAME}:${IMAGE_TAG} --build-arg ENV_FILE=${ENV_FILE} .

# wait for a key press
# echo "Press any key to push the image to the registry. Auto pushing in 5 seconds."
# read -t 5 -n 1 || true # ignore fail

echo docker push ${PREFIX}/${APP_NAME}:${IMAGE_TAG}
docker push ${PREFIX}/${APP_NAME}:${IMAGE_TAG}

# pass the image tag to the env for follow up in next step
echo IMAGE_FULL_PATH=${PREFIX}/${APP_NAME}:${IMAGE_TAG} >>$GITHUB_ENV
echo BRANCH_NAME=${BRANCH_NAME} >>$GITHUB_ENV
echo IMAGE_TAG=${IMAGE_TAG} >>$GITHUB_ENV