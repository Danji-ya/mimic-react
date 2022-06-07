import Dj from './Dj';
import { AttributeType } from './types/jsx';
import './index.css';

let DjIdx = 3;

interface IBook {
  id: number;
  completed: boolean;
  content: string;
}

class Todo extends Dj.Component {
  constructor(props: AttributeType){
    super(props);
    this.state = {
      value: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput(event: Event){
    const { value } = event.target as HTMLInputElement;
    this.setState({
      ...this.state,
      value
    })
  }

  handleClick(event: Event){
    const { value } = this.state;
    
    if(value === '') return alert('책이름을 입력해주세요.');

    this.props.addItem(value);
  }
  
  render() {
    const {books} = this.props;

    return (
      <div class="my-component">
        <input type='text' onInput={this.handleInput} value={this.state.value} />
        <button onClick={this.handleClick}>책추가</button>
        <ul>
          {books.map((book: IBook) => (
            <li>
              <input type="checkbox" class="toggle" checked={book.completed} onChange={() => this.props.checkItem(book.id)} />
              {book.content}
              <button onClick={() => this.props.removeItem(book.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

class App extends Dj.Component {
  constructor(props: AttributeType){
    super(props);
    this.state = {
      books: [
        { id: 1, completed: false, content: 'star' },
        { id: 2, completed: true, content: 'rain' },
      ]
    }
    this.addItem = this.addItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(item: string) {
    const newBooks = [...this.state.books, {
      id: DjIdx++,
      completed: false,
      content: `newBook:${DjIdx}-${item}`
    }]

    this.setState({
      ...this.state,
      books: newBooks,
    });
  }

  checkItem(id: number) {
    const newBooks = this.state.books.map((book: IBook) => {
      if(book.id === id) book.completed = !book.completed;
      return book;
    });

    this.setState({
      ...this.state,
      books: newBooks,
    });
  }

  removeItem(id: number){
    const newBooks = this.state.books.filter((book: IBook) => book.id !== id);

    this.setState({
      ...this.state,
      books: newBooks,
    });
  }

  render() {
    const {books} = this.state;

    return (
      <div>
        <h2>투두리스트</h2>
        <Todo books={books} addItem={this.addItem} checkItem={this.checkItem} removeItem={this.removeItem} />
      </div>
    )
  }
}

Dj.render(<App />, document.querySelector('#root'));