import Tree from "./bst.js";

function randomNumbersArray(length = 10) {
    return Array.from(Array(length), () => Math.floor(Math.random() * 100) + 1);
}

let arr = randomNumbersArray(20);

console.log("Creating BST from array:");
console.log(arr);

let tree = new Tree(arr);

console.log("DONE :");
prettyPrint(tree.root);
console.log("Tree is balanced : " + tree.isBalanced());

console.log("Imbalancing by inserting");
while (tree.isBalanced()) {
    let randoms = randomNumbersArray(5);
    randoms.forEach((random) => {
        console.log(random);
        tree.insert(random);
    });
}

prettyPrint(tree.root);
console.log("Tree is balanced : " + tree.isBalanced());

console.log("REBALANCING");
tree.balance();
prettyPrint(tree.root);
console.log("Tree is balanced : " + tree.isBalanced());

// tree.levelOrder(console.log)
// tree.preOrder(console.log)
// tree.inOrder(console.log)
// tree.postOrder(console.log)
