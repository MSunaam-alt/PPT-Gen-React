export default function Modal({ showModal, modalMsg }) {
  return (
    <>
      <div className="fixed bg-[rgba(0,0,0,0.3)] top-0 left-0 right-0 bottom-0 z-[200] flex items-center justify-center">
        {modalMsg && (
          <div className="p-4 bg-white rounded-xl shadow-xl flex flex-col">
            <h1 className="text-xl font-bold text-center">{modalMsg.title}</h1>
            <p>{modalMsg.text}</p>
            <div className="flex flex-row">
              <button className="">{modalMsg.actionText}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
