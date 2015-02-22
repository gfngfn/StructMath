/// <reference path="tree.ts" />

window.onload = () => {
  var el: HTMLElement;
  var tr: Branch;

  el = document.getElementById('content');

  tr = new Branch(Type.Bin, "+");
  tr.items[0] = new Leaf(Type.Ord, "a");
  tr.items[1] = new Leaf(Type.Empty, null);

  el.innerHTML = tr.tree_to_html().innerHTML;
};
