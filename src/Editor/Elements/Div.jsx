import { useState, useEffect, useId } from 'react';
import { useDom } from '../Canvas/Canvas';

const Div = ({children}) => {

    // should be some sort of cloning process facilitated to add the child

    const id = useId();

    const { selected, setSelected } = useDom();

    const [hovered, setHovered] = useState();

    const onMouseOver = () => {
        setHovered(true);
    };

    const onMouseOut = () => {
        if (selected !== id) setHovered();
    };

    useEffect(() => {
        console.log(selected, 'selected');
        if (selected === id) return setHovered(true);
        setHovered();
    }, [selected])

    return (
        <div className={`grid h-10 border ${hovered ? 'border-black' : 'border-transparent'}`} 
        onClick={() => setSelected(id)} 
        onMouseOver={onMouseOver} 
        onMouseOut={onMouseOut}>
            {children}
        </div>
    )
};

export default Div;