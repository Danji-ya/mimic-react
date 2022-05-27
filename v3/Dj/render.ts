import { IDom } from "../types/jsx";
import { vDomToNode } from "./utils";

function render(vDOM: IDom, container: Node) {
  vDomToNode(vDOM, container);
}

export default render;