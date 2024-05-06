From php:8.2-fpm-alpine
RUN addgroup dwc && adduser -S -G dwc dwc

RUN apk add libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

RUN docker-php-ext-configure pcntl --enable-pcntl \
  && docker-php-ext-install \
    pcntl
  
RUN apk update && \
    apk add zip libzip-dev &&\
    docker-php-ext-install zip

RUN apk add --no-cache \
      freetype \
      libjpeg-turbo \
      libpng \
      freetype-dev \
      libjpeg-turbo-dev \
      libpng-dev \
    && docker-php-ext-configure gd \
      --with-freetype=/usr/include/ \
      --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd \
    && apk del --no-cache \
      freetype-dev \
      libjpeg-turbo-dev \
      libpng-dev \
    && rm -rf /tmp/*
    
USER dwc

WORKDIR /app


COPY --from=composer /usr/bin/composer /usr/bin

COPY --chown=dwc:dwc composer.json composer.lock .

RUN composer install --no-scripts --ignore-platform-reqs


EXPOSE 8000

COPY --chown=dwc:dwc . /app

RUN composer update --ignore-platform-req=ext-zip
RUN composer dump-autoload

CMD ["php","artisan","serve","--host","0.0.0.0","--port","8000"]
