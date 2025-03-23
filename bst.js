// import Node from "./node.js";

class Tree {
    constructor(arr) {
        // sort the array for tree building
        let sortedArr = arr.toSorted((a, b) => a - b);
        this.root = this.buildTree(sortedArr);
    }

    delete(value) {
        let parent = this.root;
        let child = this.root;

        // check if there is only one node
        if (parent.right == null && parent.left == null) return false;

        // find the target child and its parent
        while (child != null && child.data != value) {
            // if value > child => go to right
            if (value > child.data) {
                parent = child;
                child = child.right;
            }
            // and left for value < child
            else {
                parent = child;
                child = child.left;
            }
        }

        if (child.data == value) {
            // now if the value is found on
            
            // a leaf, remove the parents reference to it
            if (child.right == null && child.left == null) {
                if (value < parent.data) parent.left = null;
                else parent.right = null;
            }

            // a node with
            // only right child
            else if (child.left == null && child.right != null) {
                // if value is on right of parent reassign parent.right 
                if (value > parent.data) parent.right = child.right;
                // similar for left
                else parent.left = child.right;
            }

            // only left child
            else if (child.left != null && child.right == null) {
                // if value is on right of parent reassign parent.right 
                if (value > parent.data) parent.right = child.left;
                // similar for left
                else parent.left = child.left;
            }

            else {
                // both children
                // look for the minimum on its right, keep track of its parent
                let min = child.right;
                while (min.left != null) {
                    parent = min;
                    min = min.left;
                }
                
                // over targets value with min
                // delete reference to min
                let minVal = min.data;
                this.delete(minVal);
                child.data = minVal;
            }
        }
    }

    find(value, root = this.root) {
        // binary search

        // there value was not found
        if (root == null) return null;

        // if target is on root return it
        if (root.data == value) return root;

        // if root data < value, value is in right subtree
        if (root.data < value) {
            return this.find(value, root.right);
        } else {
            // otherwise in left subtree
            return this.find(value, root.left);
        }
    }

    insert(value, root = this.root) {
        // insert on a leaf
        if (root == null) {
            return new Node(value);
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

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 0, -1, -4, -6];

let tree = new Tree(arr);

console.log(prettyPrint(tree.root));
