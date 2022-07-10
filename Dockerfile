
FROM node:16-alpine as base
# install nodejs, git, and yarn
RUN apk add git 

# working directory
WORKDIR /app
COPY package.json yarn.lock ./
# 
# build and run tests
# 
FROM base as build
# install all dependencies, including devDependencies
RUN yarn --frozen-lockfile
# copy app sources
COPY . .
# build for production
RUN yarn build:ts 
# install production dependencies
RUN yarn --production --frozen-lockfile
# 
# release stage
# 
FROM base as release
# copy production dependencies
COPY --from=build /app/node_modules ./node_modules
# copy _next build folder, next.config.js and package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/data ./data

# copy .env and package.json
# we don't need app source files
COPY --from=build /app/package.json ./
# expose ports and define start command
EXPOSE 3000
CMD yarn start