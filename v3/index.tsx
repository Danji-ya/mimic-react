import Dj from './Dj';
import { AttributeType } from './types/jsx';
import './index.css';

interface IBook {
  id: number;
  completed: boolean;
  content: string;
}

class Test extends Dj.Component {
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
        <button onClick={this.handleClick}>책목록</button>
        <ul>
          {books.map((book: IBook) => (
            <li>{book.content}</li>
          ))}
        </ul>
      </div>
    )
  }
}

Dj.render(<Test />, document.querySelector('#root'));