import { fragmentize } from "../utility";

it.each([
  ["/", [""]],
  ["/user", ["user"]],
  ["/user/:id", ["user", ":id"]],
])("should split path into fragments '%s'", (input, expected) => {
  expect(fragmentize(input)).toStrictEqual(expected);
});
