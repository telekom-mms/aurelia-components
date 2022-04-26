import {bytesMap, getFactor, kiloMap} from "../../src/utils/numbers";

const bytesData = [
  {
    input: 0,
    expectedFactor: 1,
    expectedLabel: ' Bytes'
  },
  {
    input: 1,
    expectedFactor: 1,
    expectedLabel: ' Bytes'
  },
  {
    input: 1023,
    expectedFactor: 1,
    expectedLabel: ' Bytes'
  },
  {
    input: 1024,
    expectedFactor: 1024,
    expectedLabel: ' KiB'
  },
  {
    input: 1025,
    expectedFactor: 1024,
    expectedLabel: ' KiB'
  },
  {
    input: Math.pow(1024,2),
    expectedFactor: Math.pow(1024,2),
    expectedLabel: ' MiB'
  },
  {
    input: Math.pow(1024,3),
    expectedFactor: Math.pow(1024,3),
    expectedLabel: ' GiB'
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
    const {factor: factor, label: label} = getFactor(data.input, bytesMap);
    expect(factor).toEqual(data.expectedFactor);
    expect(label).toEqual(data.expectedLabel);
  });
});

test("formatted bytesMap", () => {
  const bytes = 1300;
  const {factor: factor, label: label} = getFactor(bytes, bytesMap);
  const formatted = `${(bytes/factor).toFixed(1)}${label}`
  expect(formatted).toBe("1.3 KiB");
})

describe.each(kiloData)('getFactorLabel on kiloMap', (data) => {
  it(`number '${data.input}'`, () => {
    const {factor: factor, label: label} = getFactor(data.input, kiloMap);
    expect(factor).toEqual(data.expectedFactor);
    expect(label).toEqual(data.expectedLabel);
  });
});

test("formatted kiloMap", () => {
  const posts = 1300;
  const {factor: factor, label: label} = getFactor(posts, kiloMap);
  const formatted = `${(posts/factor).toFixed(1)}${label}`
  expect(formatted).toBe("1.3k");
})
