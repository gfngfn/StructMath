///<reference path="token.ts" />

enum Type { Empty, Ord, Un, Bin, LR, Op }

class Tree {
  token_type: Type;
  content: string;
  items: Tree[];
  parent: Tree;
  right_sibling: Tree;
  left_sibling: Tree;

  constructor(tt: Type, cont: string) {
    this.token_type = tt;
    this.content = cont;
    this.items = [];
    this.parent = null;
    this.right_sibling = null;
    this.left_sibling = null;
  }

  // recursive process of translation from tree to html
  tree_to_innerhtml(mt: MainTree): string {
    var res: string;

    if (this.token_type == Type.Empty) {
      if (this == mt.target) {
        if (user_input.stock.length == 0) {
          res = "<span class='empty-target-of-tree'>|</span>";
        } else {
          res = "<span class='empty-target-of-tree'>|<span class= 'sequence'>" + user_input.stock + "</span>|</span>";
        }
      } else {
        res = "<span class='empty-box-of-tree'>|</span>";
      }
    } else {
      if (this == mt.target) {
        res = "<div class='target-of-tree'>";
      } else {
        res = "<div class='box-of-tree'>";
      }
      switch (this.token_type) {
        case Type.Ord:
          res += content_to_string(this.content);
          break;
        case Type.Un:
          res = content_to_string(this.content);
          res += this.items[0].tree_to_innerhtml(mt);
          break;
        case Type.Op:
          res = content_to_string(this.content);
          res += this.items[0].tree_to_innerhtml(mt);
          break;
        case Type.Bin:
          res += this.items[0].tree_to_innerhtml(mt);
          res += content_to_string(this.content);
          res += this.items[1].tree_to_innerhtml(mt);
          break;
        default:
          console.log("[GFN] other Type.");//<<test>>
      }
      res += "</div>";
      if (this == mt.target && user_input.stock.length != 0) {
        res += "<span class='sequence'>" + user_input.stock + "</span>";
      }
    }
    return res;
  }

  is_leaf(): boolean { return (this.items.length == 0); }

  delete_to_empty(): void {
    this.token_type = Type.Empty;
    this.content = null;
    this.items = [];
    return;
  }

  add_child(ch: Tree): void {
    ch.parent = this;
    if (this.is_leaf()) {
      this.items.push(ch);
    } else {
      ch.left_sibling = this.items[this.items.length - 1];
      (this.items[this.items.length - 1]).right_sibling = ch;
      this.items.push(ch);
    }
  }

}

// tree including the information for the location of input target
class MainTree extends Tree {
  target: Tree;

  constructor(tt: Type, cont: string) {
    super(tt, cont);
    this.target = this;
  }

  main_tree_to_innerhtml(): string {
    return this.tree_to_innerhtml(this);
  }

  // process of addition of new node
  send(ti: TokenInfo): void {
    var lc: Tree;
    var rc: Tree;

    if (this.target.token_type == Type.Empty) {

      switch (ti.token_type) {
        case Type.Ord:
          this.target.token_type = Type.Ord;
          this.target.content = ti.content;
          break;
        case Type.Bin:
          this.target.token_type = Type.Bin;
          this.target.content = ti.content;
          lc = new Tree(Type.Empty, null);
          rc = new Tree(Type.Empty, null);
          this.target.add_child(lc);
          this.target.add_child(rc);
          this.target = lc;
          break;
        default:
          console.log("[GFN] other than Ord or Bin.");//<<test>>
          break;
      }

    } else {

      switch (ti.token_type) {
        case Type.Ord:
          lc = new Tree(this.target.token_type, this.target.content);
          rc = new Tree(Type.Ord, ti.content);
          this.target.delete_to_empty();
          this.target.token_type = Type.Bin;
          this.target.content = "~concat";
          this.target.add_child(lc);
          this.target.add_child(rc);
          break;
        case Type.Bin:
          lc = new Tree(this.target.token_type, this.target.content);
          rc = new Tree(Type.Empty, null);
          this.target.delete_to_empty();
          this.target.token_type = Type.Bin;
          this.target.content = ti.content;
          this.target.add_child(lc);
          this.target.add_child(rc);
          this.target = rc;
          break;
        default:
          break;
      }
      console.log("[GFN] non-Empty target.");//<<test>>
    }
  }
}
