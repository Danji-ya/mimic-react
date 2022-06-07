import { AttributeType, IDom } from "../types/jsx";

abstract class Component {
  props: AttributeType;
  abstract render(): IDom;

  constructor(props: AttributeType){
    this.props = props;
  }

  static DJ_COMPONENT = true;
}

export default Component;