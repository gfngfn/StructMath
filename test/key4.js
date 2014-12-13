
var displayedstring = "";
var cursorpos = 0;

const KEYCODE_BACKSPACE = 8;
const KEYCODE_DELETE = 46;
const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_SPACE = 32;

function is_numeric_code(k) { return (48 <= k && k <= 57); }

function is_latin_code(k) { return (65 <= k && k <= 90); }

function react_to_input(e) {

  deal_with_key(e);

  document.getElementById("displayed").innerHTML = string_to_html();
}


function deal_with_key(e) {
  var kcode;
  var kshift;
  var len;
  var ch;

  kcode = e.keyCode;
  kshift = e.shiftKey;

  len = displayedstring.length;

  if (kcode == KEYCODE_BACKSPACE && cursorpos > 0) {
    // backspace
    displayedstring = displayedstring.substr(0, cursorpos - 1) + displayedstring.substr(cursorpos, len);
    cursorpos -= 1;

  } else if (kcode == KEYCODE_DELETE && cursorpos < len) {
    // delete
    displayedstring = displayedstring.substr(0, cursorpos) + displayedstring.substr(cursorpos + 1, len);

  } else if (kcode == KEYCODE_SPACE || is_numeric_code(kcode)) {
    // numeric
    ch = String.fromCharCode(kcode);
    displayedstring = displayedstring.substr(0, cursorpos) + ch + displayedstring.substr(cursorpos, len);
    cursorpos += 1;

  } else if (is_latin_code(kcode)) {
    // latin
    ch = String.fromCharCode(kcode + (kshift ? 0 : 32));
    displayedstring = displayedstring.substr(0, cursorpos) + ch + displayedstring.substr(cursorpos, len);
    cursorpos += 1;

  } else if (kcode == KEYCODE_LEFT && cursorpos > 0) {
    // left
    cursorpos -= 1;

  } else if (kcode == KEYCODE_RIGHT && cursorpos < len) {
    // right
    cursorpos += 1;
  }
}

function string_to_html() {
  var res = "";
  if (cursorpos == 0) {
    res = res + "<span class=\"cursor\">|</span>";
  }
  for (var i = 0; i < displayedstring.length; i++) {
    res = res + "<span class=\"charbox\">" + displayedstring.charAt(i) + "</span>";      
    if (i + 1 == cursorpos) {
      res = res + "<span class=\"cursor\">|</span>";
    }
  }
  return res;
}

if (document.addEventListener) {
  document.addEventListener("keydown" , react_to_input);
} else if (document.attachEvent) {
  document.attachEvent("onkeydown" , react_to_input);
}
