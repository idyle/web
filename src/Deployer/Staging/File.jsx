import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { AiOutlineFile, AiFillDelete } from 'react-icons/ai';

const File = ({ file, setIndex, remove }) => {

    return (
        <div className="flex items-center justify-between border-b-2">
            <div className="flex items-center p-1 gap-1">
                { file?.index && <div className="flex bg-white text-black items-center place-content-center p-1 rounded-lg">
                    <h1 className="text-2xl">index</h1>
                </div> }
                <AiOutlineFile size="25px" />
                <h1 className="text-3xl">{file?.path}</h1>
            </div>
            <div className="flex items-center gap-1">
                { file?.index ? <MdRadioButtonChecked size="25px" /> : <MdRadioButtonUnchecked onClick={setIndex} size="25px" /> }
                <AiFillDelete onClick={() => remove(file?.path)} size="25px" />    
            </div>
        </div>
    )
};

export default File;