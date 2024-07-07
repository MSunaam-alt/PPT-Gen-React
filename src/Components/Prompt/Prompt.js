import { useState } from "react";

export default function Prompt({ setProject, loading }) {
  const [numSlides, setNumSlides] = useState(5);
  const [title, setTitle] = useState(null);
  return (
    <div className="fixed z-10 bottom-0 w-full fixed-bottom-shadow h-24">
      <div className="flex h-full container mx-auto flex-row items-center">
        <form
          action=""
          method="POST"
          className="flex gap-5 items-end w-full"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            setProject(formData);
          }}
        >
          <fieldset className="flex flex-col w-full">
            <label htmlFor="title" className="text-xs mb-1">
              Project Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Set your presentation description"
              name="title"
              id="title"
              type="text"
              className="py-1 px-2 border w-full border-black rounded focus:outline-none"
            />
          </fieldset>
          <fieldset className="flex flex-col w-full">
            <label htmlFor="numSlides" className="text-xs mb-1">
              Number of Slides
            </label>
            <input
              id="numSlides"
              name="numSlides"
              type="number"
              min={3}
              max={10}
              onChange={(e) => setNumSlides(e.target.value)}
              value={numSlides}
              className="py-1 px-2 border w-32 border-black rounded focus:outline-none"
            />
          </fieldset>
          {!loading && (
            <button
              className="h-max py-1 px-3 rounded-lg bg-black text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border hover:border-black border border-transparent"
              type="submit"
            >
              Create
            </button>
          )}
          {loading && <div className="loader"></div>}
        </form>
      </div>
    </div>
  );
}
