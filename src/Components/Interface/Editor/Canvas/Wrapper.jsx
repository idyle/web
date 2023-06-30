// must be within the canvas contcxt (for selection)
// selection is localized to canvas; this doesn't exist for cb

import { useState, useEffect } from 'react';
import { useDom } from './Canvas';
import { useEditor } from '../Editor';

// if a child is being hovered in a parent, how do we signify this?

const Wrapper = ({ children }) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(children?.props?.children);
    const { page, setPageData, serialize } = useEditor();
    const { 
        selectedData, selected, setSelected, hovered, setHovered, path,
        deleteObjectFromPath, setObjectFromPath, updateObjectFromPath 
    } = useDom();

    // add additional hover property to ensure that only one is hovered
    const onMouseOver = (e) => {
        e.stopPropagation();
        setHovered(children.props.id);
    };

    const onMouseOut = (e) => {
        e.stopPropagation();
        if (selected !== children.props.id) setHovered();
    };

    const onClick = (e) => {
        e.stopPropagation();
        setSelected(children.props.id);
    };

    const onChange = (e) => {
        console.log(e.target.innerText);
        setValue(e.target.innerText);
    };

    const onDoubleClick = (e) => {
        e.stopPropagation();
        // enabling a particular edit mode
        // if typeof is not string, return
        if (typeof children?.props?.children !== 'string') return;
        setEdit(true);
    };

    const onBlur = (e) => {
        e.stopPropagation();
        if (!edit) return;
        setEdit(false);
        if (children.props.children === value) return;
        // no changes needed
        const func = (current) => {
            current.children = value;
            return current;
        };
        setPageData({ ...updateObjectFromPath(page?.data, path, func) });
        // setPageData({ ...updateChildrenFromPath(page?.data, path, value) });
        // run update based on path
    };

    useEffect(() => {
        if (selected === children.props.id) return setHovered(children.props.id);
        setHovered();
        // AOS.refresh()
    }, [selected]);

    const onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setHovered(e.target.id);
        // setting the target as hovered
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (selected === children.props.id || !selectedData) return;
        // where receiving element is children.props.id
        let dropPath = [];
        if (children.props.id?.includes('-')) dropPath = children.props.id.split('-');
        dropPath.shift();
        for (let i = 0; i < dropPath.length; i++) dropPath[i] = parseInt(dropPath[i]);
        // TODO: probably delete id rather than mark it as undefined
        let obj = selectedData || {};
        delete obj['id'];
        // delete the object first
        const data = deleteObjectFromPath(page?.data, path);
        // add the object into the drop path
        setPageData({ ...setObjectFromPath({ ...serialize(data) }, dropPath, { ...obj }) });
        // const data = setObjectFromPath(page?.data, dropPath, { ...obj });
        // // (1) add element into receiving element
        // setPageData({ ...deleteObjectFromPath({ ...serialize(data) }, path) });
        // // (2) delete element at current position and add to page data
    };

    const onDragStart = (e) => {
        e.stopPropagation();
        setSelected(children.props.id);
    };

    return (
        <div className={`p-1 border ${(hovered === children.props.id || selected === children.props.id) ? 'border-blue' : 'border-white/0'} rounded-lg`} 
        draggable={true}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onClick={onClick} 
        onMouseOver={onMouseOver} 
        onMouseOut={onMouseOut}
        onDoubleClick={onDoubleClick}
        onBlur={onBlur}>
            { edit ? 
            <div contentEditable onInput={onChange} className={`${children.props.className} outline-none bg-white`}>{children?.props?.children}</div>
            : children 
            }
        </div>
    )
};

export default Wrapper;