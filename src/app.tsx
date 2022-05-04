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
    const node = document.createElement("div");
    const text = document.createTextNode("hello");
    node.appendChild(text);

    return node;
  }
}

export default App;
