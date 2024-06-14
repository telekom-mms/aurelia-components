import { createFixture } from '@aurelia/testing';
import { bootstrapTestEnvironment } from '../bootstrap-tests';
import {BecomeVisibleCustomAttribute} from "../../src/attributes/become-visible-custom-attribute";

describe('BecomeVisibleCustomAttribute', () => {
    beforeAll(() => {
        // Initialize the test environment before running the tests
        bootstrapTestEnvironment();

        // IntersectionObserver isn't available in test environment
        // https://stackoverflow.com/questions/44249985/testing-code-that-uses-an-intersectionobserver
        const mockIntersectionObserver = jest.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null
        });
        window.IntersectionObserver = mockIntersectionObserver;
    });

    it('renders', async () => {
        class ViewModel {
            visible:boolean
            private _elementVisibility($event:CustomEvent) {
                this.visible = $event.detail
            }
        }
        const { appHost, component, startPromise, tearDown } = createFixture(
            '<div become-visible visible.trigger="_elementVisibility($event)"></div>',
            ViewModel,
            [BecomeVisibleCustomAttribute]
        );

        await startPromise;
        const viewModel = appHost as unknown as ViewModel
        expect(viewModel.visible).toBe(undefined);
        await tearDown();
    });
});
