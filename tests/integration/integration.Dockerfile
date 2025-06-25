FROM nest_js_server_base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g jest

COPY --chown=default . .

USER default

RUN ["chmod", "+x", "./wait-for.sh"]

ENTRYPOINT [ "/usr/src/app/wait-for.sh", "http://nest_server:8080/healthz" ]
