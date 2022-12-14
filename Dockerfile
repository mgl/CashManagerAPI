FROM denoland/deno:distroless-1.29.1

WORKDIR /app

COPY deps.ts .
RUN ["deno", "cache", "deps.ts"]

ADD . .
RUN ["deno", "cache", "src/server.ts"]

USER nonroot

CMD ["run", "--allow-net", "--allow-env", "/app/src/server.ts"]
