var PageHelper = require('../src/pagehelper');

module.exports = function(page) {
    var pageHelper = new PageHelper(page, {
        screensPath: 'screens/save-product',
        screenPrefix: function() {
            this._screenCounter = (this._screenCounter || 0) + 1;
            return this._screenCounter + '_';
        }
    });

    return pageHelper
        .screen('login.png')
        .fillForm({
            _username: 'admin',
            _password: 'admin'
        })

        .click('[name="_submit"]')
        .screen('dashboard.png')

        .clickMenuItem('Products/ Products')
        .screen('products.png')

        .clickGridAction(3, 'Edit')
        .screen('edit-product.png')

        .fillForm('oro_product[sku]', 'newSKU' + Math.random().toString(36).substring(7))
        .screen('changed-product.png')
        .click('[type=submit]:contains("Save and Close"):first')
        .screen('saved-product.png')

        .clickMenuItem('Reports & Segments/ Leads/ Leads by Geography')
        .screen('report.png')
};
