import { isFlag } from "..";
import { FLAGS_FORCE_RERENDER, FLAGS_RENDER_IF } from "../../../constants";

test("is-flag forceRerender test", () => {
  expect(isFlag(FLAGS_FORCE_RERENDER)).toBe(true);
});

test("is-flag renderIf test", () => {
  expect(isFlag(FLAGS_RENDER_IF)).toBe(true);
});

test("is-flag null test", () => {
  expect(isFlag(null)).toBe(false);
});

test("is-flag undefined test", () => {
  expect(isFlag(undefined)).toBe(false);
});

test("is-flag empty-string test", () => {
  expect(isFlag("")).toBe(false);
});

test("is-flag blank-string test", () => {
  expect(isFlag(" ")).toBe(false);
});

test("is-flag any-string test", () => {
  expect(isFlag("any string")).toBe(false);
});
