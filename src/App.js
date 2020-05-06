import React from "react";

import useSetState from "./hooks/useSetState";

function App() {
  const [state, setState] = useSetState({ count: 0, name: "Counter" });

  const payloadAsObjectHandler = () => {
    setState({ count: 10 });
  };

  const payloadAsFunctionHandler = () => {
    setState((state) => ({ count: state.count + 1 }));
  };

  const payloadWithCallbackHandler = () => {
    setState({ name: "Console log as callback" }, () => {
      console.log("Hello from callback");
    });
  };

  return (
    <div>
      <div>{state.name}</div>
      <div>{state.count}</div>
      <button onClick={payloadAsObjectHandler}>set 10</button>
      <button onClick={payloadAsFunctionHandler}>Increment</button>
      <button onClick={payloadWithCallbackHandler}>With Callback</button>
    </div>
  );
}

export default App;
