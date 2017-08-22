const express = require("express");
//const next = require("next");
const fs = require("fs");
//const dev = process.env.NODE_ENV !== 'production';
//const app = next({dev});
//const handle = app.getRequestHandler();
const Web3 = require("web3");
const YellowPage = require("eth-yellowpage").EthYellowPage;
//const aync = require("async");
const path = require("path");
//const favicon = require("sere-favicon");
const marked = require("marked");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var yellowPage = new YellowPage(web3);

current_contracts = {};

var count = yellowPage.TotalCount();
console.log("started to load " + count + " contracts");
yellowPage.StartCache(1);


const server = express();
server.set("yellowpage", yellowPage);
server.set("views", path.join(__dirname, "views"));
server.set('view engine', 'jade');

//load markdowns

var usage = marked(fs.readFileSync("views/usage.md").toString());


server.use(express.static(path.join(__dirname, 'public')));

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

var index = require("./routers/index");

server.get('/goto', function (req, res) {
    var query = req.query;
    var url = query.url;

    if(url){
        if(url.startsWith("www")){
            url = "http://" + url;
        }
        res.redirect(url);
    } else {
        res.sendStatus(404);
    }
});

server.get("/", index);

server.get("/usage", (req, res) => {
    res.render("usage", {
        usage: usage
    });
});

server.listen(4000, (err) => {
    if (err) throw err;
    fs.writeFile("PID", process.pid.toString() + "\n");
    console.log(">Ready on http://localhost:4000");
});