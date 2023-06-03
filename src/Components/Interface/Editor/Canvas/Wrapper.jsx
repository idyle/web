// must be within the canvas contcxt (for selection)
// selection is localized to canvas; this doesn't exist for cb

import { useState, useEffect } from 'react';
import { useDom } from './Canvas';
import { useEditor } from '../Editor';

// if a child is being hovered in a parent, how do we signify this?

const Wrapper = ({ children }) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(children?.props?.children);
    const { page, setPageData } = useEditor();
    const { selected, setSelected, hovered, setHovered, updateChildrenFromPath, path } = useDom();

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
        console.log(children.props);
        setSelected(children.props.id);
    };

    const onDoubleClick = (e) => {
        e.stopPropagation();
        console.log('called', children);
        // if typeof is not string, return
        if (typeof children?.props?.children !== 'string') return;
        setEdit(true);
    };

    const onChange = (e) => setValue(e.target.value);

    const onBlur = (e) => {
        e.stopPropagation();
        if (!edit) return;
        if (children.props.children === value) return;
        // no changes needed
        setPageData({ ...updateChildrenFromPath(page?.data, path, value) });
        setEdit(false);
        // run update based on path
    };

    useEffect(() => {
        if (selected === children.props.id) return setHovered(children.props.id);
        setHovered();
    }, [selected]);

    return (
        <div className={`p-0.5 border ${(hovered === children.props.id || selected === children.props.id) ? 'border-blue-400' : 'border-transparent'} rounded-lg`} 
        onClick={onClick} 
        onMouseOver={onMouseOver} 
        onMouseOut={onMouseOut}
        onDoubleClick={onDoubleClick}
        onBlur={onBlur}>
            { edit ? 
            <input type="text" onChange={onChange} value={value} className={`${children.props.className} w-full outline-none`} />
            : children 
            }
        </div>
    )
};

export default Wrapper;