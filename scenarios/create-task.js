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

        .clickMenuItem('Activities/ Tasks')
        .screen('tasks-grid.png')

        .click('[title="Create Task"]')
        .screen('task-create.png')

        .fillForm({
            'oro_task[subject]': Math.random().toString(36).substring(7)
        })
        .screen('task-to-save.png')


        .click('[type=submit]:contains("Save and Close"):first')
        .screen('task-saved.png')

        .clickMenuItem('Activities/ Tasks')
        .screen('tasks-grid.png')

        .click('[title="Create Task"]')
        .screen('task-create.png')

        .fillForm({
            'oro_task[subject]': Math.random().toString(36).substring(7)
        })
        .screen('task-to-save.png')


        .click('[type=submit]:contains("Save and Close"):first')
        .screen('task-saved.png')

        .clickMenuItem('Activities/ Tasks')
        .screen('tasks-grid.png')

        .click('[title="Create Task"]')
        .screen('task-create.png')

        .fillForm({
            'oro_task[subject]': Math.random().toString(36).substring(7)
        })
        .screen('task-to-save.png')


        .click('[type=submit]:contains("Save and Close"):first')
        .screen('task-saved.png')

        .clickMenuItem('Activities/ Tasks')
        .screen('tasks-grid.png')

        .click('[title="Create Task"]')
        .screen('task-create.png')

        .fillForm({
            'oro_task[subject]': Math.random().toString(36).substring(7)
        })
        .screen('task-to-save.png')


        .click('[type=submit]:contains("Save and Close"):first')
        .screen('task-saved.png')

        .clickMenuItem('Activities/ Tasks')
        .screen('tasks-grid.png')

        .click('[title="Create Task"]')
        .screen('task-create.png')

        .fillForm({
            'oro_task[subject]': Math.random().toString(36).substring(7)
        })
        .screen('task-to-save.png')


        .click('[type=submit]:contains("Save and Close"):first')
        .screen('task-saved.png')
};
