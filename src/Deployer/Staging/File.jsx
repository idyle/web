import { MdClose, MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { AiOutlineFile } from 'react-icons/ai';

const File = ({ file, index, setIndex, remove }) => {

    const isIndex = file?.path === index;

    return (
        <div className="flex items-center justify-between border-b-2">
            <div className="flex items-center p-1 gap-1">
                { isIndex && <div className="flex bg-white text-black items-center place-content-center p-1 rounded-lg">
                    <h1 className="text-2xl">index</h1>
                </div> }
                <AiOutlineFile size="25px" />
                <h1 className="text-3xl">{file?.path}</h1>
            </div>
            <div className="flex items-center gap-1">
                { isIndex ? <MdRadioButtonChecked size="25px" /> 
                : <MdRadioButtonUnchecked onClick={() => setIndex(file?.path)} size="25px" /> }
                <MdClose onClick={() => remove(file?.path)} size="25px" />    
            </div>
        </div>
    )
};

export default File;