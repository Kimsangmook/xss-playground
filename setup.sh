#!/bin/bash

set -e

HOSTS_FILE="/etc/hosts"
LOCAL_DOMAIN="local.xss-playground.com"
CERT_KEY="local.xss-playground-key.pem"
CERT_FILE="local.xss-playground.pem"

echo "> Setting up XSS Playground local development"
echo ""

echo "> Checking ${LOCAL_DOMAIN} in ${HOSTS_FILE}"
if grep -q "127\.0\.0\.1.*${LOCAL_DOMAIN}" "${HOSTS_FILE}"; then
  echo "> ${LOCAL_DOMAIN} is already registered"
else
  echo "> Adding ${LOCAL_DOMAIN} to ${HOSTS_FILE}"
  sudo -k
  echo -e "127.0.0.1\t${LOCAL_DOMAIN}" | sudo tee -a "${HOSTS_FILE}" >/dev/null
  echo "> ${LOCAL_DOMAIN} added"
fi

echo ""
echo "> Checking mkcert"
if ! command -v mkcert >/dev/null 2>&1; then
  if command -v brew >/dev/null 2>&1; then
    brew install mkcert
    brew install nss
  else
    echo "> Homebrew is not installed. Install mkcert manually:"
    echo "> https://github.com/FiloSottile/mkcert#installation"
    exit 1
  fi
fi

echo "> Installing local CA"
mkcert -install

echo "> Generating local HTTPS certificate"
mkcert -key-file "${CERT_KEY}" -cert-file "${CERT_FILE}" "${LOCAL_DOMAIN}"

echo ""
echo "> Installing recommended editor extensions"
node scripts/setup-editor-extensions.mjs

echo ""
echo "> Setup complete"
echo "> Run: yarn dev"
echo "> URL: https://${LOCAL_DOMAIN}"
