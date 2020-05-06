import isPlainObject from "../isPlainObject";

describe("isPlainObject", () => {
  it("should return true if passed argument is plain object", () => {
    const examplePlainObject = {};
    expect(isPlainObject(examplePlainObject)).toBeTruthy()
  });

  it("should return false if passed argument is not instanceof Function", () => {
    const exampleNotPlainObjects = ["string", 123, null, undefined, () => {}, true]
    exampleNotPlainObjects.forEach(element => {
      expect(isPlainObject(element)).toBeFalsy()
    });
  });
});
