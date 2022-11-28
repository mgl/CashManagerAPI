FROM denoland/deno

EXPOSE 80

WORKDIR /app

ADD . /app

RUN deno cache src/server.ts

CMD ["run", "--allow-net", "--allow-env", "src/server.ts"]
