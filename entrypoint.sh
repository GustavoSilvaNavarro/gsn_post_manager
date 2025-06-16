#!/bin/sh

until nc -zv $DB_HOST $DB_PORT
do
  >&2 echo "DB is unavailable at $DB_HOST and PORT: $DB_PORT - sleeping 🛌"
  sleep 5
done

>&2 echo "📻 DB is up - executing command"

>&2 echo "🏃 Running migration..."
sh -c 'npm run migrate:up'

exec npm start
