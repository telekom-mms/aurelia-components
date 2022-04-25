import {
  addTimedelta,
  DateTimeComponents,
  normalizeTime, subtractTimedelta,
  TimeComponents,
  toMilliseconds,
  toSeconds
} from "../../src/utils/time";

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

test("normalize time", () => {
  const components: TimeComponents = {
    hours: 4,
    minutes: 5,
    seconds: 0,
    ms: 0,
  }
  const now = new Date();
  const normalizeDate = normalizeTime(now, components)
  expect(normalizeDate.getHours()%components.hours).toBe(0);
  expect(normalizeDate.getMinutes()%components.minutes).toBe(0);
  expect(normalizeDate.getSeconds()).toBe(0);
})

test("add time", () => {
  const start = new Date(0);
  const components: DateTimeComponents = {
    years: 4,
    months: 2,
    days: 30,
    hours: 12,
    minutes: 33,
    seconds: 10,
    ms: 1
  }
  const later = addTimedelta(start, components);

  expect(later.toISOString()).toBe("1974-03-31T12:33:10.001Z")
});

test("substract time", () => {
  const start = new Date("1974-03-31T12:33:10.001Z");
  const components: DateTimeComponents = {
    years: 2,
    months: 14,
    days: 40,
    hours: 36,
    minutes: 66,
    seconds: 122,
    ms: 4000
  }
  const later = subtractTimedelta(start, components);
  expect(later.toISOString()).toBe("1970-12-20T23:25:04.001Z");
})
