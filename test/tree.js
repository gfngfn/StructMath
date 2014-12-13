  // gfn wrote consulting an article http://upa-pc.blogspot.jp/2014/06/javascript-tree.html

  function tree_node(val, chdrn) {
    this.value = val;
    this.children = chdrn;
  }

  function tree2boxed(tr, depth, cursorin) {
    var s;

  	s = "<div class=\"treedbox\">" + tr.value;
    if (cursorin && depth == cursor_depth) { s = s + "<span class=\"cursor\">[</span>"; }
    if (tr.children) {
    	for (var i = 0; i < tr.children.length; i++) {
        s = s + "<span class=\"mini\">(";
        for(var j = 0; j < depth; j++) { s = s + "*"; }
        s = s + "" + i + ")</span>";
        s = s + tree2boxed(tr.children[i], depth + 1, cursorin && (cursor[depth] == i));
      }
    }
    if (cursorin && depth == cursor_depth) { s = s + "<span class=\"cursor\">]</span>"; }
    s = s + "</div>";

    return s;
  }

  var tree = new tree_node("P", [
      new tree_node("f", [
        new tree_node("a", []),
        new tree_node("g", [
          new tree_node("b", [])
        ])
      ]),
      new tree_node("h", [
        new tree_node("p", [
          new tree_node("s", []),
          new tree_node("f", []),
          new tree_node("u", [])
        ]),
        new tree_node("q", [])
      ])
    ]);

  var cursor = [1, 0];
  var cursor_depth = 1;
