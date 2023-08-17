// all elements must have a corresponding style

const bold = {
    className: 'font-bold',
    classPrefix: 'font',
    style: { fontWeight: 700 }
};

const italic = {
    className: 'italic',
    classPrefix: 'italic',
    style: { fontStyle: 'italic' }
};

const underline = {
    className: 'underline',
    classPrefix: 'underline',
    style: { textDecorationLine: 'underline' }
};

const textLeft = {
    className: 'text-left',
    classPrefix: 'text',
    style: { textAlign: 'left' }
};

const textCenter = {
    className: 'text-center',
    classPrefix: 'text',
    style: { textAlign: 'center' }
};

const textRight = {
    className: 'text-right',
    classPrefix: 'text',
    style: { textAlign: 'right' }
};

const textTop = {
    className: 'align-top',
    classPrefix: 'align',
    style: { verticalAlign: 'top' }
};

const textMiddle = {
    className: 'align-middle',
    classPrefix: 'align',
    style: { verticalAlign: 'middle' }
};

const textBottom = {
    className: 'align-bottom',
    classPrefix: 'align',
    style: { verticalAlign: 'bottom' }
};

const sectionLeft = {
    className: 'place-content-start',
    classPrefix: 'place-content',
    style: { placeContent: 'start' }
};

const sectionCenter = {
    className: 'place-content-center',
    classPrefix: 'place-content',
    style: { placeContent: 'center' }
};

const sectionRight = {
    className: 'place-content-end',
    classPrefix: 'place-content',
    style: { placeContent: 'end' }
};

const sectionTop = {
    className: 'items-start',
    classPrefix: 'items',
    style: { alignItems: 'flex-start' }
};

const sectionMiddle = {
    className: 'items-center',
    classPrefix: 'items',
    style: { alignItems: 'center' }
};

const sectionBottom = {
    className: 'items-end',
    classPrefix: 'items',
    style: { alignItems: 'flex-end' }
};

const roundedSmall = {
    className: 'rounded-sm',
    classPrefix: 'rounded',
    style: { borderRadius: '2px' }
};

const roundedLarge = {
    className: 'rounded-lg',
    classPrefix: 'rounded',
    style: { borderRadius: '8px' }
};

// add both when creating a format
// when desktop, md or "@media (min-width: 768px)"

export default {
    bold, italic, underline,
    textLeft, textCenter, textRight,
    textTop, textMiddle, textBottom,
    sectionLeft, sectionCenter, sectionRight,
    sectionTop, sectionMiddle, sectionBottom, 
    roundedSmall, roundedLarge
}