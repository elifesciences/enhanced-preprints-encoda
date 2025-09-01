ARG node_version=22.19.0-alpine3.18

FROM node:${node_version} as base

RUN mkdir /opt/epp-encoda
WORKDIR /opt/epp-encoda

FROM base as build

# install packages needed to build node_modules
RUN apk add git python3 make gcc musl-dev g++

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY .yarnrc.yml .yarnrc.yml
COPY .yarn/releases .yarn/releases

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN yarn

FROM base as prod

COPY --from=build /opt/epp-encoda/node_modules node_modules
COPY --from=build /opt/epp-encoda/node_modules node_modules
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY src/ src/

EXPOSE 3000
CMD [ "yarn", "start" ]

FROM prod as dev
CMD [ "yarn", "start:dev" ]

FROM prod as tests
COPY jest.config.ts jest.config.ts
COPY jest.config.integration.ts jest.config.integration.ts
COPY .eslintrc.js .eslintrc.js
COPY integration-tests integration-tests
CMD [ "yarn", "test" ]
