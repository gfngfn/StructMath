
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

function insert_char(ch, n) {
  displayedstring = displayedstring.substr(0, n) + ch + displayedstring.substr(n, displayedstring.length);
}

function delete_char(n) {
  displayedstring = displayedstring.substr(0, n) + displayedstring.substr(n + 1, displayedstring.length);
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
    delete_char(cursorpos - 1);
    cursorpos -= 1;

  } else if (kcode == KEYCODE_DELETE && cursorpos < len) {
    // delete
    delete_char(cursorpos);

  } else if (kcode == KEYCODE_SPACE || is_numeric_code(kcode)) {
    // numeric
    ch = String.fromCharCode(kcode);
    insert_char(ch, cursorpos);
    cursorpos += 1;

  } else if (is_latin_code(kcode)) {
    // latin
    ch = String.fromCharCode(kcode + (kshift ? 0 : 32));
    insert_char(ch, cursorpos);
    cursorpos += 1;

  } else if (kcode == KEYCODE_LEFT && cursorpos > 0) {
    // left
    cursorpos -= 1;

  } else if (kcode == KEYCODE_RIGHT && cursorpos < len) {
    // right
    cursorpos += 1;
  } else {
    switch (kcode) {
      case 186: //[: *]
        insert_char((kshift ? "*" : ":"), cursorpos);
        break;
      case 187: //[; +]
        insert_char((kshift ? "+" : ";"), cursorpos);
        break;
      case 188: //[, <]
        insert_char((kshift ? "<" : ","), cursorpos);
        break;
      case 189: //[- =]
        insert_char((kshift ? "=" : "-"), cursorpos);
        break;
      case 190: //[. >]
        insert_char((kshift ? ">" : "."), cursorpos);
        break;
      case 191: //[/ ?]
        insert_char((kshift ? "?" : "/"), cursorpos);
        break;
      case 192: //[@ `]
        insert_char((kshift ? "`" : "@"), cursorpos);
        break;
      case 219: //[[ {]
        insert_char((kshift ? "{" : "["), cursorpos);
        break;
      case 220: //[\ |]
        insert_char((kshift ? "|" : "\\"), cursorpos);
        break;
      case 221: //[] }]
        insert_char((kshift ? "}" : "]"), cursorpos);
        break;
      case 222: //[^ ~]
        insert_char((kshift ? "~" : "^"), cursorpos);
        break;
      case 226: //[\ _]
        insert_char((kshift ? "_" : "\\"), cursorpos);
        break;
      default:
        cursorpos -= 1;
        break;
    }
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
