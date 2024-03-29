import { 
    RxTextAlignCenter, RxTextAlignLeft, RxTextAlignRight, 
    RxAlignRight, RxAlignLeft, RxAlignCenterHorizontally,
    RxAlignTop, RxAlignBottom, RxAlignCenterVertically,
    RxMargin, RxPadding, RxFontBold, RxFontItalic, RxUnderline, 
    RxFontStyle, RxHalf2, RxColorWheel, RxFontSize, RxCircle, RxMagicWand,
    RxSpaceBetweenHorizontally
} from 'react-icons/rx';
import Format from './Format';
import Color from './Color';
import Sizing from './Sizing';
import Fonts from './Fonts';
import Animate from './Animate';

const Toolbar = () => {

    return (
        <div className="flex flex-wrap place-content-center md:place-content-start items-center gap-1 p-1 rounded-lg bg-white text-gunmetal">

            <Format icon={<RxFontBold />} format="bold" />
            <Format icon={<RxFontItalic />} format="italic" />
            <Format icon={<RxUnderline/>} format="underline" />
            <Sizing format="fontSize" icon={<RxFontSize />} />
            <Fonts icon={<RxFontStyle />} />

            <Format icon={<RxTextAlignLeft />} format="textLeft"  />
            <Format icon={<RxTextAlignCenter />} format="textCenter"  />
            <Format icon={<RxTextAlignRight />} format="textRight"  />

            <Color format="color" icon={<RxColorWheel />} />
            <Color format="backgroundColor"  icon={<RxHalf2 />} />

            <Format icon={<RxAlignLeft />} format="sectionLeft"  />
            <Format icon={<RxAlignCenterHorizontally />} format="sectionCenter"  />
            <Format icon={<RxAlignRight />} format="sectionRight"  />
            <Format icon={<RxAlignBottom />} format="sectionTop" />
            <Format icon={<RxAlignCenterVertically />} format="sectionMiddle" />
            <Format icon={<RxAlignTop />} format="sectionBottom" />

            <Sizing format="margin" icon={<RxMargin />} />
            <Sizing format="padding" icon={<RxPadding />} />
            <Sizing format="gap" icon={<RxSpaceBetweenHorizontally />} />

            <Format icon={<RxCircle />} format="roundedLarge" />
            <Animate icon={<RxMagicWand />} />
            

        </div>
    )
};

export default Toolbar;