import { AttributeType, VDomType } from "../types/jsx";

function jsx(type: VDomType, attributes: AttributeType, ...children: any[]) {
  const childrenElements = children.reduce((acc: any[], child:any) => {
    if (typeof child == null) return acc;
    if (typeof child === "boolean") return acc;

    typeof child === "object"
      ? acc.push(child)
      : acc.push(jsx("TEXT_NODE", { 'textContent': child }));

    return acc;
  }, []);

  return {
    type,
    attributes,
    children: childrenElements.flat()
  }
}

export default jsx;
