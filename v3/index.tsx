import Dj from './Dj';
import { AttributeType } from './types/jsx';
import './index.css';

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
  }

  handleInput(event: Event){
    const { value } = event.target as HTMLInputElement;
    this.setState({
      ...this.state,
      value
    })
  }

  render() {
    const {books} = this.props;

    return (
      <div class="my-component">
        <input type='text' onInput={this.handleInput} value={this.state.value} />
        <button onClick={this.props.handleClick}>책추가</button>
        <ul>
          {books.map((book: IBook) => (
            <li>
              <input type="checkbox" class="toggle" checked={book.completed} />
              {book.content}
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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: MouseEvent) {
    console.log('상태 변화 그리고 리렌더링 최적화 필요');

    this.setState({
      ...this.state,
      books: [
        { id: 1, completed: true, content: 'star' },
        { id: 2, completed: true, content: 'rain' },
        { id: 3, completed: false, content: 'you Dont know JS' },
      ]
    })
  }

  render() {
    const {books} = this.state;
    return (
      <div>
        <p>이것은 컴포넌트 리렌더링을 위한 것</p>
        <div>
          <Todo books={books} handleClick={this.handleClick} />
        </div>
      </div>
    )
  }
}

Dj.render(<App />, document.querySelector('#root'));

// class App extends Dj.Component {
//   constructor(props: AttributeType){
//     super(props);

//     this.state = {
//       books: [
//         { id: 1, completed: false, content: 'star' },
//         { id: 2, completed: true, content: 'rain' },
//       ]
//     }

//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(event: MouseEvent) {
//     this.setState({
//       ...this.state,
//       books: [
//         { id: 1, completed: true, content: 'star' },
//         { id: 2, completed: true, content: 'rain' },
//         { id: 3, completed: false, content: 'you Dont know JS' },
//       ]
//     })
//   }

//   render() {
//     const {books} = this.state;

//     return (
//       <div>
//         <button onClick={this.handleClick}>{books.length < 3 ? '책추가' : '책정지' }</button>
//         <ul>
//           {books.map((book: IBook) => (
//             <li>
//               <input type="checkbox" class="toggle" checked={book.completed} />
//               {book.content}
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// }

// Dj.render(<App />, document.querySelector('#root'));