# Binary Search Tree

A balanced binary search tree (BST) implementation in vanilla JavaScript.
## Features

- Create a balanced BST from an array with `new Tree(array)`
- Tree balancing operations:
  - `balance()` - Rebalance an unbalanced tree
  - `isBalanced()` - Check if the tree is balanced
- Node operations:
  - `insert(value)` - Insert a new value into the tree
  - `delete(value)` - Remove a value from the tree
  - `find(value)` - Find a node by its value
- Tree metrics:
  - `height(node)` - Get the height of a node (longest path to a leaf)
  - `depth(node)` - Get the depth of a node (distance from root)
- Tree traversal methods:
  - `levelOrder(callback)` - Breadth-first traversal
  - `preOrder(callback)` - Root → Left → Right traversal
  - `inOrder(callback)` - Left → Root → Right traversal (returns sorted values)
  - `postOrder(callback)` - Left → Right → Root traversal

## Usage Example

```javascript
import Tree from "./bst.js";

// Create a tree from an array
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

// Check if tree is balanced
console.log(tree.isBalanced()); // true

// Insert new values
tree.insert(100);
tree.insert(200);
tree.insert(300);

// Check balance after insertions
console.log(tree.isBalanced()); // false

// Rebalance the tree
tree.balance();
console.log(tree.isBalanced()); // true

// Find a node
const node = tree.find(100);
console.log(node);

// Get height and depth
console.log(tree.height(node));
console.log(tree.depth(node));

// Traverse the tree (example with inOrder)
tree.inOrder((node) => {
  console.log(node.data);
});
```

## Implementation Details

The implementation consists of two classes:
- `Node`: Represents a single node in the tree with data, left and right child references
- `Tree`: Contains methods to build and manipulate the binary search tree

The tree is created from an array by:
1. Sorting the array
2. Taking the middle element as the root
3. Recursively building the left subtree from elements less than the root
4. Recursively building the right subtree from elements greater than the root
