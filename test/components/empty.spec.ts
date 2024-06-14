import { createFixture } from '@aurelia/testing';
import { bootstrapTestEnvironment } from '../bootstrap-tests';
import {Empty} from "../../src/components/empty/empty";

describe('Empty component', () => {
    beforeAll(() => {
        bootstrapTestEnvironment();
    });

    it('Renders the element', async () => {
        const { appHost, component, startPromise, tearDown } = createFixture(
            '<empty></empty>',
            class ViewModel {},
            [Empty]
        );

        await startPromise;

        expect(appHost.textContent).toContain('');

        await tearDown();
    });
});
