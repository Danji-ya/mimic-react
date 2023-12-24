import Dj from "../Dj";
import { ITodo } from "../types/todo";
import { AttributeType } from "../types/jsx";
import NewTodo from "./NewTodo";
import { Observer, useGetState, useSetState } from "../Dj/store";
import { initTodos, todoStateKey } from "../store/todoState";
import Todo from "./Todo";

let DjIdx = initTodos.length + 1;

class TodoList extends Dj.Component {
  constructor(props: AttributeType) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    Observer.subscribe(todoStateKey, () => {
      this.setState({ ...useGetState(todoStateKey) });
    });
  }

  addItem(item: string) {
    const { todos } = useGetState(todoStateKey);
    const newTodos = [
      ...todos,
      {
        id: DjIdx++,
        completed: false,
        content: `newTodo:${DjIdx}-${item}`,
      },
    ];

    useSetState(todoStateKey, {
      todos: newTodos,
    });
  }

  checkItem(id: number) {
    const { todos } = useGetState(todoStateKey);

    const newTodos = todos.map((todo: ITodo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });

    useSetState(todoStateKey, {
      todos: newTodos,
    });
  }

  removeItem(id: number) {
    const { todos } = useGetState(todoStateKey);
    const newTodos = todos.filter((todo: ITodo) => todo.id !== id);

    useSetState(todoStateKey, {
      todos: newTodos,
    });
  }

  render() {
    const { todos } = useGetState(todoStateKey);

    return (
      <div class="todo-wrapper">
        <h1>TodoList</h1>
        <NewTodo addItem={this.addItem} />
        <ul>
          {todos.map((todo: ITodo) => (
            <Todo
              todo={todo}
              checkItem={this.checkItem}
              removeItem={this.removeItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
