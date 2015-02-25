enum Type { Empty, Ord, Un, Bin, LR, Op }

class Tree {
  type: Type;
  content: string;
  items: Tree[];
  parent: Tree;

  constructor(type_ini: Type, content_ini: string) {
    this.type = type_ini;
    this.content = content_ini;
    this.items = [];
    this.parent = null;
  }

  is_leaf(): boolean { return (this.items.length == 0); }

  delete(): void {
    this.type = Type.Empty;
    this.content = null;
    this.items = [];
    this.parent = null;
    return;
  }

  tree_to_innerhtml(): string {
    var res: string;

    if (this.type == Type.Empty) {
      res = "<span class='empty'>|</div>";
    } else if (this.type == Type.Ord) {
      res = "<div class='box-of-tree'>" + content_to_letter(this.content) + "</div>";
    } else if (this.type == Type.Un) {
      res = content_to_letter(this.content);
      res += this.items[0].tree_to_innerhtml();
    } else if (this.type == Type.Op) {
      res = content_to_letter(this.content);
      res += this.items[0].tree_to_innerhtml();
    } else if (this.type == Type.Bin) {
      res = "<div class='box-of-tree'>";
      res += this.items[0].tree_to_innerhtml();
      res += content_to_letter(this.content);
      res += this.items[1].tree_to_innerhtml();
      res += "</div>";
    } else {
      throw new Error("inappropriate Type to Branch.");
    }
    return res;
  }

  add_child(ch: Tree) {
    ch.parent = this;
    this.items.push(ch);
  }
}

function content_to_letter(cont: string): string {
  return cont;
}
