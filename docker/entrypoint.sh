#!/bin/sh
set -e

cd /var/www/html

: "${DB_DATABASE:=/data/database.sqlite}"
export DB_DATABASE

mkdir -p "$(dirname "$DB_DATABASE")"
touch "$DB_DATABASE"

php artisan migrate --force

# Módulos usam create(): só popula se a tabela estiver vazia
if [ "$(sqlite3 "$DB_DATABASE" 'SELECT COUNT(*) FROM modulos;')" = "0" ]; then
    php artisan db:seed --class=ModulosSeeder --force
fi

# Questionários usam updateOrCreate(): roda sempre, mantendo as questões em dia.
# O DatabaseSeeder não roda em produção (cria usuário de teste com Faker, que é dev).
php artisan db:seed --class=QuestionarioSeeder --force

php artisan config:cache
php artisan route:cache
php artisan view:cache

chown -R www-data:www-data "$(dirname "$DB_DATABASE")" storage bootstrap/cache

exec "$@"
