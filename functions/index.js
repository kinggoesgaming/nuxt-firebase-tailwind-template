const functions = require('firebase-functions');
const express = require('express');

const { Nuxt } = require('nuxt-start');

const websiteNuxtConfig = require('./website.nuxt.config');

const websiteConfig = {
    ...websiteNuxtConfig,
    debug: false,
    dev: false,
    buildDir: './.website'
};

const websiteInstance = new Nuxt(websiteConfig);

function handleWebsiteRequest(req, res) {
    res.set('cache-control', 'public, max-age=600, s-maxage=1200')

    websiteInstance.renderRoute(req.path, { req, res }).then(result => {
        res.send(result.html)
    }).catch(err => {
        res.status(err.statusCode).send(err)
    })
}

const websiteApp = express();

websiteApp.get('*', handleWebsiteRequest);

exports.website = functions.https.onRequest(websiteApp)
