type TAttribute = Record<string, any>;

interface IDom {
  type: string, 
  attributes: TAttribute, 
  children: any[],
}

export {
  TAttribute,
  IDom
}