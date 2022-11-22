FROM denoland/deno

EXPOSE 80

WORKDIR /app

ADD . /app

RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "main.ts"]
