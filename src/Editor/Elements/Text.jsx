import { useState, useEffect, useId } from 'react';
import { useDom } from '../Canvas/Canvas';

const Text = () => {

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
        <h1 className={`text-xl border ${hovered ? 'border-black' : 'border-transparent'}`} 
        onClick={() => setSelected(id)} 
        onMouseOver={onMouseOver} 
        onMouseOut={onMouseOut}>
            Test Test
        </h1>
    )
};

export default Text;