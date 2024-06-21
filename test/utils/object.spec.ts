import {recursiveObjectSort, clone} from "../../src/utils/object";

type Animal = {
    name: string,
    years: number,
    ascendant?: Animal
}

const human:Animal = {
    name: "Human",
    years: 50000,
    ascendant: {
        name: "Ape",
        years: 300000000,
        ascendant: {
            name: "Amoebe",
            years: 45000000000
        }
    }
}

test("recursiveObjectSort", () => {
    const sorted = recursiveObjectSort(human)
    expect(Object.keys(sorted)).toEqual(["ascendant", "name", "years"]);
});

test("clone", () => {
    const dolly = clone(human)
    dolly.name = "Sheep"
    expect(dolly.name).not.toBe(human.name)
});
