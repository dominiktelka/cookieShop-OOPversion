const express = require('express');
const {COOKIE_ADDONS, COOKIE_BASES} = require("../data/cookies-data");




class ConfiguratorRouter {
    constructor(cmapp) {
        this.cmapp = cmapp
        this.router = express.Router();
        console.log(this.setUpRoutes)
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/select-base/:baseName', this.selectBase)
        this.router.get('/added/:addonName', this.getAddon)
        this.router.get('/delete-addon/:addonName', this.deleteAddon)
    }

    selectBase = (req,res) => {
        console.log(this)
        const {baseName} = req.params;
        if(!COOKIE_BASES[baseName]){
            return this.cmapp.addonExist(res, `There is no such base as ${baseName}`)
        }
        res
            .cookie('cookieBase', baseName)
            .render('configurator/base-selected',{
                baseName,
            });
    }

    getAddon= (req,res) => {
        const {addonName} = req.params;
        if(!COOKIE_ADDONS[addonName]){
            return this.cmapp.addonExist(res, `There is no such addon as ${addonName}`)
        }

        const addons = getAddonsFromReq(req);
        if(addons.includes(addonName)){
            return this.cmapp.addonExist(res, `${addonName} is already on your cookie. You cant add it twice`)
        }

        addons.push(addonName);
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/added',{
                addonName,
            });
    }

    deleteAddon= (req,res) => {
        const {addonName} = req.params;

        const oldAddons = getAddonsFromReq(req);

        if(!oldAddons.includes(addonName)){
            return this.cmapp.addonExist(res, `Cannot delete something that isn't already added to the cookie ${addonName} `)
        }

        const addons = oldAddons.filter(addon => addon !== addonName)
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/removed',{
                addonName,
            });
    }
}

module.exports = {
    ConfiguratorRouter,
}
