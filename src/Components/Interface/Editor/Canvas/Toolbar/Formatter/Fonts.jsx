import { cloneElement, useEffect, useState } from "react";
import { useEditor } from "../../../Editor";
import { useUtil } from "../../../../../../Contexts/Util";

const Fonts = ({ icon }) => {
    const editedIcon = cloneElement(icon, { color: "inherit", size: "25px" });
    const defaultFonts = [ 
        'Times New Roman', 'Arial', 'Courier New',
        'Verdana', 'Garamond', 'Georgia',
        'Courier New', 'Brush Script MT'
    ];
    const [fonts, setFonts] = useState(defaultFonts);

    const { font, setFont, setPageMetadata } = useEditor();
    const { prompt, inform, confirm } = useUtil();

    // func that captures value
    const onChange = async (e) => {
        let font;
        if (e.target.value === 'custom') {
            const inputFont = await prompt('', 'Input your custom font');
            if (!inputFont) return;
            await inform('You need to run further steps to use your font', 'Make sure you import a CSS file with the font.');
            font = inputFont;
        } else if (e.target.value === 'remove') {
            if (!(await confirm('Are you sure you want to delete all custom fonts?'))) return;
            setFonts([ ...defaultFonts ]);
            font = defaultFonts[0];
        } else font = fonts.find(font => font === e.target.value);
        // find the actual font from the area;
        if (!font) return;
        console.log(font, 'font');
        // no match
        setFont(font);
        setPageMetadata({ font });
    };

    // once we've successfully handled data transfer, 
    // we need to handle displaying it as a checked option

    useEffect(() => {
        if (!font) return;
        const indexedFont = fonts.find(f => f === font);
        if (indexedFont) return;
        setFonts([ ...fonts, font ]);
    }, [font]);

    return (
        <div className={`flex text-gunmetal gap-1 rounded-lg border border-gunmetal items-center p-1 select-none`}>   
            {editedIcon}
            <select value={font || 'native'} onChange={onChange} className="text-md outline-none bg-white text-center max-w-[100px]">
                { !font && <option disabled value="native">Native</option>}
                {fonts.map((font, i) => (<option key={`f${i}`} value={font}>{font}</option>))}
                <option value="custom">Add Custom (+)</option>
                <option value="remove">Delete Custom (-)</option>
            </select>
        </div> 
    )
};

export default Fonts;