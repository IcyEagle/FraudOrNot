#!/bin/bash

set -e
DIRNAME=`dirname "$0"`
cd ${DIRNAME}

source ./variables.sh

printf "Reset application...\n"
cd ${APP_DIR}
meteor reset
