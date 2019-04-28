#!/bin/bash

set -e
DIRNAME=`dirname "$0"`
cd ${DIRNAME}

source ./variables.sh

./ensure_jq.sh
./ensure_env_arg.sh $1

ENV=$1
SHARED_CONFIG=${CONFIG_DIR}/settings.${ENV}.json
SECRET_CONFIG=${CONFIG_DIR}/settings.${ENV}.secret.json

jq -s add ${SHARED_CONFIG} ${SECRET_CONFIG} > ${FINAL_CONFIG_FILE}

printf "\e[32mConfiguration has been merged and located in \e[4m$FINAL_CONFIG_FILE\e[24m\e[m\n"