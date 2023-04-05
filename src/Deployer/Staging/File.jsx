import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { AiOutlineFile, AiFillDelete } from 'react-icons/ai';

const File = () => {

    const index = false;

    return (
        <div className="flex items-center justify-between border-b-2">
            <div className="flex items-center p-1 gap-1">
                { index && <div className="flex bg-white text-black items-center place-content-center p-1 rounded-lg">
                    <h1 className="text-2xl">index</h1>
                </div> }
                <AiOutlineFile size="25px" />
                <h1 className="text-3xl">test.html</h1>
            </div>
            <div className="flex items-center gap-1">
                { index ? <MdRadioButtonChecked size="25px" /> : <MdRadioButtonUnchecked size="25px" /> }
                <AiFillDelete size="25px" />    
            </div>
        </div>
    )
};

export default File;