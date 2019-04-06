const express = require( 'express' );
const awsServerlessExpressMiddleware = require( 'aws-serverless-express/middleware' );
const app = express()
const request = require('request');


app.use( awsServerlessExpressMiddleware.eventContext() )

app.get("/", (req, res, next) => {

  request('https://naoki-is.me/wp-json/wp/v2/posts?per_page=3', (error, response, body) => {

    let dom = '<h2>記事の一覧</h2><ul>';
    let parsed = JSON.parse(body);

    for (let i = 0; i < parsed.length; i++) {

      dom += '<li>';
      dom += '<div>' + parsed[i].date + '</div>';
      dom += '<div>' + parsed[i].title.rendered + '</div>';
      // dom += '<div>' + parsed[i].content.rendered + '</div>';
      dom += '</li>';

    }
    dom += '</ul>';
    res.send(dom);

  });
});


module.exports = app;
