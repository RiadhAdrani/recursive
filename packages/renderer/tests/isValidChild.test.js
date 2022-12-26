import { isValidChild } from "../utility";

it.each([
  [undefined, false],
  [null, false],
  ["", false],
  ["Hello World", true],
])("should evalute '%s' expected -> '%s'", (child, expected) => {
  expect(isValidChild(child)).toBe(expected);
});
