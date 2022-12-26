import { resolvePath } from "../utility";

it.each([
  ["/", ["/", "/", ""]],
  ["/#anchor", ["/#anchor", "/", "#anchor"]],
  ["/user", ["/user", "/user", ""]],
  ["/user2", ["/user2", "/404", ""]],
  ["/user/id/2", ["/user/id/2", "/user/id/:id", ""]],
  ["/user/id/2/not-found", ["/user/id/2/not-found", "/404", ""]],
  ["/user/id/2#something", ["/user/id/2#something", "/user/id/:id", "#something"]],
  ["/user/id/2/about", ["/user/id/2/about", "/user/id/:id/about", ""]],
  [
    "/user/id/2/about#something",
    ["/user/id/2/about#something", "/user/id/:id/about", "#something"],
  ],
  ["/user/id/2/about/page/1", ["/user/id/2/about/page/1", "/user/id/:id/about/page/:page", ""]],
  [
    "/user/id/2/about/page/1#something",
    ["/user/id/2/about/page/1#something", "/user/id/:id/about/page/:page", "#something"],
  ],
  ["/user/id/2/about/page/1/not-found", ["/user/id/2/about/page/1/not-found", "/404", ""]],
  [
    "/user/id/2/about/page/1/section/education",
    [
      "/user/id/2/about/page/1/section/education",
      "/user/id/:id/about/page/:page/section/:section",
      "",
    ],
  ],
  [
    "/user/id/2/about/page/1/section/education#anchor",
    [
      "/user/id/2/about/page/1/section/education#anchor",
      "/user/id/:id/about/page/:page/section/:section",
      "#anchor",
    ],
  ],
  [
    "/user/id/2/about/page/1/section/education/not-found",
    ["/user/id/2/about/page/1/section/education/not-found", "/404", ""],
  ],
  ["/test", ["/test/nested", "/test/nested", ""]],
  ["/test2", ["/test2/nested", "/404", ""]],
])("should resolve path correctly : '%s' ", (input, expected) => {
  const routes = {
    "/": {},
    "/user": {},
    "/user/id/:id": {},
    "/user/id/:id/about": {},
    "/user/id/:id/about/page/:page": {},
    "/user/id/:id/about/page/:page/section/:section": {},
    "/test": { redirectTo: "/test/nested" },
    "/test/nested": {},
    "/test2": { redirectTo: "/test2/nested" },
  };

  expect(resolvePath(input, routes)).toStrictEqual(expected);
});
