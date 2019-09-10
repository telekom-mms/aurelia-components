/**
 * Reverses an array
 * @author Christoph Reinsch <christoph.reinsch@t-systems.com>
 * Usage: ${list|reverse}
 */
export class ReverseValueConverter {
    toView(value: []) {
        return value.reverse();
    }
}
