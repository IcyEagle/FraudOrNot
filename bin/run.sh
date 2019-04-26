#!/bin/bash

set -e

DIRNAME=`dirname "$0"`
cd ${DIRNAME}

ENV=$1
CONFIG_FILE=/tmp/settings.${ENV}.final.json

./merge_settings.sh ${ENV}

METEOR_DIR=../app
cd ${METEOR_DIR}

printf "Launching application for \e[1m$ENV\e[m environment...\n"
meteor --settings ${CONFIG_FILE}