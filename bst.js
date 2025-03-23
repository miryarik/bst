import Node from "./node.js";

export default class Tree {
    constructor(arr) {
        // sort the array for tree building
        let sortedArr = arr.toSorted((a, b) => a - b);
        this.root = this.buildTree(sortedArr);
    }

    balance() {
        // in-order traversal return sorted nodes
        let nodes = [];
        this.inOrder((node) => {
            nodes.push(node.data);
        });

        // now use this array to build the tree again
        this.root = this.buildTree(nodes);
    }

    isBalanced() {
        // get all the nodes
        // get height for each nodes left and right children
        // if for any node, the difference between height is more than 1
        // return false
        // ow return true

        let nodes = [];
        this.levelOrder((node) => {
            nodes.push(node);
        });

        let result = nodes.every((node) => {
            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);

            return Math.abs(leftHeight - rightHeight) <= 1;
        });

        return result;
    }

    depth(node) {
        // perform a binary search from the top
        // if the node value is smaller than the root
        // look in the left
        // if the node value is larger than the root
        // look in the right

        let current = this.root;
        let depth = 0;
        while (current != null && current != node) {
            // either we find it or it doesnt exist

            if (node.data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }

            depth++;
        }

        if (current == node) return depth;
        else return 0;
    }

    height(root = this.root) {
        // if there is nothing or no children return 0
        if (root == null || (root.left == null && root.right == null)) return 0;

        let leftHeight = 0;
        let rightHeight = 0;
        // if there is a left child return 1 + height of left
        if (root.left != null) {
            leftHeight = 1 + this.height(root.left);
        }
        // same for right
        if (root.right != null) {
            rightHeight = 1 + this.height(root.right);
        }

        // return the max of two
        return Math.max(leftHeight, rightHeight);
    }

    postOrder(callback, root = this.root) {
        // return if there is nothing
        // preorder on left child
        // preorder on right child
        // process root

        if (root == null) return;

        this.postOrder(callback, root.left);
        this.postOrder(callback, root.right);
        callback(root);
    }

    inOrder(callback, root = this.root) {
        // return if there is nothing
        // preorder on left child
        // process root
        // preorder on right child

        if (root == null) return;

        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right);
    }

    preOrder(callback, root = this.root) {
        // return if there is nothing
        // process root
        // preorder on left child
        // preorder on right child

        if (root == null) return;

        callback(root);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }

    levelOrder(callback) {
        let queue = [this.root];

        while (queue[0] != null) {
            // for each node in the queue
            // call on it
            const first = queue.shift();
            callback(first);

            // push its left and right children to queue
            if (first.left) queue.push(first.left);
            if (first.right) queue.push(first.right);
        }
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
            } else {
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
