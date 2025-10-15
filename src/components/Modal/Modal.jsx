import Modal from 'react-modal';
import style from './Modal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ modalClose, modalOpen, image }) => {
  return (
    <Modal
      onRequestClose={modalClose}
      isOpen={modalOpen}
      contentLabel="Image Modal"
      className={style.overlay}
    >
      <div className={style.modal}>
        <img src={image} alt="" />
      </div>
    </Modal>
  );
};

export default ImageModal;
