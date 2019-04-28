#!/bin/bash

PROJECT_NAME=votermelon
PROJECT_DIR=$(cd "$(dirname -- "$f")/.."; printf %s "$PWD")
CONFIG_DIR="$PROJECT_DIR/config"
BIN_DIR="$PROJECT_DIR/bin"
APP_DIR="$PROJECT_DIR/app"
FINAL_CONFIG_FILE="/tmp/$PROJECT_NAME.settings.json"