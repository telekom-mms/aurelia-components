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

const kiloData = [
  {
    input: 0,
    expectedFactor: 1,
    expectedLabel: ''
  },
  {
    input: 1,
    expectedFactor: 1,
    expectedLabel: ''
  },
  {
    input: 999,
    expectedFactor: 1,
    expectedLabel: ''
  },
  {
    input: 1000,
    expectedFactor: 1000,
    expectedLabel: 'k'
  },
  {
    input: Math.pow(1000,2),
    expectedFactor: Math.pow(1000,2),
    expectedLabel: 'M'
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

describe.each(kiloData)('getFactorLabel on kiloMap', (data) => {
  it(`number '${data.input}'`, () => {
    const {factor: factor, unit: label} = getFactor(data.input, kiloMap);
    expect(factor).toEqual(data.expectedFactor);
    expect(label).toEqual(data.expectedLabel);
  });
});

test("formatted kiloMap", () => {
  const posts = 1300;
  const {factor: factor, unit: label} = getFactor(posts, kiloMap);
  const formatted = `${(posts/factor).toFixed(1)}${label}`
  expect(formatted).toBe("1.3k");
})

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
  it(`'${data.input}/${data.precision}'`, () => {
    expect(round(data.input, data.precision)).toEqual(data.expected);
  });
});


const precisionData = [
  {
    input: 0.000123,
    expected: 5,
  },
  {
    input: 0.0137,
    expected: 3,
  },
  {
    input: 0.137,
    expected: 2,
  },
];

describe.each(precisionData)('calcFloatingPointPrecision', (data) => {
  it(`'${data.input}'`, () => {
    expect(calcFloatingPrecision(data.input, 2)).toEqual(data.expected);
  });
});
