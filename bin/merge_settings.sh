#!/bin/bash

set -e

DIRNAME=`dirname "$0"`
cd ${DIRNAME}

./ensure_jq.sh
./ensure_env_arg.sh $1

ENV=$1
CONFIG_DIR=${DIRNAME}/../config
SHARED_CONFIG=${CONFIG_DIR}/settings.${ENV}.json
SECRET_CONFIG=${CONFIG_DIR}/settings.${ENV}.secret.json
OUT_FILE=/tmp/settings.${ENV}.final.json

jq -s add ${SHARED_CONFIG} ${SECRET_CONFIG} > ${OUT_FILE}

printf "\e[32mConfiguration has been merged and located in \e[4m$OUT_FILE\e[24m\e[m\n"