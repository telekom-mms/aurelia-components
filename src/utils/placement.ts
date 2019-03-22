
export enum VerticalAlign {
    BOTTOM_TOP,
    MIDDLE,
    TOP_BOTTOM,
}

export enum HorizontalAlign {
    LEFT_LEFT,
    CENTER,
    RIGHT_RIGHT,
}

/**
 * Places HTML elements
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class Placement {

    /**
     * Places the source element align relative to the target element
     */
    static placeRelative(
        sourceElement:HTMLElement|string,
        targetElement:HTMLElement|string,
        vertical:VerticalAlign=VerticalAlign.TOP_BOTTOM,
        horizontal:HorizontalAlign=HorizontalAlign.CENTER,
    ) {
        if (typeof sourceElement === 'string') {
            sourceElement = document.querySelector(sourceElement) as HTMLElement
        }
        if (typeof targetElement === 'string') {
            targetElement = document.querySelector(targetElement) as HTMLElement
        }

        sourceElement.style.position='fixed';
        const rect = targetElement.getBoundingClientRect();

        switch (vertical) {
            case VerticalAlign.TOP_BOTTOM:
                sourceElement.style.top = (rect.top + rect.height)+"px";
                break;
            case VerticalAlign.BOTTOM_TOP:
                sourceElement.style.top = (rect.top - rect.height)+"px";
                break;
            default:
            // Not implemented
        }

        switch (horizontal) {
            case HorizontalAlign.LEFT_LEFT:
                sourceElement.style.left = (rect.left) + "px";
                break;
            case HorizontalAlign.RIGHT_RIGHT:
                sourceElement.style.left = (rect.left - (sourceElement.offsetWidth-rect.width)) + "px";
                break;
            case HorizontalAlign.CENTER:
            default:
                sourceElement.style.left = (rect.left + ((rect.width-sourceElement.offsetWidth)/2)) + "px";
        }
    }
}
