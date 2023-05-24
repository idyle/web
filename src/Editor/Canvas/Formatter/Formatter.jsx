import { 
    RxTextAlignCenter, RxTextAlignLeft, RxTextAlignRight, 
    RxTextAlignBottom, RxTextAlignMiddle, RxTextAlignTop,
    RxAlignRight, RxAlignLeft, RxAlignCenterHorizontally,
    RxAlignTop, RxAlignBottom, RxAlignCenterVertically,
    RxMargin, RxPadding, RxFontBold, RxFontItalic, RxUnderline, 
    RxFontStyle, RxHalf2, RxColorWheel
} from 'react-icons/rx';
import { useEditor } from '../../Editor';
import { useDom } from '../Canvas';
import formats from './formats';
import Format from './Format';
import Selector from './Selector';

const Toolbar = () => {

    const { page, setPageData } = useEditor();
    const { path, updateObjectFromPath } = useDom();

    const updateElement = (format) => setPageData({ ...updateObjectFromPath(page?.data, path, formats[format]) });

    return (
        <div className="flex place-content-center items-center gap-1 p-1 border border-black rounded-lg ">

            <Format icon={<RxFontBold />} onClick={() => updateElement('bold')} />
            <Format icon={<RxFontItalic onClick={() => updateElement('italic')} />} />
            <Format icon={<RxUnderline onClick={() => updateElement('underline')} />} />

            <Format title="Font" icon={<RxFontStyle />}>
            <input className="hidden" type="color" id="favcolor" name="favcolor" value="#ff0000" />
            </Format>

            <Selector title="FOnt" icon={<RxColorWheel />} />
   


            <Format icon={<RxTextAlignLeft onClick={() => updateElement('textLeft')} />} />
            <Format icon={<RxTextAlignCenter onClick={() => updateElement('textCenter')} />} />
            <Format icon={<RxTextAlignRight onClick={() => updateElement('textRight')} />} />
            <Format icon={<RxTextAlignBottom onClick={() => updateElement('textBottom')} />} />
            <Format icon={<RxTextAlignMiddle onClick={() => updateElement('textMiddle')} />} />
            <Format icon={<RxTextAlignTop onClick={() => updateElement('textTop')} />} />
 
            <Format title="Color" icon={<RxColorWheel />} />

            <Format icon={<RxAlignLeft onClick={() => updateElement('sectionLeft')} />} />
            <Format icon={<RxAlignCenterHorizontally onClick={() => updateElement('sectionCenter')} />} />
            <Format icon={<RxAlignRight onClick={() => updateElement('sectionRight')} />} />
            <Format icon={<RxAlignBottom onClick={() => updateElement('sectionTop')} />} />
            <Format icon={<RxAlignCenterVertically onClick={() => updateElement('sectionMiddle')} />} />
            <Format icon={<RxAlignTop onClick={() => updateElement('sectionBottom')} />} />

            <Format title="Margin" icon={<RxMargin />} />
            <Format title="Padding" icon={<RxPadding />} />

            <Format icon={<RxHalf2 />} />

        </div>
    )
};

export default Toolbar;