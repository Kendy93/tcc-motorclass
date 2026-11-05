# Imagem única: o Laravel serve a API e o build do React (public/build).

# ---------- Arquivos do Git LFS ----------
# Se o código chegar com ponteiros do LFS no lugar dos .glb, baixa os arquivos
# reais pela API do GitHub. Se o repo for privado, defina o build arg GITHUB_TOKEN.
FROM alpine:3.20 AS assets
RUN apk add --no-cache curl jq
ARG GITHUB_REPO=Kendy93/tcc-motorclass
ARG GITHUB_TOKEN=""
COPY backend/public /assets/public
COPY docker/fetch-lfs.sh /usr/local/bin/fetch-lfs.sh
RUN sh /usr/local/bin/fetch-lfs.sh /assets/public

# ---------- Frontend ----------
FROM node:22-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
WORKDIR /app/frontend/motorclass
COPY frontend/motorclass/package.json frontend/motorclass/package-lock.json ./
RUN npm ci
COPY frontend/motorclass ./
# vite.config.ts gera o build em ../../backend/public/build
RUN mkdir -p /app/backend/public && npm run build

# ---------- Dependências PHP ----------
FROM composer:2 AS vendor
WORKDIR /app
COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --ignore-platform-reqs

# ---------- Runtime ----------
FROM php:8.4-apache

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpng-dev libjpeg62-turbo-dev libfreetype6-dev libzip-dev libsqlite3-dev sqlite3 \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" gd zip pdo_sqlite opcache \
    && rm -rf /var/lib/apt/lists/*

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && sed -ri 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf \
    && a2enmod rewrite headers \
    && mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY backend/ ./
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /assets/public ./public
COPY --from=frontend /app/backend/public/build ./public/build

RUN composer dump-autoload --optimize --no-dev \
    && php artisan package:discover --ansi \
    && chown -R www-data:www-data storage bootstrap/cache

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

VOLUME /data
EXPOSE 80
ENTRYPOINT ["entrypoint.sh"]
CMD ["apache2-foreground"]
