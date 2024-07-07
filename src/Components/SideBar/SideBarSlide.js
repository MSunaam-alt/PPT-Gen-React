import { useRef, useState } from "react";
import { IconContext } from "react-icons";
import { HiDotsHorizontal } from "react-icons/hi";

export default function SideBarSlide({
  slide,
  activeSlide,
  setActiveSlide,
  idx,
  createDuplicateSlide,
  deleteSlide,
}) {
  const [showContext, setShowContext] = useState(false);
  const contextRef = useRef(null);
  const closeContext = (e) => {
    if (showContext && !contextRef.current?.contains(e.target)) {
      setShowContext(false);
    }
  };
  document.addEventListener("mousedown", closeContext);
  return (
    <div
      key={idx}
      className={`relative shrink-0  w-28 md:w-full md:h-20 px-2 transition-all duration-100 ease-in py-1 border rounded-lg  ${
        activeSlide === idx ? "border-[red] s" : "border-black "
      }border-black group`}
    >
      <div
        onClick={() => setShowContext(true)}
        className="hidden w-8 h-8 group-hover:flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black z-20 overflow-visible"
      >
        <IconContext.Provider value={{ color: "white", size: "1.5rem" }}>
          <HiDotsHorizontal />
        </IconContext.Provider>
      </div>
      {showContext && (
        <ul
          onClick={() => {
            setShowContext(false);
          }}
          ref={contextRef}
          className="bg-slate-200 absolute left-10 top-0 rounded-lg overflow-clip z-20 cursor-pointer"
        >
          <li
            onClick={() => {
              deleteSlide(idx);
            }}
            className="hover:bg-slate-300 px-3 transition-all duration-300 ease-in-out py-1"
          >
            Delete
          </li>
          <li
            onClick={() => setActiveSlide(idx)}
            className="hover:bg-slate-300 px-3 transition-all duration-300 ease-in-out py-1"
          >
            Edit
          </li>
          <li
            className="hover:bg-slate-300 px-3 transition-all duration-300 ease-in-out py-1"
            onClick={() => createDuplicateSlide(idx, slide)}
          >
            Duplicate
          </li>
        </ul>
      )}
      <div
        onClick={() => {
          setActiveSlide(idx);
        }}
        className="w-full h-full overflow-clip"
      >
        <h1 className="text-xs font-bold">{slide.title}</h1>
        <hr />
        <ul className="list-disc flex flex-col gap-2 mt-5 list-inside">
          {slide.points.map((point, idx) => {
            return (
              <li key={idx} className="text-xs">
                {point}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
