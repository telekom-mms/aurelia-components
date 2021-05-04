/**
 * Event aggregator event for updating view components.
 * @see MomentCustomAttribute
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class UiUpdateEvent {
    static get NAME():string {
        return 'ui-updated'
    }
}
