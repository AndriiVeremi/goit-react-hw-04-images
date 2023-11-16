import React from 'react';
import PropTypes from 'prop-types';
import error from '../../images/error.jpg';
import { Wrapper, Text, Img } from './ErrorGallery.styled';

function ImageErrorView({ message }) {
    return (
        <Wrapper>
            <Text className='animate__animated animate__bounceInDown'>{message}</Text>
            <Img className='animate__animated animate__zoomInUp' src={error} width="370" alt="error" />           
        </Wrapper>
    );
}

export default ImageErrorView;

ImageErrorView.propType = {
    message: PropTypes.string,
}