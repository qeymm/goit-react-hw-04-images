import { ImageGalleryItem } from '../ImageGalleryItems/ImageGalleryItem';
import style from './ImageGallery.module.css';

export const ImageGallery = ({ photos }) => {
  return (
    <ul className={style.imageGallery}>
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};
