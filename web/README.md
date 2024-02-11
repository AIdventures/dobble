# Dobble: Web app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Each of the steps and parts of the application are detailed below.

## Index

1. [Getting Started](#getting-started)
2. [Access to the dataset](#access-to-the-dataset)
3. [Troubleshooting](#troubleshooting)
4. [Docker](#docker)

## Getting Started

First of all, we need to install the dependencies. We are going to use `pnpm` as our package manager.

```bash
pnpm install
```

You can start the development server with the following command:

```bash
pnpm run dev
```

To build the app for production, run:

```bash
pnpm install
pnpm run build
# now with pm2 start at port 8989
pm2 start pnpm -- start
# Not working => pm2 start ecosystem.config.js
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.


## Access to the dataset

We don't want to copy all our dataset into the web app. We are going to use a symlink to the dataset folder.

```bash
cd web/public
ln -s $PRADO_PATH prado

mkdir -p /tmp/dobble/
chmod 777 /tmp/dobble/  # Adjust permissions as needed
```

So inside `web/public/prado` we will have an `images` folder with all the images.

Se ha subido el dataset a [Kaggle](https://www.kaggle.com/datasets/maparla/prado-museum-pictures)
donde podemos acceder de forma libre y descargarlo.

## Troubleshooting

### Error 413: Request Entity too large - Nginx

Because the user uploads somewhat heavy photos,
we need to edit the nginx configuration file

```
sudo nano /etc/nginx/nginx.conf
```

Within the http { } section we will add the directive that will fix the error:

```
client_max_body_size 100M;
```

## Docker

To launch the application we can use Docker in the following way:

```bash
docker compose build
docker compose up -d

docker compose ps
docker compose down
```