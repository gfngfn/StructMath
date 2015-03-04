///<reference path="tree.ts" />

class TokenInfo {
  token_type: Type;
  content: string;

  constructor() {
    this.token_type = null;
    this.content = "";
  }

  static ord_letter_hash: { [key: string]: string[] } = {
    //"\\": "",
    "a": ["a"],
    "b": ["b"],
    "c": ["c"],
    "d": ["d"],
    "e": ["e"],
    "f": ["f"],
    "g": ["g"],
    "h": ["h"],
    "i": ["i"],
    "j": ["j"],
    "k": ["k"],
    "l": ["l"],
    "m": ["m"],
    "n": ["n"],
    "o": ["o"],
    "p": ["p"],
    "q": ["q"],
    "r": ["r"],
    "s": ["s"],
    "t": ["t"],
    "u": ["u"],
    "v": ["v"],
    "w": ["w"],
    "x": ["x"],
    "y": ["y"],
    "z": ["z"],

    "A": ["A"],
    "B": ["B"],
    "C": ["C"],
    "D": ["D"],
    "E": ["E"],
    "F": ["F"],
    "G": ["G"],
    "H": ["H"],
    "I": ["I"],
    "J": ["J"],
    "K": ["K"],
    "L": ["L"],
    "M": ["M"],
    "N": ["N"],
    "O": ["O"],
    "P": ["P"],
    "Q": ["Q"],
    "R": ["R"],
    "S": ["S"],
    "T": ["T"],
    "U": ["U"],
    "V": ["V"],
    "W": ["W"],
    "X": ["X"],
    "Y": ["Y"],
    "Z": ["Z"],

    "\\alpha": ["α"],
    "\\beta": ["β"],
    "\\gamma": ["γ"],
    "\\delta": ["δ"],
    "\\epsilon": ["ε"],
    "\\zeta": ["ζ"],
    "\\eta": ["η"],
    "\\theta": ["θ"],
    "\\iota": ["ι"],
    "\\kappa": ["κ"],
    "\\lambda": ["λ"],
    "\\mu": ["μ"],
    "\\nu": ["ν"],
    "\\xi": ["ξ"],
    "\\omicron": ["ο"],
    "\\pi": ["π"],
    "\\rho": ["ρ"],
    "\\sigma": ["σ"],
    "\\tau": ["τ"],
    "\\upsilon": ["υ"],
    "\\phi": ["φ"],
    "\\chi": ["χ"],
    "\\psi": ["ψ"],
    "\\omega": ["ω"],

    "\\Gamma": ["Γ"],
    "\\Delta": ["Δ"],
    "\\Theta": ["Θ"],
    "\\Lambda": ["Λ"],
    "\\Xi": ["Ξ"],
    "\\Pi": ["Π"],
    "\\Sigma": ["Σ"],
    "\\Upsilon": ["Υ"],
    "\\Phi": ["Φ"],
    "\\Psi": ["Ψ"],
    "\\Omega": ["Ω"],

    "\\ell": ["ℓ"]
  }

  static ord_other_hash: { [key: string]: string[] } = {
    "1": ["1"],
    "2": ["2"],
    "3": ["3"],
    "4": ["4"],
    "5": ["5"],
    "6": ["6"],
    "7": ["7"],
    "8": ["8"],
    "9": ["9"],
    "0": ["0"],
    "\\bot": ["⟘"],
    "\\emptyset": ["∅"],
    "\\infty": ["∞"],
    "\\top": ["⟙"]
  }

  static un_hash: { [key: string]: string[] } = {
    "\\+": ["＋", ""],
    "\\-": ["－", ""],
    "\\Im": ["ℑ", ""],
    "\\lnot": ["￢", ""],
    "\\nabla": ["∇", ""],
    "\\Re": ["ℜ", ""],
    "\\unmodels": ["⊧", ""],
    "\\unmp": ["∓", ""],
    "\\unpm": ["±", ""],
    "\\unvdash": ["⊢", ""],

    "\\cos": ["cos", ""],
    "\\cot": ["cot", ""],
    "\\csc": ["csc", ""],
    "\\cod": ["cod", ""],
    "\\det": ["det", ""],
    "\\diag": ["diag", ""],
    "\\dom": ["dom", ""],
    "\\ln": ["ln", ""],
    "\\log": ["log", ""],
    "\\rot": ["rot", ""],
    "\\sec": ["sec", ""],
    "\\sin": ["sin", ""],
    "\\sqrt": ["√<div class='square-root'><hr class='square-root-line'/><span>", "</span></div>"],
    "\\tan": ["tan", ""],
    "\\tr": ["tr", ""]
  }

  static bin_assoc_hash: { [key: string]: string[] } = {
    "+": ["", "＋", ""],
    "~concat": ["", "", ""],
    "\\cap": ["", "∩", ""],
    "\\cup": ["", "∪", ""],
    "\\oplus": ["", "⊕", ""],
    "\\otimes": ["", "⊗", ""],
    "\\times": ["", "×", ""]
  }

