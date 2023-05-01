FROM caddy:2.6.4 as caddy

FROM scratch

COPY --from=caddy /usr/bin/caddy /usr/bin/caddy
RUN ["/usr/bin/caddy", "version"]

WORKDIR /srv
COPY build /srv
COPY Caddyfile /etc/Caddyfile

CMD ["/usr/bin/caddy", "run", "--config", "/etc/Caddyfile", "--adapter", "caddyfile"]
