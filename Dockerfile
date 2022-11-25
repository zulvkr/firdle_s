FROM node:18.12.0 as builder
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
RUN npm run build


FROM node:18.12.0
WORKDIR /usr/src/app
COPY ["prisma", "package.json", "package-lock.json*", "./"]
RUN npm ci --omit=dev
COPY --from=builder /usr/src/app/dist ./dist
RUN chown -R node /usr/src/app
USER node
EXPOSE $FASTIFY_PORT
CMD ["npm", "run", "start"]
