class Node{
    constructor(data,left,right){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree{
    constructor(root,array){
        this.root = root;
        this.array = array;
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);

        node.left = this.buildTree(array, start, mid - 1);
        node.right = this.buildTree(array, mid + 1, end);

        return node;
    }
    insert(value){
        var cur = this.root;
        while(cur!=null){
            if(cur.data >value){
                if(cur.left==null){
                    cur.left = new Node(value,null,null)
                    break;
                }
                cur = cur.left;
            }
            else{
                if(cur.right==null){
                    cur.right = new Node(value,null,null)
                    break;
                }
                cur = cur.right;
            }
        }
        
    }
    delete(value){
        var cur = this.root;
        var past = null;
        while(cur.data!=value){
            if(cur.data >value){
                past = cur;
                cur = cur.left;
            }
            else{
                past =cur;
                cur = cur.right;
            }
        }
        if(cur.left == null && cur.right ==null){
            if(past.left==cur)
                past.left = null;
            else
                past.right =null;
        }//leaf
        else if(cur.left ==null || cur.right == null){
            if(past.left ==cur){
                past.left = cur.left == null?cur.right : cur.left
            }
            if(past.right == cur){
                past.right = cur.left == null?cur.right : cur.left
        }}//one children
        else{
            var next = cur.right;
            if(next.left == null){
                cur.data = next.data
                cur.right = null;
                return
            }
                
            while(true){
                if(next.left == null)
                    break
                past = next
                next = next.left
            }
            past.left=null
            cur.data = next.data;
        }//two children


        
    }
    find(value){
        var cur = this.root;
        while(true){
            if(cur.data > value)
                cur = cur.left;
            else if(cur.data < value)
                cur = cur.right
            else{
                return cur
            }
        }
    }
    levelOrderForEach(callback){
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
        var que = [];
        que.push(this.root);
        while(que.length != 0){
            var node  = que[0]
            callback(node);
            if(node.left !=null)
                que.push(node.left)
            if(node.right !=null)
                que.push(node.right)
            que.splice(0,1)
        }
    }
    inOrderForEach(callback){
        function traverse(root){
            if(root ==null)
                return
            traverse(root.left)
            callback(root)
            traverse(root.right)
        }
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
        traverse(this.root)
        
    }
    preOrderForEach(callback){
        if(typeof callback !== "function")
            throw new Error("Callback requiered")
        function traverse(node){
            if(node==null)
                return
            callback(node)
            traverse(node.left)
            traverse(node.right)
        }
        traverse(this.root)
    }
    postOrderForEach(callback){
        if(typeof callback !== "function")
            throw new Error("Callback requiered")
        function traverse(node){
            if(node==null)
                return
            traverse(node.left)
            traverse(node.right)
            callback(node)
            
        }
        traverse(this.root)
    }
    depth(value){
        var cur = this.root;
        var cnt=0;
        while(true){
            if(cur.data >value){
                cur = cur.left
            }
            else if(cur.data<value)
                cur = cur.right
            cnt++;
            if(cur==null)
                return null
            if(cur.data==value)
                return cnt;
        }
    }
    isBalanced() {
        if (!this.root) return true;
    
        let leftH = this.root.left ? this.height(this.root.left) : 0;
        let rightH = this.root.right ? this.height(this.root.right) : 0;
    
        if (Math.abs(leftH - rightH) > 1) {
            return false;
        }
    
        let leftBalanced = true;
        let rightBalanced = true;
    
        if (this.root.left) {
            let treeL = new Tree(this.root.left);
            leftBalanced = treeL.isBalanced();
        }
    
        if (this.root.right) {
            let treeR = new Tree(this.root.right);
            rightBalanced = treeR.isBalanced();
        }
    
        return leftBalanced && rightBalanced;
    }
    height(root){
        var height=0;
        var que = []
        que.push(root)
        while(que.length !=0){
            var ok=false;
            var node = que[0]
            if(node.left!=null){
                if(ok==false)
                    height++;
                ok = true
                que.push(node.left)
            }
            if(node.right!=null){
                if(ok==false)
                    height++;
                ok = true
                que.push(node.right)
            }
            que.splice(0,1)
        }
        return height
    }
    rebalance(){
        var array = [];
        function traverse(node){
            if(node==null)
                return
            traverse(node.left)
            traverse(node.right)
            array.push(node.data)
        }
        traverse(this.root)
        array = array.toSorted((a, b) => a - b);
        return this.buildTree(array)
    }
    
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node == null) {
      return;
    }
    if (node.right != null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left != null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

var array = [37, 82, 5, 61, 14, 93, 28, 46, 70, 9]
array = array.toSorted((a, b) => a - b);
var tree =new Tree(null,array);


function a(node){
    console.log(node.data )
}

tree.root = tree.buildTree(array)
prettyPrint(tree.root)
console.log("Is balanced: "+tree.isBalanced())


// console.log("PREODER")
// tree.preOrderForEach(a);
// console.log("POSTORDER")
// tree.postOrderForEach(a)
// console.log("INORDER")
// tree.inOrderForEach(a)

tree.insert(101)
tree.insert(200)
tree.insert(103)
prettyPrint(tree.root)
console.log("Is balanced: "+ tree.isBalanced())


tree.root = tree.rebalance();
prettyPrint(tree.root)
console.log("Is balanced: "+ tree.isBalanced())
