import {createFixture} from '@aurelia/testing';
import {bootstrapTestEnvironment} from '../bootstrap-tests';
import {ReverseValueConverter} from "../../src/value-converters/reverse-value-converter";

describe(ReverseValueConverter, () => {
    beforeAll(() => {
        bootstrapTestEnvironment();
    });

    // Integration Test
    it('works within a view', async () => {
        class ViewModel {
            list = ["Eins", "Zwei", "Drei"]
        }

        const { appHost, startPromise, tearDown } = createFixture(
            '<span repeat.for="number of list | reverse">${number}</span>',
            ViewModel,
            [ReverseValueConverter]
        );

        await startPromise;

        expect(appHost.textContent).toBe('DreiZweiEins');

        await tearDown();
    });
});
