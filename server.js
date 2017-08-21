const express = require("express");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const Web3 = require("web3");
const YellowPage = require("eth-yellowpage").EthYellowPage;
const aync = require("async");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var yellowPage = new YellowPage(web3);

current_contracts = {};

var count = yellowPage.TotalCount();
console.log("started to load " + count + " contracts");
yellowPage.StartCache(1);


app.prepare()
    .then(() => {
        const server = express();

        server.listen(4000, (err) => {
            if (err) throw err;
            fs.writeFile("PID", process.pid.toString() + "\n");
            console.log(">Ready on http://localhost:4000");
        });

        /**
         * allow cros on API
         */
        server.use("/api", function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With');
            next();
        });

        server.get("/api/contracts", function (req, res) {
            res.json(yellowPage.GetCache() || {});
        });
    });