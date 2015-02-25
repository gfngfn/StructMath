enum InputState { Single, Sequence }

class UserInput {
  stock: string;
  state: InputState;

  constructor() {
    this.stock = "";
    this.state = InputState.Single;
  }
}

enum KeyCategory { BackSpace, Delete, Left, Right, Space, Enter, SequencePrefix, Letter }

class KeyInfo {
  category: KeyCategory;
  content: string;

  constructor(cat: KeyCategory, cont: string) {
    this.category = cat;
    this.content = cont;
  }
}

var KEYCODE_BACKSPACE = 8;
var KEYCODE_DELETE = 46;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_SPACE = 32;

var user_input: UserInput = new UserInput();

function react_to_input(e: KeyboardEvent): void {
  var key_info: KeyInfo;

  key_info = keycode_to_key_info(e);

  if (user_input.state == InputState.Single) {
    switch (key_info.category) {
      case KeyCategory.SequencePrefix:
        user_input.stock = key_info.content;
        user_input.state = InputState.Sequence;
        break;
      case KeyCategory.Letter:
        /* deal with letter */
        console.log(key_info.content);//<<test>>
        break;
    }
  } else {
    switch (key_info.category) {
      case KeyCategory.Letter:
        user_input.stock = user_input.stock.substr(0, user_input.stock.length - 1);
        break;
      default:
        break;
    }
    if (user_input.stock.length == 0) {
      user_input.state = InputState.Single;
    }
  }
}

function keycode_to_key_info(e: KeyboardEvent) {
  var kcode: number;
  var kshift: boolean;
  var cat: KeyCategory;
  var cont: string;

  kcode = e.keyCode;
  kshift = e.shiftKey;

  cat = KeyCategory.Letter;
  cont = null;

  if (48 <= kcode && kcode <= 57) {
    cont = String.fromCharCode(kcode + (kshift ? -16 : 0));
  } else if (65 <= kcode && kcode <= 90) {
    cont = String.fromCharCode(kcode + (kshift ? 0 : 32));
  } else {
    switch (kcode) {
      case KEYCODE_BACKSPACE:
        cat = KeyCategory.BackSpace;
        break;
      case KEYCODE_DELETE:
        cat = KeyCategory.Delete;
        break;
      case KEYCODE_LEFT:
        cat = KeyCategory.Left;
        break;
      case KEYCODE_RIGHT:
        cat = KeyCategory.Right;
        break;
      case KEYCODE_SPACE:
        cat = KeyCategory.Space;
        break;
      case 186: //[: *]
        cont = (kshift ? "*" : ":");
        break;
      case 187: //[; +]
        cont = (kshift ? "+" : ";");
        break;
      case 188: //[, <]
        cont = (kshift ? "<" : ",");
        break;
      case 189: //[- =]
        cont = (kshift ? "=" : "-");
        break;
      case 190: //[. >]
        cont = (kshift ? ">" : ".");
        break;
      case 191: //[/ ?]
        cont = (kshift ? "?" : "/");
        break;
      case 192: //[@ `]
        cont = (kshift ? "`" : "@");
        break;
      case 219: //[[ {]
        cont = (kshift ? "{" : "[");
        break;
      case 220: //[\ |]
        cat = (kshift ? KeyCategory.Letter : KeyCategory.SequencePrefix);
        cont = (kshift ? "|" : "\\");
        break;
      case 221: //[] }]
        cont = (kshift ? "}" : "]");
        break;
      case 222: //[^ ~]
        cont = (kshift ? "~" : "^");
        break;
      case 226: //[\ _]
        cont = (kshift ? "_" : "\\");
        break;
      default:
        break;
    }
  }
  return new KeyInfo(cat, cont);
}

if (document.addEventListener) {
  document.addEventListener("keydown", react_to_input);
} else if (document.attachEvent) {
  document.attachEvent("onkeydown", react_to_input);
}
