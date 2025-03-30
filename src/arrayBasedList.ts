export class ArrayBasedList implements IList {
  items: string[];

  constructor() {
    this.items = [];
  }

  private validateIndex(index: number): void | never {
    if (index < 0 || index >= this.items.length) {
      throw new Error('Index out of bounds');
    }
  }

  length(): number {
    return this.items.length;
  }

  append(element: string): void {
    this.items.push(element);
  }

  insert(element: string, index: number): void {
    this.validateIndex(index);
    this.items.splice(index, 0, element);
  }

  delete(index: number): string {
    this.validateIndex(index);
    return this.items.splice(index, 1)[0];
  }

  deleteAll(element: string): void {
    this.items = this.items.filter((item) => item !== element);
  }

  get(index: number): string {
    this.validateIndex(index);
    return this.items[index];
  }

  clone(): ArrayBasedList {
    const newList = new ArrayBasedList();
    newList.items = [...this.items];
    return newList;
  }

  reverse(): void {
    this.items.reverse();
  }

  findFirst(element: string): number {
    return this.items.indexOf(element);
  }

  findLast(element: string): number {
    return this.items.lastIndexOf(element);
  }

  clear(): void {
    this.items = [];
  }

  extend(elements: ArrayBasedList): void {
    this.items.push(...elements.items);
  }
}
