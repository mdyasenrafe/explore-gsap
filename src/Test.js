import { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import "./App.css";

const Test = () => {
  const itemsRef = useRef([]);
  const color = gsap.utils.interpolate(["orange", "purple"]);
  const map = gsap.utils.mapRange(0, itemsRef.current.length, 0, 1);
  const offset = 30;

  useEffect(() => {
    const items = itemsRef.current;

    gsap.set(items, {
      backgroundColor: (index) => color(map(index)),
      x: (index) => offset * index,
      y: (index) => -offset * index,
      zIndex: (index) => items.length - index,
    });

    function diagonalLoop() {
      let totalItems = items.length;
      let currentItem = 0;

      function updatePositions() {
        for (let i = 0; i < totalItems; i++) {
          let itemIndex = (currentItem + i) % totalItems;
          let item = items[itemIndex];
          gsap.to(item, {
            duration: 0.8,
            x: offset * i,
            y: -offset * i,
            zIndex: totalItems - i,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
          });
        }
      }

      function moveToNext() {
        currentItem = (currentItem + 1) % totalItems;
        updatePositions();
      }

      const intervalId = setInterval(moveToNext, 2000);

      updatePositions();

      return () => {
        clearInterval(intervalId);
      };
    }

    diagonalLoop();
  }, []);

  return (
    <div className="slider">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
          className="item"
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Test;
