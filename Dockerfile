FROM denoland/deno:alpine-1.28.3

WORKDIR /app

COPY deps.ts .
RUN deno cache deps.ts

ADD . .
RUN deno cache src/server.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "src/server.ts"]
