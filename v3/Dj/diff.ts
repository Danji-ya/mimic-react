import { IDom, INode } from "../types/jsx";
import { createOriginNode, isComponentType, updateNode, updateNodeVDOM, vDomToNode } from "./render";

function nodeCompare(vDOM: IDom, container: Node | null , realDOM?: INode , idx: number = 0){
  const oldVDOM: IDom = realDOM && realDOM._vDOM;

  if(vDOM && !oldVDOM){
    console.log('그냥 새로생긴 것');
    return vDomToNode(vDOM, container);
  }
  
  if(!vDOM && oldVDOM){
    console.log('그냥 사라진것');
    return container.removeChild(container.childNodes[idx]);
  }
  
  // 컴포넌트 타입의 경우
  if(isComponentType(vDOM)){
    console.log('컴포넌트 타입이라');

    // TODO: 컴포넌트 타입 처리
    compareComponent();
    return;
  }

  // 엘리먼트의 타입이 다른경우
  if(vDOM.type !== oldVDOM.type) {
    // 두 루트 엘리먼트의 타입이 다르면, React는 이전 트리를 버리고 완전히 새로운 트리를 구축
    console.log('다른 타입이라');
    
    return container.replaceChild(createOriginNode(vDOM), container.childNodes[idx]);
  }
  
  if(vDOM.type === oldVDOM.type) {
    // DOM 엘리먼트의 타입이 같은 경우
    console.log('같은 타입이라');

    // type이 text일 경우
    if(vDOM.type === 'TEXT_NODE') {
      const { newTextContent } = vDOM.attributes;
      const { oldTextContent } = oldVDOM.attributes;
  
      if(newTextContent === oldTextContent) return;
      
      return container.replaceChild(createOriginNode(vDOM), container.childNodes[idx]);
    }
    
    // 두 엘리먼트의 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신  
    updateNode(container.childNodes[idx] as Element, vDOM, oldVDOM);

    // DOM 노드의 처리가 끝나면, React는 이어서 해당 노드의 자식들을 재귀적으로 처리
    for(let i=0; i < getMaxLength(vDOM.children.length, realDOM.childNodes.length); i+=1){
      const vDOMChild = vDOM.children[i];
      const realDOMChild = realDOM.childNodes[i];

      nodeCompare(vDOMChild, container.childNodes[idx], realDOMChild, i);
    }
  }
}

function compareComponent(){
  console.log('TODO');
}

const getMaxLength = (first: number = 0, second: number = 0) => Math.max(first, second);

export default nodeCompare;