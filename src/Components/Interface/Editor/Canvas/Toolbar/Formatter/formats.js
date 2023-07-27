// all elements must have a corresponding style

const bold = {
    className: 'font-bold',
    style: { fontWeight: 700 }
};

const italic = {
    className: 'italic',
    style: { fontStyle: 'italic' }
};

const underline = {
    className: 'underline',
    style: { textDecorationLine: 'underline' }
};

const textLeft = {
    className: 'text-left',
    style: { textAlign: 'left' }
};

const textCenter = {
    className: 'text-center',
    style: { textAlign: 'center' }
};

const textRight = {
    className: 'text-right',
    style: { textAlign: 'right' }
};

const textTop = {
    className: 'align-top',
    style: { verticalAlign: 'top' }
};

const textMiddle = {
    className: 'align-middle',
    style: { verticalAlign: 'middle' }
};

const textBottom = {
    className: 'align-bottom',
    style: { verticalAlign: 'bottom' }
};

const sectionLeft = {
    className: 'place-items-start',
    style: { placeItems: 'start' }
};

const sectionCenter = {
    className: 'place-items-center',
    style: { placeItems: 'center' }
};

const sectionRight = {
    className: 'place-items-end',
    style: { placeItems: 'end' }
};

const sectionTop = {
    className: 'items-start',
    style: { alignItems: 'flex-start' }
};

const sectionMiddle = {
    className: 'items-center',
    style: { alignItems: 'center' }
};

const sectionBottom = {
    className: 'items-end',
    style: { alignItems: 'flex-end' }
};

const roundedSmall = {
    className: 'rounded-sm',
    style: { borderRadius: '2px' }
};

const roundedLarge = {
    className: 'rounded-lg',
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

// export default {
//     bold: 'font-bold',
//     italic: 'italic',
//     underline: 'underline',

//     textLeft: 'text-left',
//     textCenter: 'text-center',
//     textRight: 'text-right',

//     textTop: 'align-top',
//     textMiddle: 'align-middle',
//     textBottom: 'align-bottom',

//     sectionLeft: 'justify-items-start',
//     sectionCenter: 'justify-items-center',
//     sectionRight: 'justify-items-end',

//     sectionTop: 'items-start',
//     sectionMiddle: 'items-center',
//     sectionBottom: 'items-end',

//     roundedSmall: 'rounded-sm',
//     roundedLarge: 'rounded-lg'

// }