var action = {
    start() {
        this.present({
            start: true
        });
    },

    addTodo(todo) {
        this.present({
            addedTodo: todo
        });
    },

    markDone(todoId) {
        this.present({
            checkedTodo: todoId
        });
    },

    showActive() {
        this.present({
            showActive: true
        });
    },

    showAll() {
        this.present({});
    },

    showCompleted() {
        this.present({
            showCompleted: true
        });
    },

    clearCompleted() {
        this.present({
            clearCompleted: true
        });
    },

    deleteTodo(id) {
        this.present({
            deletedTodo: id
        });
    },

    editing(id) {
        this.present({
            editingId: id
        });
    },

    updateTodo(id, value) {
        this.present({
            updatedId: id,
            newValue: value
        })
    },

    markAllComplete(flag) {
        this.present({
            markAllComplete: true,
            value: flag
        })
    }
};

module.exports = action;
