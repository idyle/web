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

const Toolbar = () => {

    const { page, setPageData } = useEditor();
    const { path, updateObjectFromPath } = useDom();

    const updateElement = (format) => setPageData({ ...updateObjectFromPath(page?.data, path, formats[format]) });

    return (
        <div className="flex place-content-center items-center gap-1 p-1 border border-black rounded-lg ">

            <Format icon={<RxFontBold />} onClick={() => updateElement('bold')} />
            <Format icon={<RxFontItalic />} />
            <Format icon={<RxUnderline />} />

            <Format title="Font" icon={<RxFontStyle />} />

            <Format icon={<RxTextAlignLeft />} />
            <Format icon={<RxTextAlignCenter />} />
            <Format icon={<RxTextAlignRight />} />
            <Format icon={<RxTextAlignBottom />} />
            <Format icon={<RxTextAlignMiddle />} />
            <Format icon={<RxTextAlignTop />} />
 
            <Format title="Color" icon={<RxColorWheel />} />

            <Format icon={<RxAlignLeft />} />
            <Format icon={<RxAlignCenterHorizontally />} />
            <Format icon={<RxAlignRight />} />
            <Format icon={<RxAlignBottom />} />
            <Format icon={<RxAlignCenterVertically />} />
            <Format icon={<RxAlignTop />} />

            <Format title="Margin" icon={<RxMargin />} />
            <Format title="Padding" icon={<RxPadding />} />

            <Format icon={<RxHalf2 />} />

        </div>
    )
};

export default Toolbar;