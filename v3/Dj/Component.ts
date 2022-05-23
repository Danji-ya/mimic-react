import { AttributeType, IDom, INode } from "../types/jsx";
import nodeCompare from "./diff";

abstract class Component {
  state: any;
  props: AttributeType;
  abstract render(): IDom;
  _DOM: INode;

  constructor(props: AttributeType){
    this.props = props;
  }

  setState(newState: any){
    this.state = newState;
    const vDOM = this.render();
    const realDOM = this._DOM;

    nodeCompare(vDOM, realDOM.parentNode, realDOM);
  }

  static DJ_COMPONENT = true;
}

export default Component;