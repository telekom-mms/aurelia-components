import {createFixture} from '@aurelia/testing';
import {bootstrapTestEnvironment} from '../bootstrap-tests';
import {ObjectValuesValueConverter} from "../../src/value-converters/object-values-value-converter";

describe(ObjectValuesValueConverter, () => {
    beforeAll(() => {
        bootstrapTestEnvironment();
    });

    // Integration Test
    it('works within a view', async () => {
        class ViewModel {
            data = {
                name: "value",
                otherKey: "otherValue"
            }
        }

        const { appHost, startPromise, tearDown } = createFixture(
            '${data|objectValues}',
            ViewModel,
            [ObjectValuesValueConverter]
        );

        await startPromise;

        expect(appHost.textContent).toBe('value,otherValue');

        await tearDown();
    });
});
