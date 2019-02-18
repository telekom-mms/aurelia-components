/**
 * Repeats a value string n times
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class RepeatStringValueConverter {
    toView(
        value:string,
        count:number=2
    ) {
        return value.repeat(count);
    }
}
