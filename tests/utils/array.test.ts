import {unique} from "../../src/utils/array";

test('test unique', () => {
  const array = ["a", "a", "b", "b", "c", "c", "d"];
  const uniqueArray = unique(array, (a, b) => a.localeCompare(b));
  expect(uniqueArray).toStrictEqual(["a", "b", "c", "d"]);
});
