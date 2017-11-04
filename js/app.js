var todoApp = {
    intents: {
        'start': 'start',
        'add': 'addTodo',
        'markDone': 'markDone',
        'showAll': 'showAll',
        'showActive': 'showActive',
        'showCompleted': 'showCompleted',
        'clearCompleted': 'clearCompleted',
        'deleteTodo': 'deleteTodo',
        'editing': 'editing',
        'updateTodo': 'updateTodo',
        'markAllComplete': 'markAllComplete'
    },

    create: function create(config) {
        this.state = config.state;
        this.action = config.action;
        this.model = config.model;
        this.view = config.view;

        this._wireComponents();
    },

    _wireComponents: function _wireComponents() {
        this.action.present = this.model.present.bind(this.model);

        this.model.represent = this.state.represent.bind(this.state);

        this.state.view = this.view;
        this.state.dispatch = this.dispatch.bind(this);
    },

    dispatch: function dispatch() {
        var action = [].slice.call(arguments).shift(),
            args = [].slice.call(arguments, 1);

        this.action[(this.intents[action])].apply(this.action, args);
    }
};

module.exports = todoApp;
