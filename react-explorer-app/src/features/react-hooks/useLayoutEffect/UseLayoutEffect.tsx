import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function UseLayoutEffect() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Runs BEFORE the browser paints
  useLayoutEffect(() => {
    const box = boxRef.current;
    if (box) {
      const measured = box.getBoundingClientRect().width;
      setWidth(measured);
      console.log("Measured width (layout effect):", measured);
    }
  }, []);

  // Runs AFTER paint
  useEffect(() => {
    console.log("Effect ran after paint");
  });

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: "50vw", height: 100, background: "tomato" }}
      />
      <p>Measured width: {width}px</p>
    </div>
  );
}
