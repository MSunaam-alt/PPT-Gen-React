import { FaChevronLeft, FaWindowClose } from "react-icons/fa";
import SideBarSlide from "./SideBarSlide";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa6";

export default function SideBar({
  slides,
  changeSlides,
  show,
  setShow,
  setActiveSlide,
  activeSlide,
}) {
  const createDuplicateSlide = (idx, slide) => {
    let newSlides = slides.toSpliced(idx, 0, slide);
    changeSlides(newSlides);
  };
  const deleteSlide = (idx) => {
    if (activeSlide === idx && idx !== 0) {
      setActiveSlide(idx - 1);
    }
    if (activeSlide === slides.length - 1 && idx !== 0) {
      setActiveSlide(idx - 1);
    }
    if (activeSlide === 0 && slides.length > 1) {
      setActiveSlide(0);
    }
    let newSlides = slides.toSpliced(idx, 1);
    changeSlides(newSlides);
  };
  const addSlide = () => {
    changeSlides([
      ...slides,
      { title: "New Heading", points: ["Add some points"], image_keywords: [] },
    ]);
  };
  return (
    <aside
      className={`fixed left-0 top-20 bottom-24 bg-white md:w-40 w-full h-32 md:h-auto pt-7 overflow-y-auto ${
        !show ? "-translate-x-40" : ""
      }  transition-all duration-300 border-r ease-in-out pr-5 px-2 pb-5 flex flex-row md:flex-col gap-2 `}
    >
      <div
        className="hidden md:block absolute top-2 right-5"
        onClick={() => setShow(false)}
      >
        <FaChevronLeft />
      </div>
      {slides &&
        slides.map((slide, idx) => {
          return slide ? (
            <SideBarSlide
              slide={slide}
              activeSlide={activeSlide}
              setActiveSlide={setActiveSlide}
              idx={idx}
              createDuplicateSlide={createDuplicateSlide}
              deleteSlide={deleteSlide}
            />
          ) : (
            <></>
          );
        })}
      {/* Add More Slide Button */}
      <div
        className={`shrink-0 grow-0 relative w-28 md:w-full md:h-20 px-2 transition-all duration-100 ease-in border rounded-lg border-black group`}
      >
        <div
          className=" w-8 h-8  flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black z-20 overflow-visible"
          onClick={addSlide}
        >
          <IconContext.Provider value={{ color: "white", size: "1.5rem" }}>
            <FaPlus />
          </IconContext.Provider>
        </div>
      </div>
    </aside>
  );
}
