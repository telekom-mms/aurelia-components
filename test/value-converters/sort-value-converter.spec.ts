import {createFixture} from '@aurelia/testing';
import {bootstrapTestEnvironment} from '../bootstrap-tests';
import {SortValueConverter} from "../../src/value-converters/sort-value-converter";

type Animal = {
    name: {
        shortName: string
    }
}

const sortData = [
    {
        input: ["false", 3, undefined, "0", 7, "true", false, "string", -5, null, {}, true, 1, "tall", "ferengi"],
        testSlice: 13,
        expected: [-5, {}, "0", 1, 3, 7, "false", false, "ferengi", "string", "tall", "true", true]
    },
];

describe.each(sortData)(`toView`, (data) => {
    it(`sort '${data.input}'`, () => {
        const formatted = sortValueConverter.toView(data.input);
        expect(formatted.slice(0, data.testSlice)).toEqual(data.expected);
    });
});

describe(SortValueConverter, () => {
    let testContext
    beforeAll(() => {
        bootstrapTestEnvironment();
    });

    // Integration Test
    it('works within a view', async () => {
        class ViewModel {
            list:Animal[] = [
                {name: {shortName: "Katze"}},
                {name: {shortName: "Affe"}},
                {name: {shortName: "Kuh"}}
            ]
        }
        const { appHost, startPromise, tearDown } = createFixture(
            '<span repeat.for="animal of list | sort:\'name.shortName\':-1">${animal.name.shortName}</span>',
            ViewModel,
            [SortValueConverter]
        );

        await startPromise;

        expect(appHost.textContent).toBe('KuhKatzeAffe');

        await tearDown();
    });
});
