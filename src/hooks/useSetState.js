import { useState, useEffect, useRef } from "react";

import isFunction from "../helpers/isFunction";
import isPlainObject from "../helpers/isPlainObject";

function useSetState(initialState = {}, props = {}) {
  const [state, setState] = useState(initialState);
  const callbackFuncRef = useRef(null);

  useEffect(() => {
    if (callbackFuncRef.current) callbackFuncRef.current();
  }, [state]);

  const updater = (updateFunctionOrState = {}, callback) => {
    callbackFuncRef.current = callback;
    if (isPlainObject(updateFunctionOrState)) {
      setState((state) => ({ ...state, ...updateFunctionOrState }));
    } else if (isFunction(updateFunctionOrState)) {
      setState((state) => ({
        ...state,
        ...updateFunctionOrState(state, props),
      }));
    } else {
      throw new Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
      );
    }
  };

  return [state, updater];
}

export default useSetState;
