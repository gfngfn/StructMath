///<reference path="token.ts" />

enum Type { Empty, Ord, Un, Bin, LR, Op, Rel }

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
        if (user_input.state != InputState.Sequence) {
          switch (user_input.sending) {
            case SendingState.Normal:
              res = "<span class='empty-target-of-tree'>|</span>";
              break;
            case SendingState.Exchange:
              res = "<span class='empty-target-of-tree-exchange'>|</span>";
              break;
            case SendingState.InsertLeft:
              res = "<span class='empty-target-of-tree-insert-left'>|</span>";
              break;
          }
        } else {
          switch (user_input.sending) {
            case SendingState.Normal:
              res = "<span class='empty-target-of-tree'>|<span class= 'sequence'>" + user_input.stock + "</span>|</span>";
              break;
            case SendingState.Exchange:
              res = "<span class='empty-target-of-tree-exchange'>|<span class= 'sequence'>" + user_input.stock + "</span>|</span>";
              break;
            case SendingState.InsertLeft:
              res = "<span class='empty-target-of-tree-insert-left'>|<span class= 'sequence'>" + user_input.stock + "</span>|</span>";
              break;
          }
        }
      } else {
        res = "<span class='empty-box-of-tree'>|</span>";
      }
      if (this.parent != null) { if (this.parent.items[0] != this && this.parent.items[1] != this) { res += "*"; } }//<<test>>

    } else {

      res = "";
      if (this == mt.target && user_input.state == InputState.Sequence && user_input.sending == SendingState.InsertLeft) {
        res += "<span class='sequence'>" + user_input.stock + "</span>";
      }
      if (this == mt.target) {
        switch (user_input.sending) {
          case SendingState.Normal:
            res += "<div class='target-of-tree'>";
            break;
          case SendingState.Exchange:
            res += "<div class='target-of-tree-exchange'>";
            break;
          case SendingState.InsertLeft:
            res += "<div class='target-of-tree-insert-left'>";
            break;
        }
      } else {
        res += "<div class='box-of-tree'>";
      }
      switch (this.token_type) {
        case Type.Ord:
          res += content_to_string(this.content);
          break;
        case Type.Un:
        case Type.Op:
          res += content_to_string(this.content);
          if (this == mt.target && user_input.state == InputState.Sequence && user_input.sending == SendingState.Exchange) {
            res += "<span class='sequence'>" + user_input.stock + "</span>";
          }
          res += this.items[0].tree_to_innerhtml(mt);
          break;
        case Type.Bin:
        case Type.Rel:
          res += this.items[0].tree_to_innerhtml(mt);
          res += content_to_string(this.content);
          if (this == mt.target && user_input.state == InputState.Sequence && user_input.sending == SendingState.Exchange) {
            res += "<span class='sequence'>" + user_input.stock + "</span>";
          }
          res += this.items[1].tree_to_innerhtml(mt);
          break;
        default:
          console.log("[GFN] other Type.");//<<test>>
      }
      res += "</div>";
      if (this == mt.target && user_input.state == InputState.Sequence && user_input.sending == SendingState.Normal) {
        res += "<span class='sequence'>" + user_input.stock + "</span>";
      }
      if (this.parent != null) { if (this.parent.items[0] != this && this.parent.items[1] != this) { res += "*"; } }//<<test>>
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
    return;
  }

}

function copy_tree(newtr: Tree, oldtr: Tree): void {
  var i: number;

  newtr.token_type = oldtr.token_type
  newtr.content = oldtr.content;
  newtr.items = [];
  for (i = 0; i < oldtr.items.length; i++) {
    newtr.add_child(oldtr.items[i]);
  }
  return;
}

// tree including the information for the location of input target
class MainTree extends Tree {
  target: Tree;
  status: HTMLElement;

  constructor(tt: Type, cont: string, stt: HTMLElement) {
    super(tt, cont);
    this.target = this;
    this.status = stt;
  }

  log_status(sttcont: string): void {
    this.status.innerHTML = sttcont;
    return;
  }

  // display as html
  main_tree_to_innerhtml(): string {
    return this.tree_to_innerhtml(this);
  }

  // move to the parent node
  press_space(): void {
    if (this.target.parent != null) {
      this.target = this.target.parent;
    }
  }

  // move to the rightest child node
  press_enter(): void {
    if (!this.target.is_leaf()) {
      this.target = this.target.items[this.target.items.length - 1];
    }
  }

  // move target to left or inner
  left(): void {
    var temp_tree: Tree;

    if (!this.target.is_leaf()) {
      this.target = this.target.items[this.target.items.length - 1];
    } else {
      temp_tree = this.target;
      while (true) {
        if (temp_tree.left_sibling != null) {
          this.target = temp_tree.left_sibling;
          break;
        }
        if (temp_tree.parent == null) {
          break;
        }
        temp_tree = temp_tree.parent;
      }
    }
  }

  // move target to left sibling
  left_jump(): void {
    if (this.target.left_sibling != null) {
      this.target = this.target.left_sibling;
    }
  }

  // move target to right or outer
  right(): void {
    var temp_tree: Tree;

    if (this.target.right_sibling != null) {
      temp_tree = this.target.right_sibling;
      while (!temp_tree.is_leaf()) {
        temp_tree = temp_tree.items[0];
      }
      this.target = temp_tree;
    } else {
      if (this.target.parent != null) {
        this.target = this.target.parent;
      }
    }
  }

  // move target to right sibling
  right_jump(): void {
    if (this.target.right_sibling != null) {
      this.target = this.target.right_sibling;
    }
  }

