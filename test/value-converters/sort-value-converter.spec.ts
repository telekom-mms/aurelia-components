import {createFixture} from '@aurelia/testing';
import {bootstrapTestEnvironment} from '../bootstrap-tests';
import {SortValueConverter} from "../../src/value-converters/sort-value-converter";

type Animal = {
    name: {
        shortName: string
    }
}
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
