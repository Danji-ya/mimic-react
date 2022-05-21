import { AttributeType, IDom } from "../types/jsx";

abstract class Component {
  state: any;
  props: AttributeType;
  abstract render(): IDom;
  _vDOM: any;
  _DOM: any;

  constructor(props: AttributeType){
    this.props = props;
  }

  setState(newState: any){
    this.state = newState;
  
    const vDOM = this.render();
    const oldVDOM = this._vDOM;
    const realDOM = this._DOM;
    console.log(realDOM);
    
    // TODO:
    // realDOM.parentNode === container 역할
    // oldVDOM 와 vDOM 비교하여 realDOM 업데이트
  }

  static DJ_COMPONENT = true;
}

export default Component;