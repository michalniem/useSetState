import isFunction from "../isFunction";

describe("isFunction", () => {
  it("should return true if passed argument is instanceof Function", () => {
    const exampleFunction = () => {};
    expect(isFunction(exampleFunction)).toBeTruthy()
  });

  it("should return false if passed argument is not instanceof Function", () => {
    const exampleNotFunctionInputs = ["string", 123, null, undefined, {}, true]
    exampleNotFunctionInputs.forEach(element => {
      expect(isFunction(element)).toBeFalsy()
    });
  });
});
