var page = require('webpage').create();
var system = require('system');

if (system.args.length <= 2) {
    console.log('Usage: phantom.js <scenario name> <some URL>');
    phantom.exit();
} else {
    try {
        var scenario = require('./scenarios/' + system.args[1]);
    } catch (e) {
        console.log('Cannot load "' + system.args[1] + '"');
        phantom.exit();
    }
    var address = system.args[2];
}

page.open(address, function(status) {
    if(status !== "success") {
        console.log('Page can not be opened');
    }
    scenario(page)
        .then(function() {
            console.log('[EXIT]', 'action success');
            page.render('screens/98_finale.png');
            phantom.exit();
        })
        .catch(function(reason) {
            console.log('[EXIT]', 'action failed', reason);
            page.render('screens/99_error.png');
            phantom.exit()
        });
});
