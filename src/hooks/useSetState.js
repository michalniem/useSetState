import { useState, useEffect, useRef } from "react";

import isFunction from "../helpers/isFunction";
import isPlainObject from "../helpers/isPlainObject";

const noopFunction = () => {};

function useSetState(initialState = {}, props = {}) {
  const [state, setState] = useState({
    value: initialState,
    callback: noopFunction,
  });

  useEffect(() => {
    state.callback();
  }, [state]);

  const updater = (updateFunctionOrState = {}, callback = noopFunction) => {
    if (isPlainObject(updateFunctionOrState)) {
      setState({
        callback,
        value: { ...state.value, ...updateFunctionOrState },
      });
    } else if (isFunction(updateFunctionOrState)) {
      setState({
        callback,
        value: { ...state.value, ...updateFunctionOrState(state.value, props) },
      });
    } else {
      throw new Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
      );
    }
  };

  return [state.value, updater];
}

export default useSetState;
