import { useEditor } from "../../Editor";
import { useDom } from "../Canvas";
import { useUtil } from "../../../../../Contexts/Util";
import { AiFillDelete, AiOutlineReload, AiFillEdit } from 'react-icons/ai';

const Options = () => {

    const { page, setPageData } = useEditor();
    const { confirm, prompt } = useUtil();
    const { selectedData, updateObjectFromPath, deleteObjectFromPath, path } = useDom();

    const deleteElement = () => setPageData({ ...deleteObjectFromPath(page?.data, path) });

    const clear = async () => {
        if (!(await confirm("You're about to clear all styles. Are you sure?"))) return;
        const clearFunc = (current) => {
            // brand new way of updating with arbitrary function
            current.style = {};
            current.className = '';
            return current;
        };
        setPageData({ ...updateObjectFromPath(page?.data, path, clearFunc) });
    };

    const editProps = async () => {
        if (!path?.length) return;
        // if we don't have a selected item
        let config = { key: 'className', value: selectedData?.className || '' };
        // our default editable config
        if (selectedData?.component === 'img' || selectedData?.component === 'video') config = { key: 'alt', value: selectedData?.alt || '' };
        else if (selectedData?.component === 'a') config = { key: 'href', value: selectedData?.href || '' };

        const input = await prompt(config?.value);
        if (!input) return;

        const func = (current) => {
            current[config?.key] = input;
            return current;
        };

        setPageData({ ...updateObjectFromPath(page?.data, path, func) });
        // let obj = {};
        // obj[config?.key] = input;
        // setPageData({ ...updateObjectFromPathCustom(page?.data, path, config?.key, input) });
    };
    
    return (
        <div className="grid bg-gunmetal text-white p-1 gap-1 rounded-lg overflow-auto">
            <h1 className="hidden md:block text-2xl text-center">Type: {selectedData?.component || 'Main'}</h1>
            <div className="grid grid-flow-col md:grid-flow-row p-1 gap-1">
                <div onClick={clear} className="flex place-content-center items-center gap-1 p-1 bg-white rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiOutlineReload size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Reset Styles</h1>
                </div>
                <div onClick={deleteElement} className="flex place-content-center items-center gap-1 p-1 bg-white rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiFillDelete size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Delete Element</h1>
                </div>
                <div onClick={editProps} className="flex place-content-center items-center gap-1 p-1 bg-white rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiFillEdit size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Edit Property</h1>
                </div>
            </div>
        </div>
    )
};

export default Options;