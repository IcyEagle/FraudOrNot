#!/bin/bash

if ! [[ -x "$(command -v jq)" ]]; then
  printf "\e[31mError: jq is not installed. Check \e[4mhttps://stedolan.github.io/jq/download/\e[24m for details.\e[m\n" && exit 1;
  exit 1
fi