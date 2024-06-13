import {createFixture, TestContext} from '@aurelia/testing';
import { bootstrapTestEnvironment } from '../bootstrap-tests';
import {NumberValueConverter} from "../../src/value-converters/number-value-converter";

describe('number-value-converter', () => {
    let testContext
    beforeAll(() => {
        bootstrapTestEnvironment();
    });

    beforeEach(() => {
        testContext = TestContext.create();
        const numberValueFormatter = testContext.container.get(NumberValueConverter);
        numberValueFormatter.setLocale("de")
    })

    // Integration Test
    it('works within a view', async () => {
        const { appHost, startPromise, tearDown } = createFixture(
            '<div>${numberUnderTest | number}</div>',
            class App {
                numberUnderTest = 13.37;
            },
            [NumberValueConverter],
            true,
            testContext
        );

        await startPromise;

        expect(appHost.textContent).toBe('13,37');

        await tearDown();
    });
});
