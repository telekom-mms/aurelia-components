import {TimeComponents, toMilliseconds, toSeconds} from "../../src/utils/time";

test('test components to ms', () => {
  expect(toMilliseconds({seconds: 12})).toBe(12000);
});

test('test full time components to seconds', () => {
  const components: TimeComponents = {
    hours: 7,
    minutes: 34,
    seconds: 12,
    ms: 123
  }
  expect(toSeconds(components)).toBe(27252.123);
});
