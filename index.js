// Copyright (c) 2018 Nazar Ugrinovsky

const 
    xml2js = require('xml2js'),
    rp = require('request-promise');

class YandexXML {

    /**
     * Constructor
     * @constructor
     * @param  {String} user
     * @param  {String} key
     */
    constructor(user, key){
        this.user = user;
        this.key = key;
        this.URL = "https://yandex.com/search/xml";
    }

    /**
     * Search
     * @param  {Object} options
     * @return {Array<Object>} results
     */
    async search(options) {
        try {
            const xml = await this.request(options);
            const res = await this.beautify(xml);
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Http request to Yandex
     * @param  {String} query
     * @return {String} https answer
     */
    async request(options) {
        try {
            const params = {
                uri: this.URL,
                qs: {
                    user: this.user,
                    key: this.key,
                    ...options
                }
            };
            return await rp(params);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Getting the necessary fields
     * @param  {String} xml
     * @return {Array<Object>} beautify results
     */
    async beautify(xml) {
        try {
            const res = await this.convert(xml);
            
            if (
                !res.yandexsearch || 
                !res.yandexsearch.response || 
                !res.yandexsearch.response[0]
            ) {
                throw new Error("Invalid response of Yandex");
            }
            if (res.yandexsearch.response[0].error) {
                throw new Error(res.yandexsearch.response[0].error[0]);
            }
            if (!res.yandexsearch.response[0].results || !res.yandexsearch.response[0].results[0]) {
                throw new Error("No results");
            }

            if (
                !res.yandexsearch.response[0].results[0].grouping || 
                !res.yandexsearch.response[0].results[0].grouping[0] || 
                !res.yandexsearch.response[0].results[0].grouping[0].group
            ) {
                throw new Error("Invalid answer");
            }
    
            const groups = res.yandexsearch.response[0].results[0].grouping[0].group;
            
            const elements = [];
            
            groups.forEach((el, i, arr) => {
                const doc = el.doc[0];
                const element = {
                    title: doc.title[0]._,
                    domain: doc.domain[0],
                    url: doc.url[0],
                    headline: (doc.headline) ? doc.headline[0]._ : ''
                };
                elements.push(element);
            });

            return elements;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Convert xml string to js object
     * @param  {String} xml
     * @return {Object} converted xml to js object
     */
    convert(xml) {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, (err, res) => {
                if (!err) {
                    resolve(res);
                } else {
                    reject(err);
                }
            });
        });
    }

}

module.exports = YandexXML;
