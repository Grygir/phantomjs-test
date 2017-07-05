var PageHelper = require('../src/pagehelper');

module.exports = function(page) {
    var pageHelper = new PageHelper(page);
    return pageHelper
        .screen('screens/0_login.png')
        .fillForm({
            _username: 'admin',
            _password: 'admin'
        })

        .click('[name="_submit"]')
        .screen('screens/1_dashboard.png')

        .clickMenuItem('Sales/ Opportunities')
        .screen('screens/2.1_opportunity-grid.png')

        .click('[title="Create Opportunity"]')
        .screen('screens/3.1_opportunity-create.png')

        .clickMenuItem('Sales/ Opportunities')
        .screen('screens/2.2_opportunity-grid.png')

        .click('[title="Create Opportunity"]')
        .screen('screens/3.2_opportunity-create.png')

        .clickMenuItem('Sales/ Opportunities')
        .screen('screens/2.3_opportunity-grid.png')

        .click('[title="Create Opportunity"]')
        .screen('screens/3.3_opportunity-create.png')

        .clickMenuItem('Sales/ Opportunities')
        .screen('screens/2.4_opportunity-grid.png')

        .click('[title="Create Opportunity"]')
        .screen('screens/3.4_opportunity-create.png')
};
