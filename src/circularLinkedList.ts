class Node implements INode {
  constructor(
    public value: string,
    public next: Node | null = null,
  ) {}
}

export class CircularLinkedList implements IList {
  private head: Node | null = null;
  private size: number = 0;

  private validateIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }
  }

  length(): number {
    return this.size;
  }

  append(element: string): void {
    const newNode = new Node(element);

    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next!;
      }
      current.next = newNode;
      newNode.next = this.head;
    }
    this.size++;
  }

  insert(element: string, index: number): void {
    this.validateIndex(index);
    const newNode = new Node(element);

    if (index === 0) {
      newNode.next = this.head;
      let last = this.head!;
      while (last.next !== this.head) {
        last = last.next!;
      }
      last.next = newNode;
      this.head = newNode;
    } else {
      let current = this.head!;
      for (let i = 0; i < index - 1; i++) {
        current = current.next!;
      }
      newNode.next = current.next;
      current.next = newNode;
    }
    this.size++;
  }

  delete(index: number): string {
    this.validateIndex(index);
    let value: string;

    if (this.size === 1) {
      value = this.head!.value;
      this.head = null;
    } else if (index === 0) {
      value = this.head!.value;
      let last = this.head!;
      while (last.next !== this.head) {
        last = last.next!;
      }
      last.next = this.head!.next;
      this.head = this.head!.next;
    } else {
      let current = this.head!;
      for (let i = 0; i < index - 1; i++) {
        current = current.next!;
      }
      value = current.next!.value;
      current.next = current.next!.next;
    }

    // this.size--;
    return value;
  }

  deleteAll(element: string): void {
    if (!this.head) return;

    let current: Node = this.head;
    let prev: Node | null = null;
    let count = this.size;

    while (count-- > 0 && current) {
      const next = current.next!;
      let shouldDelete = false;

      if (current.value === element) {
        shouldDelete = true;

        if (current === this.head) {
          this.head = next === current ? null : next;
        }

        if (prev) {
          prev.next = next;
        }

        this.size--;
      }

      if (!shouldDelete) {
        prev = current;
      }

      current = next;
    }

    if (prev && this.head) {
      prev.next = this.head;
    } else {
      this.head = null;
      this.size = 0;
    }
  }

  get(index: number): string {
    this.validateIndex(index);
    let current = this.head!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current.value;
  }

  clone(): CircularLinkedList {
    const newList = new CircularLinkedList();
    if (!this.head) return newList;

    let current = this.head;
    do {
      newList.append(current.value);
      current = current.next!;
    } while (current !== this.head);

    return newList;
  }

  reverse(): void {
    if (!this.head || this.size === 1) return;

    let prev: Node | null = null;
    let current = this.head;
    let next: Node | null;
    const initialHead = this.head;

    do {
      next = current.next!;
      current.next = prev;
      prev = current;
      current = next;
    } while (current !== initialHead);

    this.head = prev;
    initialHead.next = this.head;
  }

  findFirst(element: string): number {
    if (!this.head) return -1;

    let index = 0;
    let current = this.head;
    do {
      if (current.value === element) return index;
      current = current.next!;
      index++;
    } while (current !== this.head);

    return -1;
  }

  findLast(element: string): number {
    if (!this.head) return -1;

    let lastIndex = -1;
    let index = 0;
    let current = this.head;
    do {
      if (current.value === element) lastIndex = index;
      current = current.next!;
      index++;
    } while (current !== this.head);

    return lastIndex;
  }

  clear(): void {
    this.head = null;
    this.size = 0;
  }

  extend(elements: IList): void {
    if (elements instanceof CircularLinkedList) {
      let current = elements.head;
      if (!current) return;

      do {
        this.append(current.value);
        current = current.next!;
      } while (current !== elements.head);
    }
  }
}
