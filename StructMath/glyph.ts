
function draw_special_glyphs(): void {
  var elms: JQuery;
  var i: number;
  var elm_sqrt: HTMLElement;
  var elm_lparen: HTMLElement;
  var elm_rparen: HTMLElement;

  elms = $(".square-root > div");
  for (i = 0; i < elms.length; i++) {
    elm_sqrt = document.createElement("img");
    elm_sqrt.setAttribute("src", "sqrt.svg");
    elm_sqrt.setAttribute("height", elms[i].offsetHeight.toString());
    elms[i].parentElement.parentElement.insertBefore(elm_sqrt, elms[i].parentElement);
  }

  elms = $(".mandatory-paren > div");
  for (i = 0; i < elms.length; i++) {
    elm_lparen = document.createElement("img");
    elm_lparen.setAttribute("src", "lparen.svg");
    elm_lparen.setAttribute("height", elms[i].offsetHeight.toString());
    elm_rparen = document.createElement("img");
    elm_rparen.setAttribute("src", "rparen.svg");
    elm_rparen.setAttribute("height", elms[i].offsetHeight.toString());
    elms[i].parentElement.parentElement.insertBefore(elm_lparen, elms[i].parentElement);
    elms[i].parentElement.parentElement.appendChild(elm_rparen);
    //hgt = elms[i].offsetHeight;
    //elms[i].parentElement.parentElement.innerHTML = draw_left_paren(hgt) + elms[i].parentElement.parentElement.innerHTML + draw_right_paren(hgt);
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
