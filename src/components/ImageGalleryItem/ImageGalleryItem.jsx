import React from 'react';
import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, showModal }) => {

  return (
    <Item>
      <Img
        src={webformatURL}
        onClick={() => showModal(largeImageURL)}
        alt=""
        loading="lazy"
      />
    </Item>
  );
};

export default ImageGalleryItem;


ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  showModal: PropTypes.func.isRequired,
};