/**
 * Sets a variable to false if the click event has been bubbled to the window object
 * Usage: <div false-on-click.two-way="_open">
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class FalseOnClickCustomAttribute {
    public value:boolean;
    private _listener:EventListener;
    constructor() {
        this._listener = (event) => {
            this.value = false;
        };
    }

    valueChanged(newValue:boolean) {
        if (newValue) {
            window.setTimeout(()=>{
                window.addEventListener("click", this._listener);
            });
        } else {
            window.removeEventListener("click", this._listener);
        }
    }
}
