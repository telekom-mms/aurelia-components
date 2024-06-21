import {bytesMap, calcFloatingPrecision, getFactor, kiloMap, round} from "../../src/utils/numbers";

const bytesData = [
  {
    input: 0,
    expectedFactor: 1,
    expectedLabel: 'Bytes'
  },
  {
    input: 1,
    expectedFactor: 1,
    expectedLabel: 'Bytes'
  },
  {
    input: 1023,
    expectedFactor: 1,
    expectedLabel: 'Bytes'
  },
  {
    input: 1024,
    expectedFactor: 1024,
    expectedLabel: 'KiB'
  },
  {
    input: 1025,
    expectedFactor: 1024,
    expectedLabel: 'KiB'
  },
  {
    input: Math.pow(1024,2),
    expectedFactor: Math.pow(1024,2),
    expectedLabel: 'MiB'
  },
  {
    input: Math.pow(1024,3),
    expectedFactor: Math.pow(1024,3),
    expectedLabel: 'GiB'
  },
];

describe.each(bytesData)('getFactorLabel on bytesMap', (data) => {
  it(`bytes '${data.input}'`, () => {
    const {factor: factor, unit: label} = getFactor(data.input, bytesMap);
    expect(factor).toEqual(data.expectedFactor);
    expect(label).toEqual(data.expectedLabel);
  });
});

test("formatted bytesMap", () => {
  const bytes = 1300;
  const {factor: factor, unit: label} = getFactor(bytes, bytesMap);
  const formatted = `${(bytes/factor).toFixed(1)} ${label}`
  expect(formatted).toBe("1.3 KiB");
})

const kiloData = [
  {
    input: 0,
    precision: 0,
    expectedFormat: "0"
  },
  {
    input: 1,
    precision: 0,
    expectedFormat: "1",
  },
  {
    input: 999,
    precision: 0,
    expectedFormat: "999",
  },
  {
    input: 1000,
    precision: 0,
    expectedFormat: "1k",
  },
  {
    input: 1300,
    precision: 1,
    expectedFormat: "1.3k",
  },
  {
    input: Math.pow(1000,2),
    precision: 0,
    expectedFormat: "1M"
  },
];

describe.each(kiloData)('kiloMap', (data) => {
  it(`number '${data.input}'`, () => {
    const {factor: factor, unit: label} = getFactor(data.input, kiloMap);
    const formatted = `${(data.input/factor).toFixed(data.precision)}${label}`
    expect(formatted).toBe(data.expectedFormat);
  });
});

const roundData = [
  {
    input: 13.37,
    precision: 1,
    expected: 13.4,
  },
  {
    input: 13.37,
    precision: 2,
    expected: 13.37,
  },
  {
    input: 13.37,
    precision: 3,
    expected: 13.370,
  },
  {
    input: 13.371337,
    precision: 5,
    expected: 13.37134,
  },
  {
    input: 13.37,
    precision: 0,
    expected: 13,
  },
];

describe.each(roundData)('round', (data) => {
  it(`round '${data.input}/${data.precision}'`, () => {
    expect(round(data.input, data.precision)).toEqual(data.expected);
  });
});

test("calcFloatingPointPrecision", () => {
  const value = 0.000123
  const precision = calcFloatingPrecision(value, 3)
  expect(precision).toBe(6)
})
