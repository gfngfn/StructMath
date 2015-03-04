/// <reference path="tree.ts" />
/// <reference path="input.ts" />

var main_tree: MainTree;
var main_element: HTMLElement = document.getElementById("content");
var main_status: HTMLElement = document.getElementById("status");
var main_view_mode: ViewMode = ViewMode.Layered;

window.onload = () => {
  main_tree = new MainTree(Type.Empty, null, main_status);
  main_element.innerHTML = main_tree.main_tree_to_innerhtml();
  console.log("[GFN] end of window.onload");//<<test>>
};
