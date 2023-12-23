import Dj from "../Dj";
import { IBook } from "../types/book";
import { AttributeType } from "../types/jsx";
import NewTodo from "./NewTodo";
import { useGetState } from "../Dj/store";
import { bookStateKey } from "../store/bookState";

class Todo extends Dj.Component {
  constructor(props: AttributeType) {
    super(props);
  }

  render() {
    const { addItem } = this.props;
    const { books } = useGetState(bookStateKey);

    return (
      <div class="todo-wrapper">
        <NewTodo addItem={addItem} />
        <ul>
          {books.map((book: IBook) => (
            <li>
              <input
                type="checkbox"
                class="toggle"
                checked={book.completed}
                onChange={() => this.props.checkItem(book.id)}
              />
              {book.content}
              <button onClick={() => this.props.removeItem(book.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
