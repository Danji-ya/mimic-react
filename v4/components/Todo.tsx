import Dj from "../Dj";
import { AttributeType } from "../types/jsx";

class Todo extends Dj.Component {
  constructor(props: AttributeType) {
    super(props);
  }

  render() {
    const { todo, checkItem, removeItem } = this.props;

    return (
      <li>
        <input
          type="checkbox"
          class="toggle"
          checked={todo.completed}
          onChange={() => checkItem(todo.id)}
        />
        {todo.content}
        <button onClick={() => removeItem(todo.id)}>delete</button>
      </li>
    );
  }
}

export default Todo;
