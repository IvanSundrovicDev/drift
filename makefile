SHELL=/bin/bash

DOCKER_BUILD_CONTEXT=.
DOCKER_FILE_PATH=Dockerfile

THIS_FILE := $(lastword $(MAKEFILE_LIST))

.PHONY: docker-build docker-run

docker-build:
		DOCKER_BUILDKIT=1 docker build -f "Dockerfile" -t drift_frontend:local "."

docker-run:
		docker run --rm -it -p=80:80/tcp drift_frontend:local
