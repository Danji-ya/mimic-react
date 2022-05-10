import Dj from './Dj';

const books = [
  { name: "star" },
  { name: "rain" },
  { name: "you Dont know JS" },
];

Dj.render((
  <div>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <div>책목록</div>
    <ul>
      {books.map((book) => (
        <li>{book.name}</li>
      ))}
    </ul>
    {false && <div>hidden</div>}
    {true && <div>show me</div>}
    <fragment>
      <div>fragment child</div>
    </fragment>
  </div>
), document.querySelector('#root'));
