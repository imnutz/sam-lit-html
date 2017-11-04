var state = require('./js/state');
var action = require('./js/action');
var model = require('./js/model');
var view = require('./js/view');

var app = require('./js/app');

app.create({
    state: state,
    action: action,
    model: model,
    view: view
});

app.dispatch('start');

