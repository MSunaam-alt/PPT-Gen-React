import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Slide from "./Components/Slide/Slide";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import SideBar from "./Components/SideBar/SideBar";
import PPTForm from "./Components/PPTForm/pptForm";

function App() {
  const [slides, setSlides] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slideCounter, setSlideCounter] = useState(0);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showCreate, setShowCreate] = useState(true);

  const baseUrl = "https://msunaamalt.pythonanywhere.com/pptApi";

  const changeSlideCounter = (num) => {
    setSlideCounter(num);
    localStorage.setItem("slideCounter", num);
  };
  const toggleSideBar = (open) => {
    setShowSideBar(open);
    localStorage.setItem("sideBar", open);
  };
  const changeSlides = (slides) => {
    setSlides(slides);
    localStorage.setItem("slides", JSON.stringify(slides));
  };
  const createNew = () => {
    changeSlides([]);
    changeSlideCounter(0);
  };
  useEffect(() => {
    if (project) {
      setLoading(true);
      // console.log(project);
      axios
        .post(`${baseUrl}/create_ppt`, project)
        .then((res) => {
          // console.log(res.data);
          changeSlides(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [project]);

  const downloadPpt = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/download`, { slides: slides }, { responseType: "blob" })
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        });

        // Create a link element
        const link = document.createElement("a");

        // Create a URL for the Blob and set it as the href attribute
        const url = URL.createObjectURL(blob);
        link.href = url;

        // Set the download attribute to specify the file name
        link.download = "presentation.pptx";

        // Append the link to the body (it won't be visible)
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);

        // Revoke the object URL to free up memory
        URL.revokeObjectURL(url);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("slides")) {
      setSlides(JSON.parse(localStorage.getItem("slides")));
      console.log(JSON.parse(localStorage.getItem("slides")));
    }
    if (localStorage.getItem("slideCounter")) {
      // console.log(localStorage.getItem("slideCounter"));
      setSlideCounter(JSON.parse(localStorage.getItem("slideCounter")));
    }
    if (localStorage.getItem("sideBar")) {
      setShowSideBar(JSON.parse(localStorage.getItem("sideBar")));
    }
  }, []);

  useEffect(() => {
    if (slides) {
      if (slides.length > 0) {
        setShowCreate(false);
        return;
      }
    }
    setShowCreate(true);
  }, [slides]);

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <SideBar
          show={showSideBar}
          setShow={toggleSideBar}
          slides={slides}
          changeSlides={changeSlides}
          setActiveSlide={changeSlideCounter}
          activeSlide={slideCounter}
        />
        <Navbar newProject={createNew} downloadPpt={downloadPpt} />
        {showCreate && (
          <PPTForm setProject={setProject} setShowCreate={setShowCreate} />
        )}
        {!showSideBar && (
          <div
            onClick={() => toggleSideBar(true)}
            className="absolute left-0 top-32 p-2 rounded-r-lg bg-black shadow-lg "
          >
            <IconContext.Provider value={{ size: "1.2rem", color: "white" }}>
              <FaChevronRight />
            </IconContext.Provider>
          </div>
        )}
        <div
          className={`flex ${
            showSideBar ? "md:ml-40 md:px-4 mt-32 md:mt-0" : ""
          } flex-row mb-24 transition-all duration-300 ease-in-out items-center justify-between container mx-auto`}
        >
          {!loading && !slides.length == 0 && (
            <button
              disabled={slideCounter == 0}
              onClick={() => {
                if (slideCounter > 0) {
                  // setSlideCounter(slideCounter - 1);
                  changeSlideCounter(slideCounter - 1);
                }
              }}
              className={`${slideCounter === 0 ? "cursor-not-allowed" : ""}`}
            >
              <IconContext.Provider
                value={{ color: slideCounter > 0 ? "black" : "grey" }}
              >
                <FaChevronLeft />
              </IconContext.Provider>
            </button>
          )}
          <div
            className="flex items-center justify-center overflow-x-auto gap-2  w-[80vw]"
            id="slideContainer"
          >
            <div
              className={`${
                !loading && !slides.length == 0 && "border"
              } shrink-0 grow-0 min-w-full max-w-full md:h-[65vh] h-[55vh] ${
                !loading && !slides.length == 0 && "border-black"
              }`}
            >
              {slides.length > 0 && !loading && (
                <Slide slide={slides[slideCounter]} />
              )}
              {slides.length === 0 && !showCreate && (
                <div className="flex items-center justify-center w-full md:h-[65vh] h-[55vh]">
                  <div className="flex flex-col items-center gap-1">
                    <div className="loader"></div>
                    <span className="text-center text-sm">
                      Generating content for you...
                    </span>
                  </div>
                </div>
              )}
              {loading && slides.length != 0 && (
                <div className="flex items-center justify-center w-full md:h-[65vh] h-[55vh]">
                  <div className="flex flex-col items-center gap-1">
                    <div className="loader"></div>
                    <span className="text-center text-sm">
                      Generating content for you...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!loading && !slides.length == 0 && (
            <button
              disabled={slideCounter == slides.length - 1}
              onClick={() => {
                if (slideCounter < slides.length - 1) {
                  // setSlideCounter(slideCounter + 1);
                  changeSlideCounter(slideCounter + 1);
                }
              }}
              className={`${
                slideCounter === slides.length - 1 ? "cursor-not-allowed" : ""
              }`}
            >
              <IconContext.Provider
                value={{
                  color: slideCounter < slides.length - 1 ? "black" : "grey",
                }}
              >
                <FaChevronRight />
              </IconContext.Provider>
            </button>
          )}
        </div>
        {slides.length > 0 && (
          <div className="container w-full flex items-center justify-center mx-auto text-sm text-gray-500">
            Slide: {slideCounter + 1} of {slides.length}
          </div>
        )}
        {/* <Prompt /> */}
      </div>
    </>
  );
}

export default App;
