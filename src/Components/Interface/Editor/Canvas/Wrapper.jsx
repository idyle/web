// must be within the canvas contcxt (for selection)
// selection is localized to canvas; this doesn't exist for cb

import { useState, useEffect, useRef, cloneElement, Fragment } from 'react';
import { useDom } from './Canvas';
import { useEditor } from '../Editor';
import ReactResizeDetector from 'react-resize-detector';

// if a child is being hovered in a parent, how do we signify this?

const Wrapper = ({ children }) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(children?.props?.children);
    const { page, setPageData, serialize } = useEditor();
    const { 
        selectedData, selected, setSelected, hovered, setHovered, path,
        deleteObjectFromPath, setObjectFromPath, updateObjectFromPath,
        clicked, setClicked 
    } = useDom();
    const elementRef = useRef();

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
            console.log(current, 'current', path, 'path');
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
    }, [selected]);

    const onDragOver = (e) => {
        console.log('drag over');
        e.preventDefault();
        e.stopPropagation();
        setHovered(e.target.id);
        // setting the target as hovered
    };

    const onDrop = (e) => {
        console.log('drop called');
        e.preventDefault();
        e.stopPropagation();
        if (selected === children.props.id || !selectedData) return;
        // where receiving element is children.props.id
        let dropPath = [];
        if (children.props.id?.includes('-')) dropPath = children.props.id.split('-');
        console.log('initial dorp', dropPath);
        dropPath.shift();

        for (let i = 0; i < dropPath.length; i++) dropPath[i] = parseInt(dropPath[i]);
        // TODO: probably delete id rather than mark it as undefined
        console.log(dropPath, 'DROP PATH');
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
        e.stopPropagation();
        if (clicked) return;
        console.log('mouse down, marking clicked as true');
        // allows the resize to begin but does not provide data 
        // onResize must affirm in order for an update to occur
        const { id } = elementRef?.current;
        setSelected(id);
        setClicked({ id });
    };

    const onResize = () => {
        // affirms/updates the mouse down
        if (!clicked) return;
        console.log('affirmed!');
        const { offsetWidth: elementWidth, parentNode, id } = elementRef?.current;
        const { paddingRight, paddingLeft, marginRight, marginLeft } = getComputedStyle(parentNode);
        const parentWidth = parentNode?.clientWidth - (parseFloat(paddingRight) + parseFloat(paddingLeft) + parseFloat(marginRight) + parseFloat(marginLeft));
        console.log(elementWidth, parentNode?.offsetWidth);
        if (clicked && (id !== clicked?.id)) return;
        // if an element is being procesed and is not assc with the listener id, return
        setSelected(id);
        setClicked({ elementWidth, parentWidth, id });
    };

    const onMouseUp = (e) => {
        e.stopPropagation();
        if (!clicked) return console.log('no click specifiwd', clicked);
        console.log(clicked);
        setClicked(false);
        const { elementWidth, parentWidth } = clicked;
        if (!parentWidth || !elementWidth) return console.log('no data specified');

        const elementWidthPercentage = ((elementWidth / parentWidth) > 1) ? 1 : (elementWidth / parentWidth);
        console.log(elementWidth, parentWidth, e.currentTarget.offsetWidth);
        console.log(`${Math.round(elementWidthPercentage * 100)}%`)

        let obj = {};
        obj['width'] = `${elementWidthPercentage * 100}%`;
        const func = (current) => {
            if (current) current.style = { ...current.style, ...obj };
            return current;
        };

        setPageData({ ...updateObjectFromPath(page?.data, path, func) });
        // save changes
    };

    
    const clonedChild = cloneElement(children, { className: `${children?.props?.className} w-full`, style: { ...children?.props?.style, width: '100%' } });
    const editableChild = cloneElement(clonedChild, { contentEditable: true, onInput: onChange, className: `${clonedChild.props.className} outline-none` });

    const clonedSumChild = cloneElement(children, { onClick: onClick, onDoubleClick: onDoubleClick, onBlur: onBlur, className: `${children?.props?.className} w-full`, style: { ...children?.props?.style, width: '100%' } });
    const editableSumChild = cloneElement(clonedChild, { onClick: onClick, onDoubleClick: onDoubleClick, onBlur: onBlur, contentEditable: true, onInput: onChange, className: `${clonedChild.props.className} outline-none` });

    console.log(children.props.name);
    if (children.type !== 'summary') return (
        <ReactResizeDetector skipOnMount={true} onResize={onResize}>
            <div id={children?.props?.id} className={`p-2 max-w-full overflow-hidden resize-x border ${(hovered === children.props.id || selected === children.props.id) ? 'border-blue' : 'border-white/0'} rounded-lg`} 
            ref={elementRef}
            style={{ width: children.props?.style?.width || 'auto' }}
            draggable={true}
            onDrop={onDrop}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onClick={onClick} 
            onMouseOver={onMouseOver} 
            onMouseOut={onMouseOut}
            onDoubleClick={onDoubleClick}
            onBlur={onBlur}>
                { edit ? editableChild : clonedChild }
            </div>
        </ReactResizeDetector>

    ); else return (<>{ edit ? editableSumChild : clonedSumChild }</>);

    // must have editable properties
};

export default Wrapper;