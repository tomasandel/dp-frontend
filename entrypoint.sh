#!/bin/sh
# Inject API_URL into index.html at runtime
sed -i "s|</head>|<script>window.__API_URL__=\"${API_URL:-}\";</script></head>|" /app/index.html
exec serve -s /app -l 3001
