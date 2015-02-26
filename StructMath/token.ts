///<reference path="tree.ts" />

class TokenInfo {
  token_type: Type;
  content: string;

  constructor() {
    this.token_type = null;
    this.content = "";
  }

  static ord_letter_to_string: { [key: string]: string } = {
    //"\\": "",
    "a": "a",
    "b": "b",
    "c": "c",
    "d": "d",
    "e": "e",
    "f": "f",
    "g": "g",
    "h": "h",
    "i": "i",
    "j": "j",
    "k": "k",
    "l": "l",
    "m": "m",
    "n": "n",
    "o": "o",
    "p": "p",
    "q": "q",
    "r": "r",
    "s": "s",
    "t": "t",
    "u": "u",
    "v": "v",
    "w": "w",
    "x": "x",
    "y": "y",
    "z": "z",
    "\\alpha": "α",
    "\\beta": "β",
    "\\gamma": "γ",
    "\\delta": "δ",
    "\\epsilon": "ε",
    "\\zeta": "ζ",
    "\\eta": "η",
    "\\theta": "θ",
    "\\iota": "ι",
    "\\kappa": "κ",
    "\\lambda": "λ",
    "\\mu": "μ",
    "\\nu": "ν",
    "\\xi": "ξ",
    "\\omicron": "ο",
    "\\pi": "π",
    "\\rho": "ρ",
    "\\sigma": "σ",
    "\\tau": "τ",
    "\\upsilon": "υ",
    "\\phi": "φ",
    "\\chi": "χ",
    "\\psi": "ψ",
    "\\omega": "ω"
  }

  static ord_other_to_string: { [key: string]: string } = {
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "\\bot": "⊥",
    "\\emptyset": "∅"
  }

  static bin_to_string: { [key: string]: string } = {
    "+": "＋",
    "-": "－",
    "~concat": "\ufeff", // "" is not good for if
    "\\cap": "∩",
    "\\cup": "∪",
    "\\div": "÷",
    "\\oplus": "⊕",
    "\\pm": "±",
    "\\times": "×"
  }
/*
  private static rel_to_letter: { [key: string]: string } = {
    "=": "＝",
    "<": "＜",
    ">": "＞",
    "\\equiv": "≡",
    "\\in": "∈",
    "\\land": "∧",
    "\\leftarrow": "←",
    "\\lor": "∨",
    "\\ni": "∋",
    "\\perp": "⊥",
    "\\rightarrow": "→",
    "\\Rightarrow": "⇒",
    "\\sim": "∽",
    "\\subset": "⊂",
    "\\subseteq": "⊆",
    "\\supset": "⊃",
    "\\supseteq": "⊇"
  }
*/

  make_token_info(tok: string) {
    if (TokenInfo.ord_letter_to_string[tok]) {
      this.token_type = Type.Ord;
      this.content = tok;
    } else if (TokenInfo.ord_other_to_string[tok]) {
      this.token_type = Type.Ord;
      this.content = tok;
    } else if (TokenInfo.bin_to_string[tok]) {
      this.token_type = Type.Bin;
      this.content = tok;
    } else {
      console.log("[GFN]: '" + tok + "' does not match any def.");//<<test>>
      this.token_type = Type.Empty;
      this.content = null;
    }
    return this;
  }
}

function content_to_string(tok: string): string {
  if (TokenInfo.ord_letter_to_string[tok]) {
    return "<span class='math_italic'>" + TokenInfo.ord_letter_to_string[tok] + "</span>";
  } else if (TokenInfo.ord_other_to_string[tok]) {
    return TokenInfo.ord_other_to_string[tok];
  } else if (TokenInfo.bin_to_string[tok]) {
    return TokenInfo.bin_to_string[tok];
  } else {
    console.log("[GFN]: '" + tok + "' does not match any def.");//<<test>>
    return "";
  }
}
