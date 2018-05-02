# yandex-xml
==================

ES6 Interface for Yandex XML search

## Installation
```$ npm install fredure/yandex-xml```

## Usage
```javascript
ya.search(options)
```

## Example
```javascript
const YandexXML = require('yandex-xml');
const ya = new YandexXML('<USERNAME>', '<KEY>');
const res = await yandex.search({ query: '<QUERY>' });

res.forEach((el, i, arr) => {
    console.log(`${el.url} ${el.domain} ${el.title}`);
});
```

## Options
All options in the official documentationd [here](http://api.yandex.com/xml/doc/dg/concepts/post-request.xml).