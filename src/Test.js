import React, { useRef } from "react";
import gsap from "gsap";

function MyComponent() {
  const divRef = useRef(null);
  const tl = gsap.timeline({
    paused: true,
    defaults: { duration: 3 },
  });

  const doFade = () => {
    tl.restart();
  };

  React.useEffect(() => {
    tl.to(divRef.current, { opacity: 0 })
      .set(divRef.current, {
        backgroundColor: "red",
        innerText: "End the test.",
      })
      .to(divRef.current, { opacity: 1 }, "+=1");
  }, [tl]);

  return (
    <div>
      <div id="divtest" ref={divRef}>
        Initial text
      </div>
      <button onClick={doFade}>Start Animation</button>
    </div>
  );
}

export default MyComponent;
