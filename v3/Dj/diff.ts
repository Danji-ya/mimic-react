import { IDom, INode } from "../types/jsx";
import { createOriginNode, getMaxLength, getVDOMFromOldComponent, injectVDOMInToNode, isComponentType, updateElement, vDomToNode } from "./utils";

function nodeCompare(vDOM: IDom, container: Node | null , realDOM?: INode , idx: number = 0){
  const oldVDOM: IDom = realDOM && realDOM._vDOM;

  if(vDOM && !oldVDOM){
    // console.log('Case: 새로운 노드');
    return vDomToNode(vDOM, container);
  }
  
  if(!vDOM && oldVDOM){
    // console.log('Case: 사라진 노드');
    return container.removeChild(container.childNodes[idx]);
  }
  
  // 컴포넌트 타입의 경우
  if(isComponentType(vDOM)){
    // console.log('Case: 컴포넌트 타입');

    componentCompare(vDOM, oldVDOM, realDOM, idx);
    return;
  }

  // 노드의 타입이 다른경우
  // 두 노드의 타입이 다르면, 이전 트리를 버리고 완전히 새로운 트리를 구축
  if(vDOM.type !== oldVDOM.type) {
    // console.log('Case: 타입이 다른 노드');
    
    return container.replaceChild(createOriginNode(vDOM), container.childNodes[idx]);
  }
  
  // 노드의 타입이 같은 경우
  if(vDOM.type === oldVDOM.type) {
    // type이 text일 경우
    if(vDOM.type === 'TEXT_NODE') {
      // console.log('Case: 텍스트 타입');
      const { textContent: newTextContent } = vDOM.attributes;
      const { textContent: oldTextContent } = oldVDOM.attributes;
  
      if(newTextContent === oldTextContent) return;

      realDOM.textContent = newTextContent;
      injectVDOMInToNode(realDOM, vDOM);
      return;
    }

    // console.log('Case: 타입이 같은 노드');

    // 두 엘리먼트의 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신  
    updateElement(container.childNodes[idx] as Element, vDOM, oldVDOM);

    // 노드의 처리가 끝나면, 이어서 해당 노드의 자식들을 재귀적으로 처리
    for(let i=0; i < getMaxLength(vDOM.children.length, realDOM.childNodes.length); i+=1){
      const vDOMChild = vDOM.children[i];
      const realDOMChild = realDOM.childNodes[i];

      nodeCompare(vDOMChild, container.childNodes[idx], realDOMChild, i);
    }
  }
}

function componentCompare(vDOM: IDom, oldVDOM: IDom, realDOM: INode, idx: number = 0){
  // 과거랑 현재랑 같은 컴포넌트인 경우
  const nextComponentVDOM = getVDOMFromOldComponent(vDOM, oldVDOM);

  nodeCompare(nextComponentVDOM, realDOM.parentNode, realDOM, idx);
}

export default nodeCompare;