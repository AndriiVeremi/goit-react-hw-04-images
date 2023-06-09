import { ColorRing } from 'react-loader-spinner';
import { Spinner } from './Loader.styled';

const Loader = () => {
    return (
        <Spinner>
        <ColorRing
            visible={true}
            height="90"
            width="90"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        </Spinner>
    )
}

export default Loader;