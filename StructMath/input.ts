///<reference path="token.ts" />

enum InputState { Single, Sequence }
enum SendingState { Normal, Exchange, InsertLeft }

class UserInput {
  stock: string;
  state: InputState;
  sending: SendingState;

  constructor() {
    this.stock = "";
    this.state = InputState.Single;
    this.sending = SendingState.Normal;
  }
}

enum KeyCategory {
  BackSpace,
  Delete,
  Left,
  LeftJump,
  Right,
  RightJump,
  Space,
  Enter,
  SequencePrefix,
  Letter,
  Exchange,
  InsertLeft,
  Invalid
}

class KeyInfo {
  category: KeyCategory;
  content: string;

  constructor(cat: KeyCategory, cont: string) {
    this.category = cat;
    this.content = cont;
  }
}

var KEYCODE_BACKSPACE = 8;
var KEYCODE_TAB = 9;
var KEYCODE_SHIFT = 16;
var KEYCODE_CTRL = 17;
var KEYCODE_ALT = 18;
var KEYCODE_ESCAPE = 27;
var KEYCODE_SPACE = 32;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_DELETE = 46;
var KEYCODE_ENTER = 13;
var KEYCODE_EXCHANGE = 113;//[F2]
var KEYCODE_INSERTLEFT = 115;//[F4]

var user_input: UserInput = new UserInput();
var token_info: TokenInfo = new TokenInfo();

function react_to_input(e: KeyboardEvent): void {
  var key_info: KeyInfo;
  var temp_tree: Tree;

  key_info = keycode_to_key_info(e);

  main_tree.log_status("-");

  if (user_input.state != InputState.Sequence) {
 
    switch (key_info.category) {
      case KeyCategory.Exchange:
        if (user_input.sending == SendingState.Exchange) {
          user_input.sending = SendingState.Normal;
          main_tree.log_status("[normal mode]");
        } else {
          user_input.sending = SendingState.Exchange;
          main_tree.log_status("[exchange mode]");
        }
        break;
      case KeyCategory.InsertLeft:
        if (user_input.sending == SendingState.InsertLeft) {
          user_input.sending = SendingState.Normal;
          main_tree.log_status("[normal mode]");
        } else {
          user_input.sending = SendingState.InsertLeft;
          main_tree.log_status("[insert-left mode]");
        }
        break;
      case KeyCategory.SequencePrefix:
        user_input.stock = key_info.content;
        user_input.state = InputState.Sequence;
        console.log("SequencePrefix: " + key_info.content);//<<test>>
        break;
      case KeyCategory.Letter:
        // deal with letter
        token_info.make_token_info(key_info.content);
        switch (user_input.sending) {
          case SendingState.Normal:
            main_tree.send(token_info);
            break;
          case SendingState.Exchange:
            main_tree.send_exchange(token_info);
            user_input.sending = SendingState.Normal;
            break;
          case SendingState.InsertLeft:
            main_tree.send_insert_left(token_info);
            user_input.sending = SendingState.Normal;
            break;
        }
        console.log(key_info.content);//<<test>>
        break;
      case KeyCategory.Space:
        //disable default reaction by browsers
        e.preventDefault();
        main_tree.press_space();
        break;
      case KeyCategory.Enter:
        main_tree.press_enter();
        break;
      case KeyCategory.Left:
        main_tree.left();
        break;
      case KeyCategory.LeftJump:
        main_tree.left_jump();
        break;
      case KeyCategory.Right:
        main_tree.right();
        break;
      case KeyCategory.RightJump:
        main_tree.right_jump();
        break;
      case KeyCategory.BackSpace:
        // disable default reaction by browsers
        e.preventDefault();
        main_tree.press_backspace();
        break;
      default:
        console.log("[GFN] other key category. (in InputState.Single state)");//<<test>>
        break;
    }

  } else {
    // when in the middle of the process of typing control sequence

    switch (key_info.category) {
      case KeyCategory.Letter:
        user_input.stock = user_input.stock + key_info.content;
        console.log("" + key_info.content + "  / Seq.: " + user_input.stock);//<<test>>
        break;
      case KeyCategory.BackSpace:
        user_input.stock = user_input.stock.substr(0, user_input.stock.length - 1);
        console.log("BS / Seq.: " + user_input.stock);//<<test>>
        break;
      case KeyCategory.Enter:
      case KeyCategory.Space:
        // deal with control sequence
        switch (user_input.sending) {
          case SendingState.Normal:
            main_tree.send(token_info.make_token_info(user_input.stock));
            break;
          case SendingState.Exchange:
            main_tree.send_exchange(token_info.make_token_info(user_input.stock));
            user_input.sending = SendingState.Normal;
            break;
          case SendingState.InsertLeft:
            main_tree.send_insert_left(token_info.make_token_info(user_input.stock));
            user_input.sending = SendingState.Normal;
            break;
        }
        user_input.stock = "";
        user_input.state = InputState.Single;
        break;
      default:
        console.log("[GFN] other key category. (in InputState.Sequence state)");
        break;
    }
    if (user_input.stock.length == 0) {
      user_input.state = InputState.Single;
    }
  }

  // renew display
  main_element.innerHTML = main_tree.main_tree_to_innerhtml();
  return;
}

function keycode_to_key_info(e: KeyboardEvent): KeyInfo {
  var kcode: number;
  var kshift: boolean;
  var cat: KeyCategory;
  var cont: string;

  kcode = e.keyCode;
  kshift = e.shiftKey;

  //console.log("(" + kcode + ", " + kshift + ")");//<<test>>

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
        cat = (kshift ? KeyCategory.LeftJump : KeyCategory.Left);
        break;
      case KEYCODE_RIGHT:
        cat = (kshift ? KeyCategory.RightJump : KeyCategory.Right);
        break;
      case KEYCODE_SPACE:
        cat = KeyCategory.Space;
        break;
      case KEYCODE_ENTER:
        cat = KeyCategory.Enter;
        break;
      case KEYCODE_EXCHANGE:
        cat = KeyCategory.Exchange;
        break;
      case KEYCODE_INSERTLEFT:
        cat = KeyCategory.InsertLeft;
        break;
      case KEYCODE_SHIFT:
      case KEYCODE_CTRL:
      case KEYCODE_ALT:
      case KEYCODE_TAB:
      case KEYCODE_ESCAPE:
        cat = KeyCategory.Invalid;
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
        cat = (kshift ? KeyCategory.Letter : KeyCategory.SequencePrefix);
        cont = (kshift ? "_" : "\\");
        break;
      default:
        cat = KeyCategory.Invalid;
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
