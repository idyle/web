import { BiLinkExternal, BiRightArrowAlt } from 'react-icons/bi'; 
import { useNavigate } from 'react-router-dom';

const Result = ({ title, route }) => {
    const navigate = useNavigate();
    return (
        <div onMouseDown={() => navigate(route)} className="select-none border border-white hover:bg-white hover:text-black rounded-lg p-1 text-white bg-black">
            <div className="flex items-center place-content-between">
                <div className="flex items-center gap-1">
                    <BiLinkExternal className="text-inherit"/>
                    <h1 className="text-xl text-inherit">{title}</h1>
                </div>
                <BiRightArrowAlt className="text-inerhit"/>
            </div>
        </div>
    )
};

export default Result;