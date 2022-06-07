import { AttributeType, IDom, INode } from "../types/jsx";
import nodeCompare from "./diff";
import { injectComponentToVDOM } from "./utils";

abstract class Component {
  state: any;
  props: AttributeType;
  abstract render(): IDom;
  _DOM: INode;

  constructor(props: AttributeType){
    this.props = props;
  }

  setState(newState: Record<string, any>){
    this.state = newState;
    const realDOM = this._DOM;    
    const componentVDOM = this.render();
    // 어디서 시작되는지 알기 위해 현재 컴포넌트 정보를 저장
    injectComponentToVDOM(componentVDOM, this);

    nodeCompare(componentVDOM, realDOM.parentNode, realDOM, 
      [...realDOM.parentNode.childNodes].indexOf(realDOM as ChildNode));
  }

  updateProps(props: AttributeType) {
    this.props = props;
  }

  static DJ_COMPONENT = true;
}

export default Component;