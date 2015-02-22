enum Type { Empty, Ord, Un, Bin, LR, Op }

interface Tree {
  is_leaf(): boolean;
  delete(): void;
  tree_to_html(): HTMLElement;
}
class Leaf implements Tree {
  type: Type;
  content: string;

  constructor(type_ini: Type, content_ini: string) {
    this.type = type_ini;
    this.content = content_ini;
  }

  is_leaf(): boolean { return true; }

  delete(): void {
    this.type = Type.Empty;
    this.content = null;
    return;
  }

  tree_to_html(): HTMLElement {
    var element = new HTMLElement();

    if (this.type == Type.Empty) {
      element.innerHTML = "<div class='box-of-tree'> </div>";
      return element;
    } else if (this.type == Type.Ord) {
      element.innerHTML = "<div class='box-of-tree'>" + content_to_letter(this.content) + "</div>";
      return element;
    } else {
      throw new Error("innappropriate Type to Leaf.");
    }
  }
}
class Branch implements Tree {
  type: Type;
  content: string;
  items: Tree[];

  constructor(type_ini: Type, content_ini: string) {
    this.type = type_ini;
    this.content = content_ini;
    this.items = new Array();
  }

  is_leaf(): boolean { return false; }

  delete(): void {
    this.type = Type.Empty;
    this.content = null;
    return;
  }

  tree_to_html(): HTMLElement {
    var element = new HTMLElement();

    if (this.type == Type.Un) {
      element.innerHTML = content_to_letter(this.content);
      element.innerHTML += this.items[0].tree_to_html().innerHTML;
    } else if (this.type == Type.Op) {
      element.innerHTML = content_to_letter(this.content);
      element.innerHTML += this.items[0].tree_to_html().innerHTML;
    } else if (this.type == Type.Bin) {
      element.innerHTML = "<div class='box-of-tree'>" + this.items[0].tree_to_html().innerHTML + "</div>";
      element.innerHTML += content_to_letter(this.content);
      element.innerHTML += "<div class='box-of-tree'>" + this.items[1].tree_to_html().innerHTML + "</div>";
    } else {
      throw new Error("inappropriate Type to Branch.");
    }
    return element;
  }
}

function content_to_letter(cont: string): string {
  return cont;
}
