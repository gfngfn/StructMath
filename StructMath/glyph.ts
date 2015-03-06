
function draw_special_glyphs(): void {
  var elms: JQuery;
  var i: number;

  elms = $(".square-root > div");
  for (i = 0; i < elms.length; i++) {
    elms[i].parentElement.parentElement.innerHTML = draw_sqrt(elms[i].offsetHeight) + elms[i].parentElement.parentElement.innerHTML;
  }

  elms = $(".mandatory-paren > div");
  for (i = 0; i < elms.length; i++) {
    elms[i].parentElement.parentElement.innerHTML = draw_left_paren(elms[i].offsetHeight) + elms[i].parentElement.parentElement.innerHTML + draw_right_paren(elms[i].offsetHeight);
  }

  return;
}

function draw_left_paren(hgt: number): string {
  return "<img src='lparen.svg' height='" + hgt.toString() + "'>";
}

function draw_right_paren(hgt: number): string {
  return "<img src='rparen.svg' height='" + hgt.toString() + "'>";
}

function draw_sqrt(hgt: number): string {
  return "<img src='sqrt.svg' height='" + hgt.toString() + "'>";
}
