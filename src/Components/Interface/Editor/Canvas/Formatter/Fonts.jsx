import { cloneElement, useEffect } from "react";
import { useEditor } from "../../Editor";

const Fonts = ({ icon }) => {
    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });
    const fonts = [ 
        'Times New Roman', 'Arial', 'Courier New',
        'Verdana', 'Garamond', 'Georgia',
        'Courier New', 'Brush Script MT'
    ];

    const { font, setFont, setPageMetadata } = useEditor();

    // func that captures value
    const onChange = (e) => {
        const font = fonts.find(font => font === e.target.value);
        // find the actual font from the area;
        if (!font) return;
        // no match
        setFont(font);
        setPageMetadata({ font });
    };

    // once we've successfully handled data transfer, 
    // we need to handle displaying it as a checked option

    return (
        <div className={`flex text-gunmetal gap-1 rounded-lg bg-white items-center p-0.5 select-none`}>   
            {editedIcon}
            <select value={font || 'native'} onChange={onChange} className="text-sm outline-none bg-white text-center max-w-[80px]">
                { !font && <option disabled value="native">Native</option>}
                {fonts.map((font, i) => (<option key={`f${i}`} value={font}>{font}</option>))}
            </select>
        </div> 
    )
};

export default Fonts;