import { useState, useCallback } from 'react';
import style from './ImageGalleryItem.module.css';
import ImageModal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ webformatURL, largeImageURL, tags }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = useCallback(() => {
    setSelectedImage(largeImageURL);
  }, [largeImageURL]);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <li className={style.imageGalleryItem} onClick={handleOpenModal}>
      <img
        className={style.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      <ImageModal
        modalClose={handleCloseModal}
        modalOpen={selectedImage !== null}
        image={selectedImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
