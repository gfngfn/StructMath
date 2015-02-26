/// <reference path="tree.ts" />
/// <reference path="input.ts" />

var main_tree: MainTree;
var sub1: Tree;
var sub2: Tree;
var sub21: Tree;
var sub22: Tree;

var main_element: HTMLElement = document.getElementById("content");

window.onload = () => {

  //main_tree = new Tree(Type.Empty, null);
  main_tree = new MainTree(Type.Bin, "+");
  sub1 = new Tree(Type.Ord, "a");
  sub2 = new Tree(Type.Bin, "\\times");
  sub21 = new Tree(Type.Ord, "b");
  sub22 = new Tree(Type.Empty, null);
  sub2.add_child(sub21);
  sub2.add_child(sub22);
  main_tree.add_child(sub1);
  main_tree.add_child(sub2);
  main_tree.target = sub22;

  main_element.innerHTML = main_tree.main_tree_to_innerhtml();
  console.log("[GFN] end of window.onload");//<<test>>
};
