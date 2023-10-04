import logo from "./logo.svg";
import "./App.css";
import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BiRefresh } from "react-icons/bi";

const countryData = [
  {
    countryName: "Norway",
    countryImages: [
      "https://i.ibb.co/sJQ3B2w/image.png",
      "https://i.ibb.co/JK6YzdT/image.png",
      "https://i.ibb.co/Js6XdfT/image.png",
    ],
    countryCities: [
      "Oslo",
      "Bergen",
      "Trondheim",
      "Stavanger",
      "Tromso",
      "Alesund",
      "Bodo",
      "Kristiansand",
      "Haugesund",
      "Molde",
      "Narvik",
      "Sandefjord",
      "Svolvaer",
      "Tonsberg",
    ],
  },
  {
    countryName: "Finland",
    countryImages: [
      "https://i.ibb.co/9YFt36v/image.png",
      "https://i.ibb.co/H2FcDDt/image.png",
      "https://i.ibb.co/3mVDmN3/image.png",
    ],
    countryCities: [
      "Helsinki",
      "Turku",
      "Tampere",
      "Oulu",
      "Rovaniemi",
      "Vaasa",
      "Kuopio",
      "Jyvaskyla",
      "Porvoo",
      "Kotka",
      "Lahti",
      "Kuusamo",
      "Kemi",
      "Kajaani",
    ],
  },
];

function App() {
  const itemsRef = useRef([]);
  const imageDivRef = useRef(null);
  const textDivRef = useRef(null);

  const [selectedCountry, setSelectedCountry] = useState(0);

  const offset = 30;
  useLayoutEffect(() => {
    const items = itemsRef.current;

    // Arrange stacked cards
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

  const handleChange = () => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.8 },
    });
    const imageDiv = document.getElementById("imageDiv");

    const items = itemsRef.current;
    items.forEach((item) => {
      gsap.killTweensOf(item);
    });
    gsap.killTweensOf(imageDiv);

    tl.to(imageDivRef.current, { opacity: 0 })
      .to(textDivRef.current, {
        opacity: 0,
        onComplete: () => {
          setSelectedCountry((prev) => (prev + 1) % countryData.length);
        },
      })
      .to(imageDivRef.current, { opacity: 1 })
      .to(textDivRef.current, { opacity: 1, y: "0%" }, "-=0.8")
      .play();
  };

  return (
    <div className="flex container items-center mx-auto border border-[#e1e1e1] p-[24px] mt-[60px] rounded-[8px]">
      <div className="w-1/2">
        <div className="flex justify-end">
          <BiRefresh
            onClick={handleChange}
            className="text-[30px] text-[#3c7fff] cursor-pointer text-right"
          />
        </div>
        <div id="textDiv" ref={textDivRef}>
          <h1 className="text-[48px] font-bold mb-[24px]">
            {countryData[selectedCountry].countryName}
          </h1>
          <p className="text-xl">Time Duration</p>
          <p>
            <span className="text-[36px]">08</span>
            <span className="align-top text-[14px]">hrs</span>
            <span className="text-[36px]">:</span>
            <span className="text-[36px]">50</span>
            <span className="align-top text-[14px]">mins</span>
          </p>
          <Swiper
            className="mySwiper"
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            mousewheel={true}
            keyboard={true}
            slidesPerView={2}
          >
            {countryData[selectedCountry].countryCities.map((city, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center">
                  <p className="text-[24px] font-bold">{city}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div
        className="w-[300px] h-[300px] relative"
        id="imageDiv"
        ref={imageDivRef}
      >
        <div className="slider">
          {countryData[selectedCountry].countryImages.map((image, index) => (
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
