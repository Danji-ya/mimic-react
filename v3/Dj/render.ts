import { IDom } from "../types/jsx";

function render(vDOM: IDom, container: Node, oldDOM?: IDom) {
  vDomToNode(vDOM, container);
}

export function vDomToNode(vDOM: IDom, container: Node, oldDOM?: IDom) {

  if(isComponentType(vDOM)){
    componentNode(vDOM, container, oldDOM);
  } else {
    originNode(vDOM, container, oldDOM);
  }
}

export function componentNode(vDOM: IDom, container: Node, oldDOM?: IDom) {
  if(typeof vDOM.type === 'string') return;
  
  const C =  vDOM.type;
  
  const component = new C(vDOM.attributes || {});
  const componentVDOM = component.render();
  componentVDOM.DJ_COMPONENT = component;

  vDomToNode(componentVDOM, container, oldDOM);
}


export function originNode(vDOM: IDom, container: Node, oldDOM?: IDom) {
  let newNode: any = createOriginNode(vDOM);

  // 실제 부착
  container?.appendChild(newNode);
}


export function createOriginNode(vDOM: IDom) {
  let newNode: any = null;
  const vDOMType = String(vDOM.type);

  if (vDOMType === 'TEXT_NODE') {
    const {textContent} = vDOM.attributes;

    newNode = document.createTextNode(textContent);
  } else {
    newNode = vDOMType === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(vDOMType);

    if(!(newNode instanceof DocumentFragment)) {
      updateNode(newNode, vDOM);
    }
  }

  vDOM.children.forEach((child: any) => vDomToNode(child, newNode));
  
  
  // 가장 최상단의 Node일 경우 해당 dom을 저장
  if(vDOM.DJ_COMPONENT) {
    vDOM.DJ_COMPONENT._DOM = newNode;
    vDOM.DJ_COMPONENT._vDOM = vDOM;
  }

  return newNode;
}



export function updateNode(newNode: HTMLElement, vDOM: IDom){
    // 이벤트나 속성 처리
    Object.entries(vDOM.attributes || {}).forEach(([key, value]) => {
      if(!value) return;

      if(key.startsWith('on')){
        const eventType = key.slice(2).toLocaleLowerCase();
        newNode.addEventListener(eventType, value);

        return;
      }
      
      newNode.setAttribute(key, value);
    });
}

export const isComponentType = (vDOM: IDom)  => Object.getPrototypeOf(vDOM.type).DJ_COMPONENT;

export default render;