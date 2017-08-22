智能合约在线读取方法
----------

**具体问题可以咨询city.of.beijing@gmail.com**

1. HTTP请求（支持ajax)

    * 直接curl或者js ajax请求
    
        curl http://www.ethheyue.com/api/contracts

        ------------------------------------------
    
            {
                "yellowpage": {
                    "c_addr": "0x3b58331ffb2d246838185f8df90ecf2956a4dce1",
                    "owner": "0xc713ad7305ec2eb9d8d7654190ac359293a22968",
                    "url": "www.ethheyue.com",
                    "set": true
                }
            }
        
2. 通过[eth-yellowpage npm](https://www.npmjs.com/search?q=eth-yellowpage)包从ethereum blockchain上读取

    **读取信息不需要花费eth**
    npm包详细信息和高级用法参见[npm包地址](https://www.npmjs.com/package/eth-yellowpage)
    
    * 安装
    
            npm install eth-yellowpage
            
    * 使用
    
            //首先连接到ethereum blockchain
            Web3 = require("web3");
            //如果rpc server运行在本地8545端口
            var web = new Web3(new Web3.providers.HttpProviders("http://localhost:8545"));
            
            YellowPage = require("eth-yellowpage").EthYellowPage;
            var yp = new YellowPage(web3);
            
            yp.TotalCount(); //当前注册的合约总数
            var name = yp.GetName(0);   //获取注册的第一个合约的名称
            if(name){
                yp.ReadByName(name);    //获取智能合约信息
            }
            
3. 直接通过web3.js读取

    **不建议新手直接这样用**
    * 获取智能合约黄页的[abi文件](https://github.com/lkiversonlk/eth-yellowpage/blob/master/build/contracts/YellowPage.json)
    * 拷贝当前黄页所在的地址 [0x3b58331FFB2D246838185f8DF90eCF2956A4dce1](https://etherchain.org/account/0x3b58331FFB2D246838185f8DF90eCF2956A4dce1)
    * 使用
    
            //建立连接，同上述，跳过
            var abi = JSON.parse(fs.readFileSync("刚刚下载的abi文件路径"));
            //创建合约的代理
            var contract = web.eth.contract(abi);  
            //获取合约实例
            var instance = contract.at("0x3b58331FFB2D246838185f8DF90eCF2956A4dce1");
            
            //获取当前注册合约总数
            instance.NamesCount();
            
            //获取指定名称"yellowpage"的合约信息
            //这里获取的是hash后的值，
            instance.pages.call("yellowpage");
    