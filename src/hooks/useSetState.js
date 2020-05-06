import { useState, useCallback } from "react";
import { isFunction, isPlainObject } from "../helpers";


function useSetState(initialState = {}, props = {}) {
  const [state, setState] = useState(initialState);

  const updater = useCallback((updateFunctionOrState = {}, callback = () => {}) => {
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
    callback()
  }, [state, props]);

  return [state, updater];
}

export default useSetState;
