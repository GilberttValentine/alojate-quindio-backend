export const deleteDuplicatedElementsOfNumericArray = (array: number[]) => (array.filter((item: any, index: any) => { return array.indexOf(item) === index }))

