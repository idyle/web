import { 
    RxTextAlignCenter, RxTextAlignLeft, RxTextAlignRight, 
    RxTextAlignBottom, RxTextAlignMiddle, RxTextAlignTop,
    RxAlignRight, RxAlignLeft, RxAlignCenterHorizontally,
    RxAlignTop, RxAlignBottom, RxAlignCenterVertically,
    RxMargin, RxPadding, RxFontBold, RxFontItalic, RxUnderline, 
    RxFontStyle, RxHalf2, RxColorWheel
} from 'react-icons/rx';

const Toolbar = () => {
    return (
        <div className="flex place-content-center items-center gap-1 p-1 border border-black rounded-lg ">

                <div className="flex border border-black rounded-lg p-0.5">
                    <RxFontBold size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxFontItalic size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxUnderline size="25px" />
                </div>
                <div className="flex border border-black rounded-lg gap-x-1 items-center p-0.5">
                    <RxFontStyle size="25px" />
                    <h1 className="text-sm">Font</h1>
                </div>

                <div className="flex border border-black rounded-lg p-0.5">
                    <RxTextAlignLeft size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxTextAlignCenter size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxTextAlignRight size="25px" />
                </div>

                <div className="flex border border-black rounded-lg p-0.5">
                    <RxTextAlignBottom size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxTextAlignMiddle size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxTextAlignTop size="25px" />
                </div>

                <div className="flex border border-black rounded-lg gap-x-1 items-center p-0.5">
                    <RxColorWheel size="25px" />
                    <h1 className="text-sm">Color</h1>
                </div>

       
  

                <div className="flex border border-black rounded-lg p-0.5">
                    <RxAlignLeft size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxAlignCenterHorizontally size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxAlignRight size="25px" />
                </div>

                <div className="flex border border-black rounded-lg p-0.5">
                    <RxAlignBottom size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxAlignCenterVertically size="25px" />
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxAlignTop size="25px" />
                </div>

                <div className="flex border border-black rounded-lg gap-x-1 items-center p-0.5">
                    <RxMargin size="25px" />
                    <h1 className="text-sm">Margin</h1>
                </div>
                <div className="flex border border-black rounded-lg gap-x-1 items-center p-0.5">
                    <RxPadding size="25px" />
                    <h1 className="text-sm">Padding</h1>
                </div>
                <div className="flex border border-black rounded-lg p-0.5">
                    <RxHalf2 size="25px" />
                </div>
            </div>


    )
};

export default Toolbar;