import {
    RenderInstruction,
    ValidateResult, validateTrigger,
    ValidationController,
    ValidationControllerFactory,
    ValidationRules
} from "aurelia-validation";

/**
 * Form validation renderer for bootstrap 4
 * @see https://aurelia.io/docs/plugins/validation#custom-renderers
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class Bootstrap4FormValidationRenderer {
    render(instruction: RenderInstruction) {
        for (let { result, elements } of instruction.unrender) {
            for (let element of elements) {
                this.remove(element, result);
            }
        }

        for (let { result, elements } of instruction.render) {
            for (let element of elements) {
                this.add(element, result);
            }
        }
    }

    add(element: Element, result: ValidateResult) {
        if (result.valid) {
            return;
        }

        element.classList.add('is-invalid');

        // add help-block
        const message = document.createElement('div');
        message.className = 'invalid-feedback';
        message.textContent = result.message;
        message.id = `validation-message-${result.id}`;
        element.parentElement.appendChild(message);
    }

    remove(element: Element, result: ValidateResult) {
        if (result.valid) {
            return;
        }

        element.classList.remove("is-invalid");

        // remove help-block
        const message = element.parentElement.querySelector(`#validation-message-${result.id}`);
        if (message) {
            element.parentElement.removeChild(message);
        }
    }
}
