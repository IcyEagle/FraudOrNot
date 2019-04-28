#!/bin/bash

set -e
DIRNAME=`dirname "$0"`
cd ${DIRNAME}

source ./variables.sh

ENV=$1
${BIN_DIR}/merge_settings.sh ${ENV}

printf "Launching application for \e[1m$ENV\e[m environment...\n"
cd ${APP_DIR}
meteor --settings ${FINAL_CONFIG_FILE}