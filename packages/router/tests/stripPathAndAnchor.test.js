import { stripPathAndAnchor } from "../utility";

it.each([
  ["/", ["/", ""]],
  ["/my-route", ["/my-route", ""]],
  ["/#123", ["/", "#123"]],
  ["/my-route#anchor#123", ["/my-route", "#anchor#123"]],
  ["/my-route#123", ["/my-route", "#123"]],
  ["/route/nested#123", ["/route/nested", "#123"]],
  ["/route/nested/nested#123", ["/route/nested/nested", "#123"]],
  [undefined, ["", ""]],
  [null, ["", ""]],
  [{}, ["", ""]],
  [[], ["", ""]],
])("should split path and anchor correctly case : '%s' => %s", (input, expected) => {
  expect(stripPathAndAnchor(input)).toStrictEqual(expected);
});
