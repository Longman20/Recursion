class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}
class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree(array) {
    const sorted = [...new Set(array)].sort((a, b) => a - b);
    return this.#build(sorted);
  }
  #build(array) {
    if (array.length === 0) {
      return null;
    }
    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);
    root.left = this.#build(array.slice(0, mid));
    root.right = this.#build(array.slice(mid + 1));
    return root;
  }

  includes(value) {
    let node = this.root;
    while (node !== null) {
      if (value === node.data) {
        return true;
      }
      node = value < node.data ? node.left : node.right;
    }
    return false;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.data) {
        return;
      }
      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  deleteItem(value) {
    this.root = this.#deleteNode(this.root, value);
  }

  #deleteNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.#deleteNode(node.left, value);
      return node;
    } else if (value > node.data) {
      node.right = this.#deleteNode(node.right, value);
      return node;
    }

    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }

    let successor = node.right;
    while (successor.left !== null) {
      successor = successor.left;
    }

    node.data = successor.data;
    node.right = this.#deleteNode(node.right, successor.data);

    return node;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (this.root === null) {
      return;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current.data);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const traverse = (node) => {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };

    traverse(this.root);
  }
  height(value) {
    const findNode = (node) => {
      if (node === null) return null;
      if (value === node.data) return node;
      return value < node.data ? findNode(node.left) : findNode(node.right);
    };

    const calculateHeight = (node) => {
      if (node === null) return -1;
      const leftHeight = calculateHeight(node.left);
      const rightHeight = calculateHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    const target = findNode(this.root);
    if (target === null) return undefined;

    return calculateHeight(target);
  }

  depth(value) {
    let current = this.root;
    let edgeCount = 0;

    while (current !== null) {
      if (value === current.data) {
        return edgeCount;
      }
      current = value < current.data ? current.left : current.right;
      edgeCount++;
    }

    return undefined;
  }
  isBalanced() {
    const checkHeight = (node) => {
      if (node === null) return 0;

      const leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(this.root) !== -1;
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((value) => values.push(value));
    this.root = this.buildTree(values);
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
function randomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}
function printAllOrders(tree) {
  const levelOrder = [];
  const preOrder = [];
  const postOrder = [];
  const inOrder = [];

  tree.levelOrderForEach((v) => levelOrder.push(v));
  tree.preOrderForEach((v) => preOrder.push(v));
  tree.postOrderForEach((v) => postOrder.push(v));
  tree.inOrderForEach((v) => inOrder.push(v));

  console.log("Level order:", levelOrder.join(", "));
  console.log("Pre order:  ", preOrder.join(", "));
  console.log("Post order: ", postOrder.join(", "));
  console.log("In order:   ", inOrder.join(", "));
}

// ====DRIVER SCRIPT ===

const tree = new Tree(randomArray(15, 100));
console.log("=== Initial tree ===");
tree.prettyPrint();

console.log("\nIs balanced?", tree.isBalanced());

console.log("\n=== Traversals (balanced) ===");
printAllOrders(tree);

console.log("\n=== Unbalancing the tree ===");
[101, 150, 200, 250, 300, 350].forEach((value) => tree.insert(value));
tree.prettyPrint();

console.log("\nIs balanced?", tree.isBalanced());

tree.rebalance();
console.log("\n=== After rebalance() ===");
tree.prettyPrint();

console.log("\nIs balanced?", tree.isBalanced());

console.log("\n=== Traversals (rebalanced) ===");
printAllOrders(tree);
