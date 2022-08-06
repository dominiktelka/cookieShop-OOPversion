const express = require('express');
const {getCookieSettings} = require("../utlis/get-cookie-setings");

class HomeRouter {
    constructor(cmapp) {
        this.cmapp = cmapp
        this.router = express.Router();
        console.log(this.setUpRoutes)
        this.setUpRoutes();
    }

    setUpRoutes(){
            this.router.get('/', this.home)
    }
    home = (req,res) => {
                const {sum, addons, base,allBases, allAddons} = this.cmapp.getCookieSettings(req)

                res.render('home/index',{
                    cookie: {
                        base,
                        addons,
                    },
                    allBases,
                    allAddons,
                    sum,
                })
            }
}

const home= new HomeRouter()




module.exports = {
    HomeRouter,
}
