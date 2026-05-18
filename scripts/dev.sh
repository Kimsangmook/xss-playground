#!/bin/bash

set -e

LOCAL_DOMAIN="${LOCAL_DOMAIN:-local.xss-playground.com}"
LOCAL_HTTPS_PORT="${LOCAL_HTTPS_PORT:-443}"

if [ "${LOCAL_HTTPS_PORT}" = "443" ]; then
  URL="https://${LOCAL_DOMAIN}"
else
  URL="https://${LOCAL_DOMAIN}:${LOCAL_HTTPS_PORT}"
fi

export LOCAL_DOMAIN
export LOCAL_HTTPS_PORT
export NODE_ENV="${NODE_ENV:-development}"

cleanup() {
  echo ""
  echo "> Stopping dev server..."
  exit 0
}

trap cleanup SIGINT SIGTERM

echo "> Starting XSS Playground dev server"
echo "> ${URL}"
echo ""

if [ ! -f "local.xss-playground-key.pem" ] || [ ! -f "local.xss-playground.pem" ]; then
  echo "> Local HTTPS certificate is missing."
  echo "> Run 'yarn setup' once before starting the dev server."
  exit 1
fi

if [ "${OPEN_BROWSER:-true}" = "true" ] && command -v open >/dev/null 2>&1; then
  (sleep 3 && open "${URL}") &
fi

sudo node local.server.js
