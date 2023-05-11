// must be within the canvas contcxt (for selection)
// selection is localized to canvas; this doesn't exist for cb

import { useState, useEffect, useId } from 'react';
import { useDom } from '../Canvas/Canvas';

// if a child is being hovered in a parent, how do we signify this?

const Wrapper = ({ children }) => {
    const id = useId();

    const { selected, setSelected } = useDom();
    const { hovered, setHovered } = useDom();
    // set an id


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
    }

    useEffect(() => {
        if (selected === children.props.id) return setHovered(children.props.id);
        setHovered();
    }, [selected]);

    return (
        <div className={`p-0.5 border ${(hovered === children.props.id || selected === children.props.id) ? 'border-blue-400' : 'border-transparent'} rounded-lg`} 
        onClick={onClick} 
        onMouseOver={onMouseOver} 
        onMouseOut={onMouseOut}>
        {children}
        </div>
    )
};

export default Wrapper;