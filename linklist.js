class Node {
  constructor(value = null) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return node;
  }
  prepend(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return node;
  }
  size() {
    return this.length;
  }
  headValue() {
    return this.head ? this.head.value : undefined;
  }
  tailValue() {
    return this.tail ? this.tail.value : undefined;
  }
  at(index) {
    if (index < 0 || index >= this.length) return undefined;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current ? current.value : undefined;
  }
  pop() {
    if (!this.head) return undefined; // empty list
    const removed = this.head; // node to remove
    this.head = this.head.next; // advance head
    if (!this.head) this.tail = null; // list became empty
    this.length--; // update length
    removed.next = null; // detach node
    return removed.value; // return removed value
  }
  contains(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }
  findIndex(value) {
    let index = 0;
    let current = this.head;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.length) {
      throw new RangeError("Index out of bounds");
    }
    if (values.length === 0) return;

    const nextNode =
      index === this.length
        ? null
        : index === 0
          ? this.head
          : (() => {
              let cur = this.head;
              for (let i = 1; i < index; i++) cur = cur.next;
              return cur.next;
            })();

    let prev =
      index === 0
        ? null
        : index === this.length
          ? this.tail
          : (() => {
              let cur = this.head;
              for (let i = 1; i < index; i++) cur = cur.next;
              return cur;
            })();

    let firstNew = null;
    let lastNew = null;
    for (const val of values) {
      const node = new Node(val);
      if (!firstNew) firstNew = node;
      if (lastNew) lastNew.next = node;
      lastNew = node;
    }

    if (prev === null) {
      lastNew.next = this.head;
      this.head = firstNew;
    } else {
      lastNew.next = prev.next;
      prev.next = firstNew;
    }

    if (index === this.length) this.tail = lastNew;

    this.length += values.length;
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) {
      throw new RangeError("Index out of bounds");
    }

    let removedNode;
    if (index === 0) {
      removedNode = this.head;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
    } else {
      let prev = this.head;
      for (let i = 1; i < index; i++) prev = prev.next;
      removedNode = prev.next;
      prev.next = removedNode.next;
      if (removedNode === this.tail) this.tail = prev;
    }

    this.length--;
    removedNode.next = null;
    return removedNode.value;
  }
  toString() {
    if (!this.head) return "";

    let result = "";
    let current = this.head;

    while (current) {
      result += `( ${current.value} ) -> `;
      current = current.next;
    }

    result += "null";
    return result;
  }
}

export { Node, LinkedList };
