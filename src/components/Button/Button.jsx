import PropTypes from 'prop-types';
import {Buttons} from './button.styled'

const Button = ({ children, onClick = null }) => {
  return (
    <Buttons type="button" onClick={onClick}>
      {children}
    </Buttons>
  );
};

export default Button;

Button.propType = {
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};
