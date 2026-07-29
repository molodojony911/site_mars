# Статический лендинг ОПОРА (design/index.html, css, js)
FROM nginx:1.27-alpine

# Конфиг nginx с healthcheck-эндпоинтом
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Статика проекта
COPY design/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/healthz || exit 1
