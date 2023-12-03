# Doodles

Hey, this is the source code of my personal website [Binliu's Doodles](https://zhangbinliu.me).

It is built using [Docusaurus](https://docusaurus.io/)

### How to run

```bash
yarn install
yarn start
yarn build

# To run for a specific locale
npm run start -- --locale zh

# To write translations for a specific locale
npm run write-translations -- --locale zh

```

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```