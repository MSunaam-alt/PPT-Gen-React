export default function PPTForm({ setProject, setShowCreate }) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-[200]">
      <div className="bg-white p-8 gap-10 md:w-1/2 flex flex-col shadow-xl">
        <h1 className="text-2xl text-center">
          Create AI Powered Presentations
        </h1>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            // console.log(formData);
            setProject(formData);
            setShowCreate(false);
          }}
          className="grid grid-cols-1 grid-flow-row md:grid-cols-5 gap-4"
        >
          <fieldset className="flex md:col-span-3 flex-col gap-1">
            <label htmlFor="title" className="text-sm italic text-gray-500">
              Presentation Title
            </label>
            <input
              id="title"
              name="numSlides"
              placeholder="Presentation Title"
              className="border px-2 py-1  border-black focus:outline-none rounded-lg"
              type="text"
            />
          </fieldset>
          <fieldset className="flex flex-col md:col-span-1 gap-1">
            <label htmlFor="numSlides" className="text-sm italic text-gray-500">
              Number of Slides
            </label>
            <input
              min={2}
              max={10}
              name="title"
              id="numSlides"
              placeholder=""
              className="border px-2 py-1 border-black focus:outline-none rounded-lg"
              type="number"
            />
          </fieldset>
          <fieldset className="flex flex-col md:col-span-5 gap-1">
            <label
              htmlFor="additionalInstructions"
              className="text-sm italic text-gray-500"
            >
              Additional Instructions
            </label>
            <textarea
              name="additionalInstructions"
              id="additionalInstructions"
              placeholder="Any Additional Instructions"
              className="border px-2 py-1 border-black resize-none focus:outline-none rounded-lg"
              type="text"
            />
          </fieldset>
          <button className="bg-black text-white px-3 py-1 rounded-lg border border-transparent hover:border hover:border-black hover:text-black hover:bg-white transition-all duration-300 ease-in-out">
            Generate
          </button>
        </form>
      </div>
    </div>
  );
}
