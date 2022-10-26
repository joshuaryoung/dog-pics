FROM node AS build
WORKDIR /usr/src/dog-pics
COPY ./src ./src
COPY ./public ./public
COPY ./package.json .
COPY ./.env .
RUN echo $(ls -al)
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /usr/src/dog-pics/build /etc/nginx/html
COPY ./nginx.default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]