  static bin_other_hash: { [key: string]: string[] } = {
    "-": ["", "－", ""],
    "/": ["<div class='fraction'><span>", "</span><hr class='fraction-line' /><span>", "</span></div>"],
    "^": ["", "<sup>", "</sup>"],
    "_": ["", "<sub>", "</sub>"],
    "\\div": ["", "÷", ""],
    "\\frac": ["<div class='fraction'><span>", "</span><hr class='fraction-line' /><span>", "</span></div>"],
    "\\pm": ["", "±", ""],
    "\\mp": ["", "∓", ""],
    "\\setminus": ["", "∖", ""],

    "\\dif": ["<div class='fraction'><span>d", "</span><hr class='fraction-line' /><span>d", "</span></div>"],
    "\\pdif": ["<div class='fraction'><span>∂", "</span><hr class='fraction-line' /><span>∂", "</span></div>"]
  }

  static rel_hash: { [key: string]: string[] } = {
    "=": ["", "＝", ""],
    "<": ["", "＜", ""],
    ">": ["", "＞", ""],
    "\\approx": ["", "≈", ""],
    "\\dashv": ["", "⊣", ""],
    "\\equiv": ["", "≡", ""],
    "\\geq": ["", "≥", ""],
    "\\gg": ["", "≫", ""],
    "\\in": ["", "∈", ""],
    "\\land": ["", "∧", ""],
    "\\leftarrow": ["", "←", ""],
    "\\leq": ["", "≤", ""],
    "\\ll": ["", "≪", ""],
    "\\lor": ["", "∨", ""],
    "\\mapsto": ["", "↦", ""],
    "\\models": ["", "⊧", ""],
    "\\ni": ["", "∋", ""],
    "\\perp": ["", "⊥", ""],
    "\\prec": ["", "≺", ""],
    "\\propto": ["", "∝", ""],
    "\\rightarrow": ["", "→", ""],
    "\\Rightarrow": ["", "⇒", ""],
    "\\sim": ["", "∼", ""],
    "\\simeq": ["", "≃", ""],
    "\\subset": ["", "⊂", ""],
    "\\subseteq": ["", "⊆", ""],
    "\\succ": ["", "≻", ""],
    "\\supset": ["", "⊃", ""],
    "\\supseteq": ["", "⊇", ""],
    "\\varsim": ["", "∽", ""],
    "\\vdash": ["", "⊢", ""]
  }


  make_token_info(tok: string) {
    if (TokenInfo.ord_letter_hash[tok]) {
      this.token_type = Type.Ord;
      this.content = tok;
    } else if (TokenInfo.ord_other_hash[tok]) {
      this.token_type = Type.Ord;
      this.content = tok;
    } else if (TokenInfo.un_hash[tok]) {
      this.token_type = Type.Un;
      this.content = tok;
    } else if (TokenInfo.bin_assoc_hash[tok]) {
      this.token_type = Type.BinAssoc;
      this.content = tok;
    } else if (TokenInfo.bin_other_hash[tok]) {
      this.token_type = Type.BinOther;
      this.content = tok;
    } else if (TokenInfo.rel_hash[tok]) {
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

function content_ord_to_string(tok: string) {
  var hash_value: Array<string>;

  if (TokenInfo.ord_letter_hash[tok]) {
    hash_value = TokenInfo.ord_letter_hash[tok];
    return "<span class='math-italic'>" + hash_value[0] + "</span>";
  } else if (TokenInfo.ord_other_hash[tok]) {
    hash_value = TokenInfo.ord_other_hash[tok];
    return hash_value[0];
  } else {
    return "**ERR: ord**";//<<test>>
  }
}

function content_un_to_string(tok: string, mt: MainTree, itms: Tree[]) {
  var hash_value: Array<string>;

  if (TokenInfo.un_hash[tok]) {
    hash_value = TokenInfo.un_hash[tok];
    return hash_value[0] + itms[0].tree_to_innerhtml(mt) + hash_value[1];
  } else {
    return "**ERR: un**";//<<test>>
  }
}

function content_bin_assoc_to_string(tok: string, mt: MainTree, itms: Tree[]) {
  var hash_value: Array<string>;
  var res: string;
  var i: number;

  if (TokenInfo.bin_assoc_hash[tok]) {
    hash_value = TokenInfo.bin_assoc_hash[tok];
    res = hash_value[0];
    res += itms[0].tree_to_innerhtml(mt);
    for (i = 1; i < itms.length; i++) {
      res += hash_value[1]
      res += itms[i].tree_to_innerhtml(mt);
    }
    res += hash_value[2];
    return res;
  } else {
    return "**ERR: bin_assoc**";//<<test>>
  }
}

function content_bin_other_to_string(tok: string, mt: MainTree, itms: Tree[]) {
  var hash_value: Array<string>;

  if (TokenInfo.bin_other_hash[tok]) {
    hash_value = TokenInfo.bin_other_hash[tok];
    return hash_value[0] + itms[0].tree_to_innerhtml(mt) + hash_value[1] + itms[1].tree_to_innerhtml(mt) + hash_value[2];
  } else {
    return "**ERR: bin_other**";//<<test>>
  }
}

function content_rel_to_string(tok: string, mt: MainTree, itms: Tree[]) {
  var hash_value: Array<string>;

  if (TokenInfo.rel_hash[tok]) {
    hash_value = TokenInfo.rel_hash[tok];
    return hash_value[0] + itms[0].tree_to_innerhtml(mt) + hash_value[1] + itms[1].tree_to_innerhtml(mt) + hash_value[2];
  } else {
    return "**ERR: rel**";//<<test>>
  }
}
