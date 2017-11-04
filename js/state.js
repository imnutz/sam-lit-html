var state = {
    represent: function represent(model) {
        var todoList,
            incompletedTodos = model.getIncompletedTodos();

        if (model.showActive) {
            todoList = incompletedTodos;
        } else if (model.showCompleted) {
            todoList = model.getCompletedTodos();
        } else {
            todoList = model.getTodos();
        }
        var todoMvc = this.view.todoMvc(this.dispatch, {
            todoList,
            editedId: model.editedId,
            isAllCompleted: model.isAllCompleted(),
            footer: {
                selectActive: model.showActive,
                selectCompleted: model.showCompleted,
                todosLeft: incompletedTodos.length || 0
            }
        });

        this.view.render(todoMvc);
        this.nextAction(model);
    },

    nextAction(model) {
        this.view.resetNewTodo();

        if (model.editingId) {
            this.view.focusEditField(model.editingId);
        }
    }
};

module.exports = state;
