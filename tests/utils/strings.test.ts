
import {createRegexpFromSearchString} from "../../src/utils/strings";

const stringsData = [
  {
    input: "a",
    expected: '(a)'
  },
  {
    input: "[a]",
    expected: '(\\[a\\])'
  },
  {
    input: "(a)",
    expected: '(\\(a\\))'
  },
];


describe.each(stringsData)('createRegexpFromSearchString', (data) => {
  it(`input '${data.input}'`, () => {
    const regExp = createRegexpFromSearchString(data.input);
    expect(regExp.source).toEqual(data.expected);
  });
});
