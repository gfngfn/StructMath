/// <reference path="tree.ts" />

window.onload = () => {
  var el: HTMLElement;
  var tr: Tree;

  el = document.getElementById("content");

  tr = new Tree(Type.Bin, "+", [new Tree(Type.Ord, "a", []), new Tree(Type.Bin, "×", [new Tree(Type.Ord, "b", []), new Tree(Type.Empty, null, [])])]);

  el.innerHTML = tr.tree_to_innerhtml();
};
