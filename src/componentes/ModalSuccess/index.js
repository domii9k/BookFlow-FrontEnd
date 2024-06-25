import React from 'react';
import './ModalSuccess.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">X</button>
        {children}

        <div className="animation">
          <DotLottieReact
            src="https://lottie.host/7a316aee-803f-4178-9925-a96d081793aa/4bACUGyga3.json"
            background="transparent"
            speed="2"
            style={{ width: "100%" }}
            playMode="normal"
            autoplay>
          </DotLottieReact>
        </div>

      </div>
    </div>
  );
};

export default Modal;