import React, { Fragment, useEffect } from "react";
import { mount } from "enzyme";

import useSetState from "../useSetState";

const ComponentForHooksTest = (testedHook) => ({
  initialState = {},
  payload,
  callback = () => {},
  getHookData = () => {},
}) => {
  const [data, setter] = testedHook(initialState);

  useEffect(() => {
    if (data !== initialState) {
      getHookData(data);
    }
  }, [data, getHookData]);

  return (
    <Fragment>
      <button
        data-test-id="testedButton"
        onClick={() => {
          setter(payload, callback);
        }}
      ></button>
    </Fragment>
  );
};

describe("ComponentWithHooksToTest tests", () => {
  it("should setState if passed argument is an object", () => {
    const getHookDataSpy = jest.fn();
    const ComponentWithHook = ComponentForHooksTest(useSetState);
    const examplePayloadAsObject = { type: "payloadAsObject" };

    const component = mount(
      <ComponentWithHook
        payload={examplePayloadAsObject}
        getHookData={getHookDataSpy}
      />
    );

    const button = component.find("[data-test-id='testedButton']");

    button.simulate("click");

    expect(getHookDataSpy).toHaveBeenCalledWith(examplePayloadAsObject);
  });

  it("should setState if passed argument is a function", () => {
    const getHookDataSpy = jest.fn();
    const ComponentWithHook = ComponentForHooksTest(useSetState);
    const examplePayloadAsFunction = { type: "payloadAsFunction" };

    const component = mount(
      <ComponentWithHook
        payload={() => examplePayloadAsFunction}
        getHookData={getHookDataSpy}
      />
    );
    const button = component.find("[data-test-id='testedButton']");

    button.simulate("click");

    expect(getHookDataSpy).toHaveBeenCalledWith(examplePayloadAsFunction);
  });

  it("should invoke callback funtion after state changes", () => {
    const callbackSpy = jest.fn();
    const ComponentWithHook = ComponentForHooksTest(useSetState);

    const examplePayload = { type: "payload" };

    const component = mount(
      <ComponentWithHook
        payload={examplePayload}
        callback={callbackSpy}
      />
    );
    const button = component.find("[data-test-id='testedButton']");

    button.simulate("click");

    expect(callbackSpy).toHaveBeenCalled();
  });
});
