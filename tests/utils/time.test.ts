import {
  addTimedelta, calcDuration,
  DateTimeComponents, negateDateTimeComponents,
  normalizeTime, setComponents, subtractTimedelta,
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

test("add/substract time", () => {
  const startDate = new Date(0);
  const components: DateTimeComponents = {
    years: 4,
    months: 14,
    days: 36,
    hours: 36,
    minutes: 66,
    seconds: 122,
    ms: 4000
  }
  const later = addTimedelta(startDate, components);
  expect(later.toISOString()).toBe("1975-04-07T13:08:06.000Z")

  const before = subtractTimedelta(later, components);
  expect(before.toISOString()).toBe(startDate.toISOString());
});

test("calcDuration", () => {
  const components: DateTimeComponents = {
    years: 4,
    months: 14,
    days: 36,
    hours: 36,
    minutes: 66,
    seconds: 122,
    ms: 4000
  }

  const startDate = new Date(0);
  const endDate = addTimedelta(startDate, components);
  expect(endDate.toISOString()).toBe("1975-04-07T13:08:06.000Z");

  const duration = calcDuration(startDate, endDate);
  const newEndDate = addTimedelta(startDate, duration);
  expect(newEndDate.toISOString()).toBe(endDate.toISOString());
});

const componentsData:{input:DateTimeComponents, expectedFormat: string}[] = [
  {
    input: {hours: 12, minutes: 34, seconds: 56},
    expectedFormat: "1970-01-01T11:34:56.000Z"
  },
  {
    input: {months: 2, days: 32},
    expectedFormat: "1970-04-01T00:00:00.000Z"
  },
];

describe.each(componentsData)('setComponents', (data) => {
  it(`components '${toMilliseconds(data.input)}'`, () => {
    const newDate = setComponents(new Date(0), data.input);
    expect(newDate.toISOString()).toBe(data.expectedFormat);
  });
});

test('negation of arbitrary properties is handled correctly', () => {
  let anyObject: any = {
    minutes: 3,
    a: true
  }
  const anyObjectNegated = {
    minutes: -3,
    a: true
  }

  anyObject = negateDateTimeComponents(anyObject)
  expect(anyObject).toStrictEqual(anyObjectNegated)
})
