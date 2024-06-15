import {DI} from "aurelia";
import {AbstractLocaleValueConverter} from "../../src/value-converters/abstract-locale-value-converter";
import {I18N, I18nConfiguration} from "@aurelia/i18n";
import {sleep} from "../../src/utils/time";

class TestValueConverter extends AbstractLocaleValueConverter {
}

describe(AbstractLocaleValueConverter, () => {
    // beforeAll(() => {
    //     bootstrapTestEnvironment();
    // });
    const container = DI.createContainer()
    container.register(
        I18nConfiguration.customize((options) => {
            options.initOptions = {
                resources: {
                    en: { translation: { key: "Hello I18N"} },
                    de: { translation: { key: "Hallo I18N"} },
                }
            };
        })
    )
    const i18n = container.get(I18N)
    const abstractValueConverter = container.get(TestValueConverter)

    test("locale changes when I18N locale changes", async () => {
        const targetLocale = "ch"
        i18n.setLocale(targetLocale)
        expect(i18n.getLocale()).toEqual(targetLocale)
        await sleep({ms: 100});
        expect(abstractValueConverter.getLocale()).toEqual(targetLocale)
    })
})
