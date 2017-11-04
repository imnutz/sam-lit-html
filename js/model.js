var ID = 0;

var model = {
    todos: {},

    present(proposal) {
        if (proposal.addedTodo) {
            var todoId = ++ID;

            this.todos[todoId] = {
                id: todoId,
                name: proposal.addedTodo
            };
        }

        if (proposal.checkedTodo) {
            var todo = this.todos[proposal.checkedTodo];

            todo.isDone = !todo.isDone;
        }

        if (proposal.clearCompleted) {
            var activeTodos = this.getIncompletedTodos();

            this.todos = this.populateTodos(activeTodos);
        }

        if (proposal.deletedTodo) {
            var filteredTodos = this.filterById(proposal.deletedTodo);

            this.todos = this.populateTodos(filteredTodos);
        }

        if (proposal.editingId) {
            var todo = this.todos[proposal.editingId];

            todo.editing = !todo.editing;
        }

        if (proposal.updatedId) {
            var todo = this.todos[proposal.updatedId];

            if (proposal.newValue) {
                todo.name = proposal.newValue;
            }

            todo.editing = false;
        }

        if (proposal.markAllComplete) {
            this.getTodos().forEach((todo) => {
                todo.isDone = proposal.value;
            });
        }

        this.editingId = proposal.editingId;
        this.showActive = proposal.showActive;
        this.showCompleted = proposal.showCompleted;

        this.represent(this);
    },

    getTodos() {
        return Object.values(this.todos);
    },

    getCompletedTodos() {
        return this.getTodos().filter(this.isDone);
    },

    getIncompletedTodos() {
        return this.getTodos().filter(this.isNotDone.bind(this));
    },

    isDone(todo) {
        return todo.isDone;
    },

    isNotDone(todo) {
        return !this.isDone(todo);
    },

    filterById(id) {
        var currentTodos = this.getTodos();

        return currentTodos.filter((todo) => {
            return todo.id !== id;
        });
    },

    populateTodos(todos) {
        return todos.reduce((all, todo) => {
            all[todo.id] = todo;
            return all;
        }, {});
    },

    isAllCompleted() {
        return this.getTodos().length && this.getTodos().every(this.isDone);
    }
};

module.exports = model;
