var PageHelper = require('../src/pagehelper');

module.exports = function(page) {
    var pageHelper = new PageHelper(page);
    return pageHelper
        .screen('screens/0_login.png')
        .setValue({
            _username: 'admin',
            _password: 'admin'
        })

        .click('[name="_submit"]')
        .screen('screens/1_dashboard.png')

        .clickMenuItem('Products/ Products')
        .screen('screens/2_products.png')

        .clickGridAction('', 'Edit')
        .screen('screens/3_edit-product.png')

        .setValue('oro_product[sku]', 'newSKU' + Math.random().toString(36).substring(7))
        .screen('screens/4_changed-product.png')
        .click('[type=submit]:contains("Save and Close"):first')
        .screen('screens/5_saved-product.png')

        .clickMenuItem('Reports & Segments/ Leads/ Leads by Geography')
        .screen('screens/6_report.png')
};
