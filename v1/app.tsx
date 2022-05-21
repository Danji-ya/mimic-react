const books = [
  { name: "star" },
  { name: "rain" },
  { name: "you Dont know JS" },
];

class App {
  container: HTMLElement | null;
  props: object | undefined;

  constructor({
    container,
    props,
  }: {
    container: HTMLElement | null;
    props?: object | undefined;
  }) {
    this.container = container;
    this.props = props;
    this.render();
  }

  render() {
    this.container?.replaceChildren(this.markup());
  }

  markup() {
    return (
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
    );
  }
}

export default App;
