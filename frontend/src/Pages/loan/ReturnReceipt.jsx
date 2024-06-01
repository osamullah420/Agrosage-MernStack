import React from "react";

const ReturnReceipt = ({ returnReceipt }) => {
  return (
    <dialog id="my_modal_9" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <div>
            <img src={returnReceipt} alt="receipt" />
          </div>
          <button
            onClick={() => document.getElementById("my_modal_9").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReturnReceipt;
