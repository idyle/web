// must be within the canvas contcxt (for selection)
// selection is localized to canvas; this doesn't exist for cb

import { useState, useEffect } from 'react';
import { useDom } from './Canvas';
import { useEditor } from '../Editor';

// if a child is being hovered in a parent, how do we signify this?

const Wrapper = ({ children }) => {

    const [edit, setEdit] = useState(false);
    // const [clicked, setClicked] = useState(false);
    const [value, setValue] = useState(children?.props?.children);
    const { page, setPageData, serialize } = useEditor();
    const { 
        selectedData, selected, setSelected, hovered, setHovered, path,
        deleteObjectFromPath, setObjectFromPath, updateObjectFromPath,
        clicked, setClicked 
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
        console.log(children.props);
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

    const onMouseDown = (e) => {
        if (clicked) return;
        if (!e.target?.clientWidth || !e.target?.parentNode?.clientWidth || !e.target?.id) return;
        setSelected(e.target?.id);
        setClicked({ elementWidth: e.target?.clientWidth, parentWidth: e.target?.parentNode?.clientWidth, id: e.target?.id });
    };
    const onMouseUp = (e) => {
        e.stopPropagation();
        console.log('MOUSE UP DETECTED', 'is clicked?', clicked);
        if (!clicked) return;
        setClicked(false);
        console.log('passed ,is clicked', clicked);
        const { elementWidth, parentWidth, id } = clicked;
        if (e.currentTarget?.id !== id) return console.log('items do not match');
        const latestElementWidth = e?.currentTarget?.clientWidth;
        if (!parentWidth || !elementWidth) return;
        // if (latestElementWidth === elementWidth) return console.log('Nothing changed');
        // if measurements are the same, return

        const borderOffset = 1 * 2;
        // consider 1px border (border) * 2 (sides) = 2px offset

        let elementWidthPercentage = ((latestElementWidth + borderOffset) / parentWidth);
        if (elementWidthPercentage > 1) elementWidthPercentage = 1;

        console.log('passed; something changed', elementWidthPercentage)
        let obj = {};
        obj['width'] = `${(elementWidthPercentage * 100).toFixed(2)}%`;
        console.log('SETTING WIDTH', obj);
        const func = (current) => {
            console.log('changing for style', current);
            if (current) current.style = { ...current.style, ...obj };
            return current;
        };
        setPageData({ ...updateObjectFromPath(page?.data, path, func) });
        // save changes
    };

    return (
        <div id={children?.props?.id} className={`p-3 overflow-auto resize-x border ${(hovered === children.props.id || selected === children.props.id) ? 'border-blue' : 'border-white/0'} rounded-lg`} 
        style={{ width: children?.props?.style?.width || '100%', maxWidth: '100%'}}
        draggable={true}
        onDrop={onDrop}
        // onMouseMove={onMouseDown}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        onMouseUp={onMouseUp}
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