export const PMxVars = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10"
]

export const PMyVars = [
  "0.1705",
  "0.1418",
  "0.1332",
  "0.1379",
  "0.1276",
  "0.08586",
  "0.06621",
  "0.06827",
  "0.01634",
  "0.06165",
]
export const PMlabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
export const PMwholeFormula = "((x-(2))(x-(3))/((1)-(2))((1)-(3))) * (0.1705) + ((x-(1))(x-(3))/((2)-(1))((2)-(3))) * (0.1418) + ((x-(1))(x-(2))/((3)-(1))((3)-(2))) * (0.1332)";
// prettier-ignore
export const PMs_string = "(x - 2) * ((x - 3) * 341 / 4000 + (x - 1) * 333 / 5000) + (x - 1) * (x - 3) * -709 / 5000";
// prettier-ignore
export const PMs_tex = "\\left( x-2\\right)\\cdot\\left(\\frac{\\left( x-3\\right)\\cdot341}{4000}+\\frac{\\left( x-1\\right)\\cdot333}{5000}\\right)+\\frac{\\left( x-1\\right)\\cdot\\left( x-3\\right)\\cdot-709}{5000}"
// prettier-ignore
export const PMs_html = '<span class="math-parenthesis math-round-parenthesis">(</span><span class="math-symbol">x</span><span class="math-operator math-binary-operator math-explicit-binary-operator">-</span><span class="math-number">2</span><span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-binary-operator math-explicit-binary-operator">*</span><span class="math-parenthesis math-round-parenthesis">(</span><span class="math-parenthesis math-round-parenthesis">(</span><span class="math-symbol">x</span><span class="math-operator math-binary-operator math-explicit-binary-operator">-</span><span class="math-number">3</span><span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-binary-operator math-explicit-binary-operator">*</span><span class="math-number">341</span><span class="math-operator math-binary-operator math-explicit-binary-operator">/</span><span class="math-number">4000</span><span class="math-operator math-binary-operator math-explicit-binary-operator">+</span><span class="math-parenthesis math-round-parenthesis">(</span><span class="math-symbol">x</span><span class="math-operator math-binary-operator math-explicit-binary-operator">-</span><span class="math-number">1</span><span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-binary-operator math-explicit-binary-operator">*</span><span class="math-number">333</span><span class="math-operator math-binary-operator math-explicit-binary-operator">/</span><span class="math-number">5000</span><span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-binary-operator math-explicit-binary-operator">+</span><span class="math-parenthesis math-round-parenthesis">(</span><span class="math-symbol">x</span><span class="math-operator math-binary-operator math-explicit-binary-operator">-</span><span class="math-number">1</span><span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-binary-operator math-explicit-binary-operator">*</span><span class="math-parenthesis math-round-parenthesis">(</span><span class="math-symbol">x</span><span class="math-operator math-binary-operator math-explicit-binary-operator">-</span><span class="math-number">3</span><span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-binary-operator math-explicit-binary-operator">*</span><span class="math-operator math-unary-operator math-lefthand-unary-operator">-</span><span class="math-number">709</span><span class="math-operator math-binary-operator math-explicit-binary-operator">/</span><span class="math-number">5000</span>'

export const PMlineChartTitle = "DogeCoin US Dollars Price from Jan 1 2022 to Oct 1 2022";