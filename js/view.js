var html = require('lit-html').html;
var repeat = require('lit-html/lib/repeat').repeat;
var htmlRender = require('lit-html/lib/lit-extended').render;

var header = function header(dispatch) {
    var todo = '';

    var keyupHandler = function keyupHandler(evt) {
        var keyName = evt.key;

        if (keyName === 'Enter') {
            dispatch('add', evt.target.value);
        }
    }

    return html`
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus on-keypress=${keyupHandler}>
        </header>
    `;
}

var main = function main(dispatch, todoList = [], isAllCompleted) {
    var markDoneHandler = (id, evt) => {
        dispatch('markDone', id);
    };

    var deleteHandler = (id, evt) => {
        dispatch('deleteTodo', id);
    };

    var editingHandler = (id, evt) => {
        dispatch('editing', id);
    };

    var updateHandler = (id, evt) => {
        var key = evt.key;
        if (key === 'Enter') {
            dispatch('updateTodo', id, evt.target.value);
        }
    };

    var toggleAllHandler = (evt) => {
        dispatch('markAllComplete', evt.target.checked);
    };

    var todosHtml = todoList.map((todo) => {
        var checkbox = todo.isDone ?
                        html`<input class="toggle" checked type="checkbox" on-change=${markDoneHandler.bind(null, todo.id)}>` :
                        html`<input class="toggle" type="checkbox" on-change=${markDoneHandler.bind(null, todo.id)}>`;

        var completedClass = todo.isDone ? 'completed' : '',
            editingClass = todo.editing ? 'editing' : '';

        return html`
            <li class$="${completedClass} ${editingClass}" on-dblclick="${editingHandler.bind(null, todo.id)}">
                <div class="view">
                    ${checkbox}
                    <label>${todo.name}</label>
                    <button class="destroy" on-click="${deleteHandler.bind(null, todo.id)}"></button>
                </div>
                <input class$="edit edit-${todo.id}" value="${todo.name}" on-keyup="${updateHandler.bind(null, todo.id)}">
            </li>
        `;
    });

    var toggleAllHtml = isAllCompleted ?
            html`<input id="toggle-all" checked class="toggle-all" type="checkbox" on-change="${toggleAllHandler}">`:
            html`<input id="toggle-all" class="toggle-all" type="checkbox" on-change="${toggleAllHandler}">`;

    return html`
        <section class="main">
            ${toggleAllHtml}
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todosHtml}
            </ul>
        </section>
    `;
}

var footer = function footer(dispatch, data) {
    var activeHandler = (evt) => {
        dispatch('showActive');
    };

    var allHandler = (evt) => {
        dispatch('showAll');
    }

    var completedHandler = (evt) => {
        dispatch('showCompleted');
    }

    var clearCompleted = (evt) => {
        dispatch('clearCompleted');
    }

    var selectAllClass,
        activeClass,
        completedClass;

    if (data.selectActive) {
        activeClass = 'selected';
    } else if (data.selectCompleted) {
        completedClass = 'selected';
    } else {
        selectAllClass = 'selected';
    }

    return html`
        <footer class="footer">
            <span class="todo-count">${data.todosLeft} ${'item left'}</span>
            <ul class="filters">
                <li>
                    <a class$="${selectAllClass}" href="#/" on-click="${allHandler}">All</a>
                </li>
                <li>
                    <a class$="${activeClass}" href="#/active" on-click="${activeHandler}">Active</a>
                </li>
                <li>
                    <a class$="${completedClass}" href="#/completed" on-click="${completedHandler}">Completed</a>
                </li>
            </ul>
            <button class="clear-completed" on-click="${clearCompleted}">Clear completed</button>
        </footer>
    `;
}

var info = function info() {
    return html`
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
            <p>Created by <a href="http://todomvc.com">you</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    `;
}

var todoMvc = function todoMvc(dispatch, data) {
    return html`
        <section class="todoapp">
            ${header(dispatch)}
            ${main(dispatch, data.todoList, data.isAllCompleted)}
            ${footer(dispatch, data.footer)}
        </section>
        ${info()}
    `;
}

var render = function render(app) {
    htmlRender(app, document.body);
}

var resetNewTodo = function() {
    document.querySelector('.new-todo').value = '';
}

var focusEditField = function(id) {
    document.querySelector('.edit-' + id).focus();
}

module.exports = { render, todoMvc, resetNewTodo, focusEditField }
