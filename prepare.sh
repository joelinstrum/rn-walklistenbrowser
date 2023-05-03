#!/bin/bash

if [ "$1" != "--version" ]; then
  echo "Error: Missing --version parameter."
  echo "Usage: $0 --version <version>"
  exit 1
fi

if [ -z "$2" ]; then
  echo "Error: Version parameter value is missing."
  echo "Usage: $0 --version <version>"
  exit 1
fi

VERSION=$2
jq '.expo.version = "'"$VERSION"'"' ./app.json > ./app.json.tmp && mv ./app.json.tmp ./app.json
jq '.version = "'"$VERSION"'"' ./package.json > ./package.json.tmp && mv ./package.json.tmp ./package.json
sed -i '' "s/versionName \".*\"/versionName \"$VERSION\"/" ./android/app/build.gradle

echo "Running script with version: $VERSION"
find ./android/app/src -name "splash.png" -exec cp "./assets/splash.png" {} \;
find ./android/app/src -name "splashscreen_image.png" -exec cp "./assets/splash.png" "{}" \; -execdir mv "{}" splashscreen_image.png \;
