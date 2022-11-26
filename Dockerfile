FROM node:16 as builder
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /usr/src/app
COPY ["prisma", "package.json", "package-lock.json*", "./"]
RUN npm ci --omit=dev
COPY --from=builder --chown=node /usr/src/app/dist ./dist
USER node
EXPOSE $FASTIFY_PORT
CMD ["npm", "run", "start"]
