import { IDom, INode } from "../types/jsx";
import Component from "./Component";

export function vDomToNode(vDOM: IDom, container: Node, oldDOM?: IDom) {
  if(isComponentType(vDOM)){
    componentNode(vDOM, container, oldDOM);
  } else {
    originNode(vDOM, container, oldDOM);
  }
}

export function componentNode(vDOM: IDom, container: Node, oldDOM?: IDom) {
  const componentVDOM = createComponent(vDOM);
  
  vDomToNode(componentVDOM, container, oldDOM);
}

export function createComponent(vDOM: IDom) {
  if(typeof vDOM.type === 'string') return;

  const C =  vDOM.type;
  const component = new C(vDOM.attributes || {});
  const componentVDOM = component.render();
  injectComponentToVDOM(componentVDOM, component);

  return componentVDOM;
}

export function getVDOMFromOldComponent(vDOM: IDom, oldVDOM: IDom){
  const oldComponent = oldVDOM.DJ_COMPONENT;
  oldComponent.updateProps(vDOM.attributes);
  
  const nextComponentVDOM = oldComponent.render();
  injectComponentToVDOM(nextComponentVDOM, oldComponent);

  // 최신 vDOM 업데이트
  injectVDOMInToNode(oldComponent._DOM, nextComponentVDOM);

  return nextComponentVDOM;
}

export function originNode(vDOM: IDom, container: Node, oldDOM?: IDom) {
  let newNode: Node = createOriginNode(vDOM);

  // 실제 부착
  container?.appendChild(newNode);
}

export function createOriginNode(vDOM: IDom) {
  let newNode: INode = null;
  const vDOMType = String(vDOM.type);

  if (vDOMType === 'TEXT_NODE') {
    const {textContent} = vDOM.attributes;

    newNode = document.createTextNode(textContent);
    injectVDOMInToNode(newNode, vDOM);
  } else {
    newNode = vDOMType === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(vDOMType);

    if(!(newNode instanceof DocumentFragment)) {
      updateElement(newNode as Element, vDOM);
    }
  }

  vDOM.children.forEach((child: any) => vDomToNode(child, newNode));
  
  return newNode;
}

export function updateElement(ele: Element, vDOM: IDom, oldDOM?: IDom) {
  const newProps = vDOM.attributes || {};
  const oldProps = oldDOM && oldDOM.attributes || {};

  // 새로운 이벤트나 속성 처리
  Object.entries(newProps).forEach(([key, value]) => {
    const newProp = newProps[key];
    const oldProp = oldProps[key];

    if(newProp === oldProp) return;
    if(!isSpecialAttribute(key) && !value) return;
    
    if(key.startsWith('on')){
      const eventType = key.slice(2).toLowerCase();
      ele.addEventListener(eventType, value);

      if(oldProp) ele.removeEventListener(eventType, oldProp);
      
      return;
    }

    ele.setAttribute(key, value);

    if(isBooleanAttribute(key) && !value){
      ele.removeAttribute(key);
    }
  });

  // 기존 이벤트나 속성 삭제 처리
  Object.entries(oldProps).forEach(([key, value]) => {
    const newProp = newProps[key];

    if(newProp != null) return;
    
    if(key.startsWith('on')){
      const eventType = key.slice(2).toLowerCase();
      ele.removeEventListener(eventType, value);
      
      return;
    }

    ele.removeAttribute(key);
  });

  injectVDOMInToNode(ele, vDOM);
}


export const getMaxLength = (first: number = 0, second: number = 0) => Math.max(first, second);

export const isComponentType = (vDOM: IDom)  => Object.getPrototypeOf(vDOM.type).DJ_COMPONENT;

// 이후 비교를 위한 과거 노드의 정보를 가진 vDOM객체 삽입
export const injectVDOMInToNode = (node: INode, vDOM: IDom) => {
  node._vDOM = vDOM;

  injectRealDOMToComponent(vDOM.DJ_COMPONENT, node);
}

// 가장 최상단의 Node(컴포넌트)일 경우 해당 DOM을 저장
export const injectRealDOMToComponent = (component: Component, realDOM: INode) => {
  if(component) component._DOM = realDOM;
}

// 컴포넌트 경우 이후 비교를 위해 vDOM 객체에 과거의 component 정보를 저장
export const injectComponentToVDOM = (componentVDOM: IDom, component: Component) => {
  componentVDOM.DJ_COMPONENT = component;
}

export const isSpecialAttribute = (attribute: string) => attribute === 'value' || isBooleanAttribute(attribute);

export const isBooleanAttribute = (attribute: string) => attribute === 'checked' || attribute === 'disabled';