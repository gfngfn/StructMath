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

    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
    "E": "E",
    "F": "F",
    "G": "G",
    "H": "H",
    "I": "I",
    "J": "J",
    "K": "K",
    "L": "L",
    "M": "M",
    "N": "N",
    "O": "O",
    "P": "P",
    "Q": "Q",
    "R": "R",
    "S": "S",
    "T": "T",
    "U": "U",
    "V": "V",
    "W": "W",
    "X": "X",
    "Y": "Y",
    "Z": "Z",

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
    "\\omega": "ω",

    "\\Gamma": "Γ",
    "\\Delta": "Δ",
    "\\Theta": "Θ",
    "\\Lambda": "Λ",
    "\\Xi": "Ξ",
    "\\Pi": "Π",
    "\\Sigma": "Σ",
    "\\Upsilon": "Υ",
    "\\Phi": "Φ",
    "\\Psi": "Ψ",
    "\\Omega": "Ω",

    "\\ell": "ℓ"
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
    "\\emptyset": "∅",
    "\\infty": "∞"
  }

  static un_to_string: { [key: string]: string } = {
    "\\+": "＋",
    "\\-": "－",
    "\\Im": "ℑ",
    "\\lnot": "￢",
    "\\nabla": "∇",
    "\\Re": "ℜ",
    "\\unmodels": "⊧",
    "\\unmp": "∓",
    "\\unpm": "±",
    "\\unvdash": "⊢",

    "\\cos": "cos",
    "\\cot": "cot",
    "\\csc": "csc",
    "\\cod": "cod",
    "\\det": "det",
    "\\diag": "diag",
    "\\dom": "dom",
    "\\ln": "ln",
    "\\log": "log",
    "\\rot": "rot",
    "\\sec": "sec",
    "\\sin": "sin",
    "\\tan": "tan",
    "\\tr": "tr"
  }

  static bin_assoc_to_string: { [key: string]: string } = {
    "+": "＋",
    "~concat": "\ufeff", // "" is not good for if
    "\\cap": "∩",
    "\\cup": "∪",
    "\\oplus": "⊕",
    "\\otimes": "⊗",
    "\\times": "×"
  }

  static bin_other_to_string: { [key: string]: string } = {
    "-": "－",
    "/": "/",
    "\\div": "÷",
    "\\pm": "±",
    "\\mp": "∓",
    "\\setminus": "∖"
  }

  static rel_to_string: { [key: string]: string } = {
    "=": "＝",
    "<": "＜",
    ">": "＞",
    "\\approx": "≈",
    "\\dashv": "⊣",
    "\\equiv": "≡",
    "\\geq": "≥",
    "\\gg": "≫",
    "\\in": "∈",
    "\\land": "∧",
    "\\leftarrow": "←",
    "\\leq": "≤",
    "\\ll": "≪",
    "\\lor": "∨",
    "\\mapsto": "↦",
    "\\models": "⊧",
    "\\ni": "∋",
    "\\perp": "⊥",
    "\\prec": "≺",
    "\\propto": "∝",
    "\\rightarrow": "→",
    "\\Rightarrow": "⇒",
    "\\sim": "∼",
    "\\simeq": "≃",
    "\\subset": "⊂",
    "\\subseteq": "⊆",
    "\\succ": "≻",
    "\\supset": "⊃",
    "\\supseteq": "⊇",
    "\\varsim": "∽",
    "\\vdash": "⊢",
  }


  make_token_info(tok: string) {
    if (TokenInfo.ord_letter_to_string[tok]) {
      this.token_type = Type.Ord;
      this.content = tok;
    } else if (TokenInfo.ord_other_to_string[tok]) {
      this.token_type = Type.Ord;
      this.content = tok;
    } else if (TokenInfo.un_to_string[tok]) {
      this.token_type = Type.Un;
      this.content = tok;
    } else if (TokenInfo.bin_assoc_to_string[tok]) {
      this.token_type = Type.Bin;
      this.content = tok;
    } else if (TokenInfo.bin_other_to_string[tok]) {
      this.token_type = Type.Bin;
      this.content = tok;
    } else if (TokenInfo.rel_to_string[tok]) {
      this.token_type = Type.Rel;
      this.content = tok;
    } else {
      main_tree.log_status("[error] '" + tok + "' does not match any definition.");
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
  } else if (TokenInfo.un_to_string[tok]) {
    return TokenInfo.un_to_string[tok];
  } else if (TokenInfo.bin_assoc_to_string[tok]) {
    return TokenInfo.bin_assoc_to_string[tok];
  } else if (TokenInfo.bin_other_to_string[tok]) {
    return TokenInfo.bin_other_to_string[tok];
  } else if (TokenInfo.rel_to_string[tok]) {
    return " " + TokenInfo.rel_to_string[tok] + " ";
  } else {
    console.log("[GFN]: '" + tok + "' does not match any def.");//<<test>>
    return "";
  }
}
