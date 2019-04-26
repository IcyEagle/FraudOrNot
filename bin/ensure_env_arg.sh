#!/bin/bash

ENVS=("dev prod")

if [[ -z $1 ]] ; then
  printf "\e[31mYou must provide environment as an argument! Select one of: [${ENVS}]\e[m\n" && exit 1;
fi

if [[ ! " ${ENVS} " =~ " $1 " ]]; then
  printf "\e[31mYou must provide one of the next environment: [${ENVS}]\e[m\n" && exit 1;
fi

printf "\e[96mYour environment: \e[1m$1\e[21m\e[m\n"