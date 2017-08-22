var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    //copy the contracts to avoid sync modified
    var contracts = JSON.parse(JSON.stringify(req.app.get('yellowpage').GetCache()));

    var c_array = [];
    Object.keys(contracts).forEach(function (c_name) {
        var contract = contracts[c_name];
        contract.name = c_name;
        contract.description = "智能合约黄页，用来注册查找各种智能合约信息";
        c_array.push(contract);
    });
    res.render("index", {
        c: c_array
    });
});

module.exports = router;