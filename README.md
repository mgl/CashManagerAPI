# CashManagerAPI

This is the API Backend of the Cash Manager project.

## Technical Docs

[Documentation](/docs)

## Tech Stack

[Deno](https://deno.land) + [Oak](https://oakserver.github.io/oak) +
[MongoDB](https://www.mongodb.com)

## Get started

### Using [Docker Dev](https://docs.docker.com/desktop/dev-environments)

Clone and open the Deno container:

<img src="docs/clone.png" alt="drawing" width="400"/>
<img src="docs/open.png" alt="drawing" width="400"/>

Run the project:

> deno run --allow-net --allow-env --watch src/server.ts

A Mongo Express interface is available at
[http://localhost:8081](http://localhost:8081/)

### Error when using Git

Sometimes there is an error with Git regarding the repository ownership:

> fatal: detected dubious ownership in repository at
> '/com.docker.devenvironments.code'

To fix it:

> git config --global --add safe.directory /com.docker.devenvironments.code
