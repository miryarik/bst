// import Node from "./node.js";

class Tree {

    constructor(arr) {
        this.root = this.buildTree(arr);
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

let arr = [1,2];

let tree = new Tree(arr);

console.log(tree);
