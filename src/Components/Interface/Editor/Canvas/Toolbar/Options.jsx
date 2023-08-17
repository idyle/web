import { useEffect } from "react";
import { useEditor } from "../../Editor";
import { useDom } from "../Canvas";
import { useUtil } from "../../../../../Contexts/Util";
import { AiOutlineDelete, AiOutlineClear, AiOutlineEdit, AiOutlineFileImage, AiOutlineUndo, AiOutlineCopy, AiOutlineFormatPainter } from 'react-icons/ai';
import { useNavigate, useLocation } from "react-router-dom";

const Options = () => {

    const { page, setPageData, pageCache, setClipboard, clipboard } = useEditor();
    const { confirm, prompt, notify, integrator, setIntegrator } = useUtil();
    const { selectedData, setObjectFromPath, updateObjectFromPath, deleteObjectFromPath, path } = useDom();
    const { pathname: origin } = useLocation();
    const navigate = useNavigate();

    const deleteElement = async () => {
        setPageData({ ...deleteObjectFromPath(page?.data, path) });
    };

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

    const undo = async () => {
        console.log('testing undo');
        if (!(await confirm("You're about to undo your edits. Are you sure?"))) return;
        if (pageCache?.data) setPageData({ ...pageCache?.data });
        else notify("There's nothing to undo");
        console.log(pageCache?.data);
    };

    const copy = async () => {
        console.log('setitng selected', selectedData);
        if (!selectedData) return notify('You have not selected anything yet!');
        setClipboard({ ...selectedData });
        notify('Copied this element!');
    };

    const paste = async () => {
        if (!clipboard) return notify('You have not copied anything yet!');
        setPageData({ ...setObjectFromPath(page?.data, path, { ...clipboard }) });
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
    };

    // entering
    const sendObjectsRequest = () => {
        setIntegrator({ active: true, target: 'objects', origin: `${origin}?mode=canvas&toolbar=options`, ref: { path, data: page?.data } });
        notify('Sending you to objects. Please select a background image to add.');
        navigate('/objects');
    };
    
    // returning
    useEffect(() => {
        if (!integrator?.active || !integrator?.data) return;
        if (integrator?.target !== 'objects' || integrator?.origin !== `${origin}?mode=canvas&toolbar=options`) return;
        const file = integrator?.data;
        const pageRef = integrator?.ref;
        console.log('recieved');
        if (!file?.type.startsWith('image')) return setIntegrator({ active: false });

        let obj = {};
        obj.backgroundImage = `url('${file?.url.replace(/ /g, '%20')}')`;
        obj.backgroundSize = `cover`;
        obj.backgroundPosition = 'center';
        obj.backgroundRepeat = `no-repeat`;
        // obj.height = `100%`;
        // obj.width = `100%`;
        console.log('object to add', obj);
        const func = (current) => {
            if (current) current.style = { ...current.style, ...obj };
            return current;
        };

        setPageData({ ...updateObjectFromPath(pageRef?.data, pageRef?.path, func) });
        setIntegrator({ active: false });
    }, [integrator?.active]);
    
    return (
        <div className="flex flex-wrap place-content-center md:place-content-start items-center bg-white text-gunmetal p-1 gap-1 rounded-lg overflow-auto">
                <div onClick={undo} className="flex place-content-center items-center gap-1 p-1 border border-inherit rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiOutlineUndo size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Undo Edit</h1>
                </div>
                <div onClick={copy} className="flex place-content-center items-center gap-1 p-1 border border-inherit rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiOutlineCopy size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Copy Element</h1>
                </div>
                <div onClick={paste} className="flex place-content-center items-center gap-1 p-1 border border-inherit rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiOutlineFormatPainter size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Paste Element</h1>
                </div>
                <div onClick={clear} className="flex place-content-center items-center gap-1 p-1 border border-inherit rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiOutlineClear size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Reset Styles</h1>
                </div>
                <div onClick={deleteElement} className="flex place-content-center items-center gap-1 p-1 border border-inherit rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiOutlineDelete size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Delete Element</h1>
                </div>
                <div onClick={editProps} className="flex place-content-center items-center gap-1 p-1 border border-inherit rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiOutlineEdit size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Edit Property</h1>
                </div>
                <div onClick={sendObjectsRequest} className="flex place-content-center items-center gap-1 p-1 border border-inherit rounded-lg text-gunmetal hover:scale-[.98] select-none">
                    <AiOutlineFileImage size="25px" />
                    <h1 className="hidden md:block text-xl text-center">Background</h1>
                </div>
        </div>
    )
};

export default Options;