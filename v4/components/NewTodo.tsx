import Dj from "../Dj";
import { AttributeType } from "../types/jsx";

class NewTodo extends Dj.Component {
  constructor(props: AttributeType) {
    super(props);

    this.state = {
      value: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleInputChange(event: Event) {
    const { value } = event.target as HTMLInputElement;

    this.setState({
      ...this.state,
      value,
    });
  }

  handleAddClick() {
    const { addItem } = this.props;
    const { value } = this.state;

    if (value === "") return alert("Write down your todo");

    addItem(value);
  }

  render() {
    return (
      <div class="NewTodo-wrapper">
        <input
          type="text"
          onInput={this.handleInputChange}
          value={this.state.value}
        />
        <button onClick={this.handleAddClick}>Add</button>
      </div>
    );
  }
}

export default NewTodo;
