import { useState, useEffect, useRef } from "react";

import isFunction from "../helpers/isFunction";
import isPlainObject from "../helpers/isPlainObject";

const noopFunction = () => {}

function useSetState(initialState = {}, props = {}) {
  const [state, setState] = useState(initialState);
  const callbackRef = useRef(noopFunction);

  useEffect(() => {
    callbackRef.current()
  }, [state, callbackRef])

  const updater = (updateFunctionOrState = {}, callback = noopFunction) => {
    if (isPlainObject(updateFunctionOrState)) {
      setState({
        ...state,
        ...updateFunctionOrState,
      });
    } else if (isFunction(updateFunctionOrState)) {
      setState({
        ...state,
        ...updateFunctionOrState(state, props),
      });
    } else {
      throw new Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
      );
    }
    callbackRef.current = callback;
  };

  return [state, updater];
}

export default useSetState;
