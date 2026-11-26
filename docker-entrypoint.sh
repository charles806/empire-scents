#!/bin/bash
# Entrypoint script for Hostless.cloud deployment
# Configures Apache to listen on the PORT environment variable

set -e

# Default port for Hostless.cloud
export PORT=${PORT:-8080}

# Update Apache ports.conf to use the PORT environment variable
sed -i "s/^Listen 80$/Listen ${PORT}/" /etc/apache2/ports.conf

# Update the default virtual host to use the PORT
sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/" /etc/apache2/sites-available/000-default.conf

# Also update any other virtual host files if they exist
for f in /etc/apache2/sites-available/*.conf; do
    sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/" "$f"
done

echo "Starting Apache on port ${PORT}..."

# Execute the original Apache foreground command
exec apache2-foreground