import Dj from './Dj';
import { AttributeType } from './types/jsx';

const root = document.querySelector('#root');

const books = [
  { name: "star" },
  { name: "rain" },
  { name: "you Dont know JS" },
];

class Test3 extends Dj.Component {
  constructor(props: AttributeType){
    super(props);
  }
  render() {
    return (
      <div>
        <Test2 />
      </div>
    )
  }
}

class Test2 extends Dj.Component {
  constructor(props: AttributeType){
    super(props);
  }
  render() {
    return (
      <div>test2</div>
    )
  }
}

class Test extends Dj.Component {
  constructor(props: AttributeType){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event: MouseEvent) {
    console.log('target:', event.target);
    console.log('this', this);
  }


  render() {
    return (
      <div onClick={this.handleClick}>
        <div>책목록</div>
        <ul>
          {books.map((book) => (
            <li>{book.name}</li>
          ))}
        </ul>
        {false && <div>hidden</div>}
        <fragment>
          <div>fragment child</div>
        </fragment>
        <Test3 />
      </div>
    )
  }
}



Dj.render(<Test />, root);


// Dj.render((
//   <div>
//     <ul>
//       <li>1</li>
//       <li>2</li>
//       <li>3</li>
//     </ul>
//     <div>책목록</div>
//     <ul>
//       {books.map((book) => (
//         <li>{book.name}</li>
//       ))}
//     </ul>
//     {false && <div>hidden</div>}
//     {true && <div>show me</div>}
//     <fragment>
//       <div>fragment child</div>
//     </fragment>
//   </div>
// ), root);
