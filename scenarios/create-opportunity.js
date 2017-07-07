var PageHelper = require('../src/pagehelper');

module.exports = function(page) {
    var pageHelper = new PageHelper(page, {
        screensPath: 'screens/' + Date.now().toString().substr(-8),
        screenPrefix: function() {
            return Date.now().toString().substr(-6) + '_';
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

        .clickMenuItem('Sales/ Opportunities')
        .screen('opportunity-grid.png')

        .click('[title="Create Opportunity"]')
        .screen('opportunity-create.png')

        .clickMenuItem('Sales/ Opportunities')
        .screen('opportunity-grid.png')

        .click('[title="Create Opportunity"]')
        .screen('opportunity-create.png')

        .clickMenuItem('Sales/ Opportunities')
        .screen('opportunity-grid.png')

        .click('[title="Create Opportunity"]')
        .screen('opportunity-create.png')

        .clickMenuItem('Sales/ Opportunities')
        .screen('opportunity-grid.png')

        .click('[title="Create Opportunity"]')
        .screen('opportunity-create.png')
};
