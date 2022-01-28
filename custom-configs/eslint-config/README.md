# @cloud-dragon/eslint-config

> Lyunki's eslint configuration

## Installation

```
pnpm add -D @cloud-dragon/eslint-config
```

## Usage

Create the following `.eslintrc.js` file:

### common

```js
module.exports = {
  extends: ['@cloud-dragon'],
}
```

### nestjs

```js
module.exports = {
  extends: ['@cloud-dragon/eslint-config/nest'],
}
```

## License

MIT
