/// <reference path="tree.ts" />
var maintree: Tree;
var sub1: Tree;
var sub2: Tree;

window.onload = () => {
  var el: HTMLElement;

  el = document.getElementById("content");

  //maintree = new Tree(Type.Bin, "+", [new Tree(Type.Ord, "a", []), new Tree(Type.Bin, "×", [new Tree(Type.Ord, "b", []), new Tree(Type.Empty, null, [])])]);
  //maintree = new Tree(Type.Empty, null, []);
  maintree = new Tree(Type.Bin, "+");
  sub1 = new Tree(Type.Ord, "a");
  sub2 = new Tree(Type.Bin, "×");
  sub2.add_child(new Tree(Type.Ord, "b"));
  sub2.add_child(new Tree(Type.Empty, null));
  maintree.add_child(sub1);
  maintree.add_child(sub2);

  el.innerHTML = maintree.tree_to_innerhtml();
};
