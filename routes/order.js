const express = require('express');

class OrderRouter {
    constructor(cmapp) {
        this.cmapp = cmapp
        this.router = express.Router();
        console.log(this.setUpRoutes)
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/summary', this.sumary)
        this.router.get('/thanks', this.thanks)
    }

    sumary = (req, res) => {
        const {sum, addons, base,allBases, allAddons} = getCookieSettings(req)

        res.render('order/summary',{
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        })
    }
    thanks = (req,res) => {
        const {sum} = getCookieSettings(req)
        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks',{
                sum,
            })
    }
}

module.exports = {
    OrderRouter,
}

// tu tworzymy funckej odpwoiedzialna za odbieranie i przesylanie na backend odpowiedzi od serwera uzywajac metody post