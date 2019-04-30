#!/bin/bash

set -e
DIRNAME=`dirname "$0"`
cd ${DIRNAME}

source ./variables.sh

INSTALL=0

# https://stackoverflow.com/a/14203146
OPTIND=1 # reset in case getopts has been used previously in the shell
while getopts "i" opt; do
    case "$opt" in
    i)  INSTALL=1
        ;;
    esac
done
shift $((OPTIND-1))
[ "${1:-}" = "--" ] && shift

ENV=$1
${BIN_DIR}/merge_settings.sh ${ENV}

if [ $INSTALL == 1 ]; then
    (cd $APP_DIR && meteor npm install)
fi

printf "Launching application for \e[1m$ENV\e[m environment...\n"
cd ${APP_DIR}
meteor --settings ${FINAL_CONFIG_FILE}
