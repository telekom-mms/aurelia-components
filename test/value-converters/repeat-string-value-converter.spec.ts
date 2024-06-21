import {createFixture} from '@aurelia/testing';
import {bootstrapTestEnvironment} from '../bootstrap-tests';
import {ReverseValueConverter} from "../../src/value-converters/reverse-value-converter";
import {RepeatStringValueConverter} from "../../src/value-converters/repeat-string-value-converter";

describe(RepeatStringValueConverter, () => {
    beforeAll(() => {
        bootstrapTestEnvironment();
    });

    // Integration Test
    it('works within a view', async () => {
        class ViewModel {
        }

        const { appHost, startPromise, tearDown } = createFixture(
            '${"maus"|repeat:5}',
            ViewModel,
            [RepeatStringValueConverter]
        );

        await startPromise;

        expect(appHost.textContent).toBe('mausmausmausmausmaus');

        await tearDown();
    });
});
