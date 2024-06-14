import { createFixture } from '@aurelia/testing';
import { bootstrapTestEnvironment } from '../bootstrap-tests';
import {MomentCustomAttribute} from "../../src/attributes/moment-custom-attribute";
import {DI, IEventAggregator} from "aurelia";
import {UiUpdateEvent} from "../../src/events/ui-update-event";

const container = DI.createContainer()

describe('MomentCustomAttribute', () => {
    beforeAll(() => {
        // Initialize the test environment before running the tests
        bootstrapTestEnvironment();
    });

    it('renders', async () => {
        class ViewModel {
            time = new Date()
        }
        const { appHost, component, startPromise, tearDown } = createFixture(
            '<div moment.bind="time"></div>',
            ViewModel,
            [MomentCustomAttribute]
        );

        await startPromise;

        const eventAggregator = container.get(IEventAggregator)
        eventAggregator.publish(UiUpdateEvent.NAME, new UiUpdateEvent())

        const viewModel = appHost as unknown as ViewModel
        expect(appHost.textContent).toBe("a few seconds ago")
        await tearDown();
    });
});
