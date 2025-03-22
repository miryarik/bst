// import Node from "./node.js";

class Tree {
    constructor(arr) {
        // sort the array for tree building
        let sortedArr = arr.toSorted((a, b) => a - b);
        this.root = this.buildTree(sortedArr);
    }

    insert(value, root = this.root) {
        // where insert on a leaf
        if (root == null) {
            return new Node (value);
        }

        // if value is already in tree return
        if (root.data == value) return root;
        
        // if value < data, we insert in the left subtree
        if (value < root.data) {
            root.left = this.insert(value, root.left);
        }
        // ow in the right
        if (value > root.data) {
            root.right = this.insert(value, root.right);
        }

        // return the reference so inserted node is not lost
        return root;
    }

    buildTree(arr) {
        // if there is no array
        if (arr.length == 0) return null;

        // root as mid of array
        const mid = Math.floor(arr.length / 2);
        let root = new Node(arr[mid]);

        // make left subtree from left of mid
        root.left = this.buildTree(arr.slice(0, mid));

        // make right subtree from right of mid
        root.right = this.buildTree(arr.slice(mid + 1));

        return root;
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let arr = [1, 2, 3, 4, 5, 6, 7, 8];

let tree = new Tree(arr);

console.log(prettyPrint(tree.root));
