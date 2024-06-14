import {createFixture} from '@aurelia/testing';
import {bootstrapTestEnvironment} from '../bootstrap-tests';
import {ObjectKeysValueConverter} from "../../src/value-converters/object-keys-value-converter";

describe(ObjectKeysValueConverter, () => {
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
            '${data|objectKeys}',
            ViewModel,
            [ObjectKeysValueConverter]
        );

        await startPromise;

        expect(appHost.textContent).toBe('name,otherKey');

        await tearDown();
    });
});
