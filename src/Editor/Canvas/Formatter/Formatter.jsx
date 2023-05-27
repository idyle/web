import { 
    RxTextAlignCenter, RxTextAlignLeft, RxTextAlignRight, 
    RxTextAlignBottom, RxTextAlignMiddle, RxTextAlignTop,
    RxAlignRight, RxAlignLeft, RxAlignCenterHorizontally,
    RxAlignTop, RxAlignBottom, RxAlignCenterVertically,
    RxMargin, RxPadding, RxFontBold, RxFontItalic, RxUnderline, 
    RxFontStyle, RxHalf2, RxColorWheel, RxSquare, RxCircle
} from 'react-icons/rx';
import { useEditor } from '../../Editor';
import { useDom } from '../Canvas';
import formats from './formats';
import Format from './Format';
import Selector from './Selector';
import Inputter from './Inputter';

const Toolbar = () => {

    const { page, setPageData } = useEditor();
    const { path, updateObjectFromPath, updateClassFromPath } = useDom();

    const updateElement = (format) => setPageData({ ...updateClassFromPath(page?.data, path, formats[format]) });

    return (
        <div className="flex place-content-center items-center gap-1 p-1 border border-black rounded-lg ">

            <Format icon={<RxFontBold />} format="bold" />
            <Format icon={<RxFontItalic />} format="italic" />
            <Format icon={<RxUnderline/>} format="underline" />
            <Inputter format="fontSize" icon={<RxFontStyle />} />

            <Selector format="color" icon={<RxColorWheel />} />

            <Format icon={<RxTextAlignLeft />} format="textLeft"  />
            <Format icon={<RxTextAlignCenter />} format="textCenter"  />
            <Format icon={<RxTextAlignRight />} format="textRight"  />
 
            <Selector format="backgroundColor"  icon={<RxHalf2 />} />

            <Format icon={<RxAlignLeft />} format="sectionLeft"  />
            <Format icon={<RxAlignCenterHorizontally />} format="sectionCenter"  />
            <Format icon={<RxAlignRight />} format="sectionRight"  />
            <Format icon={<RxAlignBottom />} format="sectionTop" />
            <Format icon={<RxAlignCenterVertically />} format="sectionMiddle" />
            <Format icon={<RxAlignTop />} format="sectionBottom" />
            <Inputter format="margin" icon={<RxMargin />} />

            <Format icon={<RxSquare />} format="roundedSmall" />
            <Format icon={<RxCircle />} format="roundedLarge" />

        </div>
    )
};

export default Toolbar;