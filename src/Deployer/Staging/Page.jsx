import { MdPages, MdClose, MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";

const Page = ({ page, index, setIndex, remove }) => {

    const isIndex = page?.id === index;
    return (
        <div className="flex items-center justify-between border-b-2">
            <div className="flex items-center p-1 gap-1">
                <MdPages size="25px" />
                <h1 className="text-3xl">{page?.route}</h1>
                { isIndex && <div className="flex bg-white text-black items-center place-content-center p-1 rounded-lg">
                    <h1 className="text-2xl">index</h1>
                </div> }
            </div>
            <div className="flex items-center gap-1">
                { isIndex ? <MdRadioButtonChecked size="25px" /> 
                : <MdRadioButtonUnchecked onClick={() => setIndex(page?.id)} size="25px" /> }
                <MdClose onClick={() => remove(page?.id)} size="25px" />    
            </div>
        </div> 
    )
};

export default Page;