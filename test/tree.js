  // gfn wrote consulting an article http://upa-pc.blogspot.jp/2014/06/javascript-tree.html

  function tree_node(val, chdrn) {
    this.value = val;
    this.children = chdrn;
  }

  function tree2boxed(tr) {
    var s;

  	s = "<div class=\"treedbox\">" + tr.value;
    if (tr.children) {
    	for (var i = 0; i < tr.children.length; i++) {
        s = s + tree2boxed(tr.children[i]);
      }
    }
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
