# Yandex.XML API Wrapper

ES6 Interface for Yandex XML search

## Installation
```$ npm install yandex-xml```

## Usage
```javascript
ya.search(options)
```

## Example
```javascript
const YandexXML = require('yandex-xml');
const ya = new YandexXML('<USERNAME>', '<KEY>');
const res = await ya.search({ query: '<QUERY>' });

res.forEach((el, i, arr) => {
    console.log(`${el.url} ${el.domain} ${el.title}`);
});
```

## Options
All options in the official documentation [here](https://tech.yandex.com/xml/doc/dg/concepts/get-request-docpage/).
