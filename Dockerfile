FROM lukechannings/deno:latest

EXPOSE 8080

RUN apt-get update && apt-get install git -y

USER deno

WORKDIR /app

COPY deps.ts .
RUN deno cache deps.ts

ADD . .

RUN deno cache src/server.ts

CMD ["run", "--allow-net", "--watch", "src/server.ts"]
