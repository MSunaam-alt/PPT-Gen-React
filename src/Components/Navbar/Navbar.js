import { useRef, useState } from "react";

export default function Navbar({ newProject, downloadPpt }) {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const dropDownProfileRef = useRef(null);
  const options = [
    {
      name: "Download PPT",
      link: "",
    },
  ];
  const closeOpenMenus = (e) => {
    if (
      dropDown &&
      !dropDownRef.current?.contains(e.target) &&
      !dropDownProfileRef.current?.contains(e.target)
    ) {
      setDropDown(false);
    }
  };
  document.addEventListener("mousedown", closeOpenMenus);

  return (
    <nav className="px-4 md:px-0 w-full shadow-lg z-20">
      <div className="h-20 container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">
          PPT<span className="text-[red]">Gen.</span>
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={newProject}
            className="bg-black text-white px-3 py-1 rounded-lg border border-transparent hover:border hover:border-black hover:text-black hover:bg-white transition-all duration-300 ease-in-out"
          >
            New Project
          </button>
          <button
            ref={dropDownProfileRef}
            className="bg-black text-white px-3 py-1 rounded-lg border border-transparent hover:border hover:border-black hover:text-black hover:bg-white transition-all duration-300 ease-in-out relative"
            // onClick={() => setDropDown(true)}
            onClick={() => {
              setDropDown(false);
              downloadPpt();
            }}
          >
            Download
            {/* {dropDown && (
              <ul
                ref={dropDownRef}
                className="absolute w-max -left-0 top-10 bg-slate-50 shadow-lg z-20"
              >
                {options.map((option, idx) => {
                  return (
                    <li
                      onClick={() => {
                        setDropDown(false);
                        downloadPpt();
                      }}
                      key={idx}
                      className="hover:bg-slate-200 text-black transition-all duration-100 ease-in-out py-2 flex items-center h-8 px-3 cursor-pointer"
                    >
                      {option.name}
                    </li>
                  );
                })}
              </ul>
            )} */}
          </button>
        </div>
      </div>
    </nav>
  );
}
