import { isFunction } from "./value";

it("should return true if input is a function", () => {
  const f = () => {};
  expect(isFunction(f)).toBe(true);
});
