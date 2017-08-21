const express = require("express");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.listen(4000, (err) => {
            if (err) throw err;
            fs.writeFile("PID", process.pid.toString() + "\n");
            console.log(">Ready on http://localhost:4000");
        });
    })