export class Clipboard {
    /**
     * Workaround for copying to clipboard for applications in frames
     * @see https://github.com/storybookjs/storybook/pull/13777/files
     * @param text
     */
    writeText(text: string): Promise<void> {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            const tmp = document.createElement('TEXTAREA') as HTMLTextAreaElement;
            const focus = document.activeElement as HTMLElement;
            tmp.value = text;

            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp);
            focus.focus();

            return Promise.resolve();
        }
    }
}
