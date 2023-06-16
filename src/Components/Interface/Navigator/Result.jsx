import { BiLinkExternal, BiRightArrowAlt } from 'react-icons/bi'; 
import { useNavigate } from 'react-router-dom';

const Result = ({ title, route, setQuery }) => {
    const navigate = useNavigate();

    const onMouseDown = () => {
        setQuery(title);
        navigate(route);
    }
    return (
        <div onMouseDown={onMouseDown} className="select-none hover:bg-black hover:text-white rounded-lg p-1 border border-black">
            <div className="flex items-center place-content-between">
                <div className="flex items-center gap-1">
                    <BiLinkExternal className="text-inherit h-[20px] w-[20px]"/>
                    <h1 className="text-xl text-inherit">{title}</h1>
                </div>
                <BiRightArrowAlt className="text-inerhit h-[20px] w-[20px]"/>
            </div>
        </div>
    )
};

export default Result;