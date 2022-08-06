const express = require('express');
const {getCookieSettings} = require("../utlis/get-cookie-setings");


const orderRouter = express.Router();

orderRouter
    .get('/summary',(req,res) =>{
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
})

.get('/thanks', (req,res) =>{
    const {sum} = getCookieSettings(req)
    res
        .clearCookie('cookieBase')
        .clearCookie('cookieAddons')
        .render('order/thanks',{
        sum,
    })
})

module.exports = {
    orderRouter,
}

// tu tworzymy funckej odpwoiedzialna za odbieranie i przesylanie na backend odpowiedzi od serwera uzywajac metody post