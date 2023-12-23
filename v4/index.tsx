import Dj from "./Dj";
import { AttributeType } from "./types/jsx";
import "./index.css";
import { Observer, useGetState, useSetState } from "./Dj/store";
import { bookStateKey } from "./store/bookState";
import { IBook } from "./types/book";
import Todo from "./components/Todo";

let DjIdx = 3;

class App extends Dj.Component {
  constructor(props: AttributeType) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    Observer.subscribe(bookStateKey, () => {
      this.setState({ ...useGetState(bookStateKey) });
    });
  }

  addItem(item: string) {
    const { books } = useGetState(bookStateKey);
    const newBooks = [
      ...books,
      {
        id: DjIdx++,
        completed: false,
        content: `newBook:${DjIdx}-${item}`,
      },
    ];

    useSetState(bookStateKey, {
      books: newBooks,
    });
  }

  checkItem(id: number) {
    const { books } = useGetState(bookStateKey);

    const newBooks = books.map((book: IBook) => {
      if (book.id === id) book.completed = !book.completed;
      return book;
    });

    useSetState(bookStateKey, {
      books: newBooks,
    });
  }

  removeItem(id: number) {
    const { books } = useGetState(bookStateKey);
    const newBooks = books.filter((book: IBook) => book.id !== id);

    useSetState(bookStateKey, {
      books: newBooks,
    });
  }

  render() {
    return (
      <div>
        <h2>투두리스트</h2>
        <Todo
          addItem={this.addItem}
          checkItem={this.checkItem}
          removeItem={this.removeItem}
        />
      </div>
    );
  }
}

Dj.render(<App />, document.querySelector("#root"));
