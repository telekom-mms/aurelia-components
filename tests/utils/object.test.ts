import {clone} from "../../src/utils/object";

test('deep clone object', () => {
  const object = {
    "prop": {
      "name": "Katze"
    }
  }

  const cloned = clone(object);
  cloned["prop"]["name"] = "Kuh";

  expect(object["prop"]["name"]).toBe("Katze");
  expect(cloned["prop"]["name"]).toBe("Kuh");
});

test('deep clone instance', () => {

  class Test {
    name = "Katze";
    child: Test = null;
  }

  const instance = new Test();
  instance.child = new Test()

  const cloned = clone(instance) as Test;
  cloned.child.name = "Kuh";

  expect(instance.child.name).toBe("Katze");
  expect(cloned.child.name).toBe("Kuh");
});
