import { IDom } from "../types/jsx";
import { createOriginNode, isComponentType, vDomToNode } from "./render";

// TODO: 경우의 수 테스트

// TODO: 컴포넌트 타입 처리

// TODO: 기존 렌더 attribute부분도 checked와 같은 속성 값 예외 처리

function nodeCompare(vDOM: IDom, container: Node | null , oldDOM?: IDom, idx: number = 0){

  if(vDOM && !oldDOM){
    console.log('그냥 새로생긴 것');
    return vDomToNode(vDOM, container);
  }
  
  if(!vDOM && oldDOM){
    console.log('그냥 사라진것');
    return container.removeChild(container.childNodes[idx]);
  }
  
  // 엘리먼트의 타입이 다른경우
  if(vDOM.type !== oldDOM.type) {
    // 두 루트 엘리먼트의 타입이 다르면, React는 이전 트리를 버리고 완전히 새로운 트리를 구축
    console.log('다른 타입이라');

    return container.replaceChild(createOriginNode(vDOM), container.childNodes[idx]);
  }

  // type이 function(컴포넌트)   // 같은 타입의 컴포넌트 엘리먼트
  if(isComponentType(vDOM)){
    console.log('component Type');
    return;
  }

  // type이 text일 경우
  if(vDOM.type === 'TEXT_NODE' && oldDOM.type === 'TEXT_NODE') {
    console.log('text 타입인 경우');
    const { newTextContent } = vDOM.attributes;
    const { oldTextContent } = oldDOM.attributes;

    if(newTextContent === oldTextContent) return;
    
    return container.replaceChild(createOriginNode(vDOM), container.childNodes[idx]);
  }
  
  if(vDOM.type === oldDOM.type) {
    // DOM 엘리먼트의 타입이 같은 경우
    console.log('같은 타입이라');
    
    // 두 엘리먼트의 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신  
    updateNode(container.childNodes[idx] as HTMLElement, vDOM, oldDOM);

    // DOM 노드의 처리가 끝나면, React는 이어서 해당 노드의 자식들을 재귀적으로 처리
    for(let i=0; i < getMaxLength(vDOM.children.length, oldDOM.children.length); i+=1){
      const newDomChild = vDOM.children[i];
      const oldDomChild = oldDOM.children[i];

      nodeCompare(newDomChild, container.childNodes[idx], oldDomChild, i);
    }
  }
}

function updateNode(newNode: HTMLElement ,vDOM: IDom, oldDOM?: IDom) {
  // 새로운 이벤트나 속성 처리
  Object.entries(vDOM.attributes || {}).forEach(([key, value]) => {
    const newProp = vDOM.attributes[key];
    const oldProp = oldDOM.attributes[key];

    if(newProp === oldProp) return;
    
    if(key.startsWith('on')){
      const eventType = key.slice(2).toLowerCase();
      newNode.addEventListener(eventType, value);
      
      return;
    }
    newNode.setAttribute(key, value);
  });

  // 기존 이벤트나 속성 삭제 처리
  Object.entries(oldDOM.attributes || {}).forEach(([key, value]) => {
    const newProp = vDOM.attributes[key];

    if(newProp != null) return;
    
    if(key.startsWith('on')){
      const eventType = key.slice(2).toLowerCase();
      newNode.removeEventListener(eventType, value);
      
      return;
    }
    newNode.removeAttribute(key);
  });
}

const getMaxLength = (first: number = 0, second: number = 0) => Math.max(first, second);

export default nodeCompare;