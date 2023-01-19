import { FaRegSadTear } from 'react-icons/fa';

const Error = () => {
    return (
        <div className="grid items-center justify-items-center">
            <div className="grid items-center justify-items-center">
                <FaRegSadTear size="100px" />
                <h1 className="text-6xl">Sorry, we couldn't find this page.</h1>
            </div>
        </div>
    )
};

export default Error;