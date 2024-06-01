import React from "react";

const ImageModal = ({ imageUrl }) => {
  return (
    <dialog id="my_modal_7" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex:col justify-center mt-0">
          <div>
            <img src={imageUrl} alt="receipt" />
          </div>
          <button
            onClick={() => document.getElementById("my_modal_7").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ImageModal;
