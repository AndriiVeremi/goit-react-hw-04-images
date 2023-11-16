import React from 'react';
import PropTypes from 'prop-types';
import search from '../../images/search.jpg';
import { Wrapper, Text, Img } from './DefaultGallery.styled';

const DefaultGallery = ({ text }) => {
    return (
        <Wrapper>
            <Text className='animate__animated animate__bounceInLeft'>{text}</Text>
            <Img className='animate__animated animate__zoomInDown' src={search} width="370" alt="search" />
        </Wrapper>
    );
};

export default DefaultGallery;

DefaultGallery.propType = {
  text: PropTypes.string,
};