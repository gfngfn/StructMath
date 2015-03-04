# StructMath

## What is StructMath?

StructMath is a prototype of GUI formula editor strictly based on the structure.

It distinguishes letters by categories
Ord (ordinary letter),
Un (unary operator),
BinAssoc (associative binary operator),
BinOther (other binary operator) and
Rel (binary relation).
For example, 'a', '\beta' and '\emptyset' belongs to Ord,
'+', '\cup' and '\otimes' to BinAssoc,
'-' and '\frac' to BinOther,
and '=', '\subseteq' and '\land' to Rel.
Using this distinction it makes structure of a formula as the user hits key.

The target of input is displayed as not an ordinary cursor but a red box.


## How to Use

Open `index.html`, and you can input mathematical formulae.

* Latin letters and some symbols: literally input
* [\]: begin to input a control sequence
* [←]: move target to left or lower layer
* [→]: move target to right or upper layer
* [Shift]+[←]: move target to left sibling
* [Shift]+[→]: move target to right sibling
* [Space]: move target to upper layer / end inputting a control sequence
* [Enter]: move target to lower layer / end inputting a control sequence
* [BS]: delete content in the target
* [F2]: exchange mode
* [F4]: left insertion mode
* [F9]: change view mode

## Remarks

Automatical supplement of parentheses can be implemented, but remains to be done.