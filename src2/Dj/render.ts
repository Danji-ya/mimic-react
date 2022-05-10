import { IDom } from "../types/jsx";

function render(vDOM: IDom, container: Element | null, oldDOM?: IDom) {
  vDomToNode(vDOM, container);
}

function vDomToNode(vDOM: IDom, container: Element | null, oldDOM?: IDom) {
  originNode(vDOM, container, oldDOM);
}


function originNode(vDOM: IDom, container: Element | null, oldDOM?: IDom) {
  let newNode: any = null;

  if (vDOM.type === 'TEXT_NODE') {
    const {textContent} = vDOM.attributes;

    newNode = document.createTextNode(textContent);
  } else {
    newNode = vDOM.type === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(vDOM.type);

    if(!(newNode instanceof DocumentFragment)) {
      updateNode(newNode, vDOM);
    }
  }

  vDOM.children.forEach((child: any) => vDomToNode(child, newNode));
  
  // 실제 부착
  container?.appendChild(newNode);
}

function updateNode(newNode: any, vDOM: any){
    // 이벤트나 속성 처리
    Object.entries(vDOM.attributes || {}).forEach(([key, value]) => {
      newNode.setAttribute(key, value);
    });
}

export default render;