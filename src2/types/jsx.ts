import Component from "../Dj/Component";

type AttributeType = Record<string, any>;

interface IDom {
  type: VDomType, 
  attributes: AttributeType, 
  children: any[],
}

interface IComponent {
  new (props: AttributeType): Component;
}

type VDomType = IComponent | string;


export {
  AttributeType,
  IDom,
  VDomType
}