  // delete content of target
  press_backspace(): void {
    if (this.target.token_type != Type.Empty) {
      this.target.delete_to_empty();
    } else {
      if (this.target.parent != null) {
        if (this.target.parent.items.length == 1) {
          this.target = this.target.parent;
          this.target.delete_to_empty();
        } else if (this.target.parent.items.length == 2) {
          this.target = this.target.parent;
          copy_tree(this.target, this.target.items[0]);
        }
      }
    }
  }

  // process of addition of new node
  send(ti: TokenInfo): void {
    var lc: Tree;
    var rc: Tree;
    var rcc: Tree;

    if (this.target.token_type == Type.Empty) {
      // when target is Empty

      switch (ti.token_type) {
        case Type.Ord:
          this.target.token_type = Type.Ord;
          this.target.content = ti.content;
          break;
        case Type.Un:
          this.target.token_type = Type.Un;
          this.target.content = ti.content;
          lc = new Tree(Type.Empty, null);
          this.target.add_child(lc);
          this.target = lc;
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
        case Type.Rel:
          this.target.token_type = Type.Rel;
          this.target.content = ti.content;
          lc = new Tree(Type.Empty, null);
          rc = new Tree(Type.Empty, null);
          this.target.add_child(lc);
          this.target.add_child(rc);
          this.target = lc;
          break;
        default:
          console.log("[GFN] other Type. (in 'when target is Empty')");//<<test>>
          break;
      }

    } else {
      // when target is not Empty

      switch (ti.token_type) {
        case Type.Ord:
          lc = new Tree(Type.Empty, null);
          copy_tree(lc, this.target);
          rc = new Tree(Type.Ord, ti.content);
          this.target.delete_to_empty();
          this.target.token_type = Type.Bin;
          this.target.content = "~concat";
          this.target.add_child(lc);
          this.target.add_child(rc);
          break;
        case Type.Un:
          lc = new Tree(Type.Empty, null);
          copy_tree(lc, this.target);
          rc = new Tree(Type.Un, ti.content);
          rcc = new Tree(Type.Empty, null);
          rc.add_child(rcc);
          this.target.delete_to_empty();
          this.target.token_type = Type.Bin;
          this.target.content = "~concat";
          this.target.add_child(lc);
          this.target.add_child(rc);
          this.target = rcc;
          break;
        case Type.Bin:
          lc = new Tree(Type.Empty, null);
          copy_tree(lc, this.target);
          rc = new Tree(Type.Empty, null);
          this.target.delete_to_empty();
          this.target.token_type = Type.Bin;
          this.target.content = ti.content;
          this.target.add_child(lc);
          this.target.add_child(rc);
          this.target = rc;
          break;
        case Type.Rel:
          lc = new Tree(Type.Empty, null);
          copy_tree(lc, this.target);
          rc = new Tree(Type.Empty, null);
          this.target.delete_to_empty();
          this.target.token_type = Type.Rel;
          this.target.content = ti.content;
          this.target.add_child(lc);
          this.target.add_child(rc);
          this.target = rc;
          break;
        default:
          console.log("[GFN] other Type. (in 'when target is not Empty')");//<<test>>
          break;
      }
    }
    return;
  }

  send_exchange(ti: TokenInfo): void {
    if (this.target.token_type == Type.Un && ti.token_type == Type.Un) {
      this.log_status("'" + this.target.content + "' exchanged with '" + ti.content + "'.");
      this.target.content = ti.content;
    } else if (this.target.token_type == Type.Bin && ti.token_type == Type.Bin) {
      this.log_status("'" + this.target.content + "' exchanged with '" + ti.content + "'.");
      this.target.content = ti.content;
    } else if (this.target.token_type == Type.Rel && ti.token_type == Type.Rel) {
      this.log_status("'" + this.target.content + "' exchanged with '" + ti.content + "'.");
      this.target.content = ti.content;
    } else {
      this.log_status("[error] inappropriate exchange of '" + this.target.content + "' with '" + ti.content + "'.");
    }
    return;
  }

  send_insert_left(ti: TokenInfo): void {
    var lc: Tree;
    var rc: Tree;

    if (this.target.token_type == Type.Empty) {
      this.send(ti);
    } else {
      switch (ti.token_type) {
        case Type.Ord:
          rc = new Tree(Type.Empty, null);
          copy_tree(rc, this.target);
          lc = new Tree(Type.Ord, ti.content);
          this.target.delete_to_empty();
          this.target.token_type = Type.Bin;
          this.target.content = "~concat";
          this.target.add_child(lc);
          this.target.add_child(rc);
          break;
        case Type.Un:
          lc = new Tree(Type.Empty, null);
          copy_tree(lc, this.target);
          this.target.delete_to_empty();
          this.target.token_type = Type.Un;
          this.target.content = ti.content;
          this.target.add_child(lc);
          break;
        case Type.Bin:
          rc = new Tree(Type.Empty, null);
          copy_tree(rc, this.target);
          lc = new Tree(Type.Empty, null);
          this.target.delete_to_empty();
          this.target.token_type = Type.Bin;
          this.target.content = ti.content;
          this.target.add_child(lc);
          this.target.add_child(rc);
          this.target = lc;
          break;
        case Type.Rel:
          rc = new Tree(Type.Empty, null);
          copy_tree(rc, this.target);
          lc = new Tree(Type.Empty, null);
          this.target.delete_to_empty();
          this.target.token_type = Type.Rel;
          this.target.content = ti.content;
          this.target.add_child(lc);
          this.target.add_child(rc);
          this.target = lc;
          break;
        default:
          console.log("[GFN] other Type. (in 'when target is not Empty')");//<<test>>
          break;
      }
    }
    this.log_status("left insertion done.");
    return;
  }
}
