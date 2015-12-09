export default function tryResult(expressionFn, catchExpression) {
  try {
    return expressionFn();
  } catch (e) {
    return catchExpression(e);
  }
}
