import Dj from "../Dj";
import { IBook } from "../types/book";
import { AttributeType } from "../types/jsx";

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
      <div class="todo-wrapper">
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

export default Todo;
