import React, { useState } from "react";
import "./Modal.css";
import { useEffect } from "react";
import Card from "../card/Card";
const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <div className={`${isOpen ? "modal-wrapper" : "modal-hidden"}`}>
      <i
        onClick={closeModal}
        className="close-icon fa fa-times-circle-o"
        aria-hidden="true"
      ></i>
<Card>
  
</Card>
      <div className="modal-content">{props.children}</div>
    </div>
  );
};

export default Modal;
