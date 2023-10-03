import logo from "./logo.svg";
import "./App.css";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

let images = [
  "https://i.ibb.co/sJQ3B2w/image.png",
  "https://i.ibb.co/JK6YzdT/image.png",
  "https://i.ibb.co/Js6XdfT/image.png",
];

function App() {
  const itemsRef = useRef([]);
  const color = gsap.utils.interpolate(["orange", "purple"]);
  const map = gsap.utils.mapRange(0, itemsRef.current.length, 0, 1);
  const offset = 30;
  useLayoutEffect(() => {
    const items = itemsRef.current;
    // stacked cards
    gsap.set(items, {
      x: (i) => i * offset,
      y: (i) => offset * i,
      zIndex: (i) => items.length - i,
    });

    function diagonalLoop() {
      const totalItems = items.length;
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

      function nextItem() {
        currentItem++;
        updatePositions();
      }

      const interval = setInterval(nextItem, 1500);
      updatePositions();
      return () => clearInterval(interval);
    }

    diagonalLoop();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50%",
        }}
      >
        <h1>Norway</h1>
        <p>
          Norway is a Scandinavian country encompassing mountains, glaciers and
          fjords. Oslo, the capital, is a city of green spaces and museums.
          Preserved 19th-century houses are found in the city’s Bjørvika
          district.
        </p>
      </div>
      <div
        style={{
          width: "300px",
          height: "300px",
          position: "relative",
        }}
      >
        <div className="slider">
          {images.map((image, index) => (
            <img
              ref={(el) => (itemsRef.current[index] = el)}
              src={image}
              alt=""
              key={index}
              className="item"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
