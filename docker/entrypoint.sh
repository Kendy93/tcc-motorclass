#!/bin/sh
set -e

cd /var/www/html

: "${DB_DATABASE:=/data/database.sqlite}"
export DB_DATABASE

mkdir -p "$(dirname "$DB_DATABASE")"
novo_banco=0
if [ ! -f "$DB_DATABASE" ]; then
    touch "$DB_DATABASE"
    novo_banco=1
fi
php artisan migrate --force

# Popula módulos e questionários apenas na criação do banco
if [ "$novo_banco" = "1" ]; then
    php artisan db:seed --class=ModulosSeeder --force
    php artisan db:seed --force
fi

php artisan config:cache
php artisan route:cache
php artisan view:cache

chown -R www-data:www-data "$(dirname "$DB_DATABASE")" storage bootstrap/cache

exec "$@"
