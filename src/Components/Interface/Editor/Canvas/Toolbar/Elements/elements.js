// all elements must have corresponding style

const header = {
    component: 'h1',
    className: 'text-2xl font-bold',
    style: { fontSize: '24px', lineHeight: '32px', fontWeight: 700 },
    children: 'Your Header Here'
};

const text = {
    component: 'h1',
    className: 'text-xl',
    style: { fontSize: '20px', lineHeight: '28px', fontWeight: 400 },
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus lorem mauris, sed pharetra eros blandit eu. Praesent a aliquam dui. Nulla elementum nisl eu massa pharetra, sed rutrum diam.'
};

const column = {
    component: 'div',
    "data-aos": "fade-in",
    "data-aos-offset": "0",
    className: 'flex flex-col md:flex-row @md:flex-row w-full',
    style: { display: 'flex', width: '100%' },
    children: [ { ...header, children: 'Column Section' }, text ]
};


const row = {
    component: 'div',
    "data-aos": "fade-in",
    "data-aos-offset": "0",
    className: 'flex flex-col w-full',
    style: { display: 'flex', width: '100%' },
    children: [ { ...header, children: 'Row Section' }, text ]
};

const embed = {
    component: 'iframe',
    "data-aos": "fade-in",
    "data-aos-offset": "0",
    src: `https://docs.google.com/forms/d/e/1FAIpQLScuCMlQ279_Rl8F-Q60KPqRluWp2jDCwSF-yRnqQSyp80Hw2A/viewform?embedded=true`,
    style: { height: '100%', width: '100%' },
    className: 'h-full w-full',
    children: []
};

const dropdown = {
    component: 'details',
    "data-aos": "fade-in",
    "data-aos-offset": "0",
    className: 'text-2xl',
    style: { fontSize: '24px', lineHeight: '32px' },
    children: [
        {
            component: 'summary',
            children: 'Collapse'
        },
        text
    ]
};

const imgBase = {
    component: 'img',
    src: 'https://i.imgur.com/EJOjIMC.jpeg',
    alt: 'Image'
};

const videoBase = {
    component: 'video',
    src: 'https://i.imgur.com/WWDmWU7.mp4',
    alt: 'Video',
    controls: 'true',
};

const img = {
    component: 'div',
    className: 'max-w-full w-auto overflow-hidden',
    style: { maxWidth: '100%', width: 'auto', overflow: 'hidden' },
    children: [ imgBase ]
};

const video = {
    component: 'div',
    className: 'max-w-full w-auto overflow-hidden',
    style: { maxWidth: '100%', width: 'auto', overflow: 'hidden' },
    children: [ videoBase ]
};


const button = {
    component: 'a',
    className: 'block text-xl text-white bg-black',
    style: { display: 'block', fontSize: '20px', lineHeight: '28px', color: 'white', backgroundColor: 'black' },
    href: 'test',
    children: 'Button'
};

const link = {
    component: 'a',
    className: 'block text-xl text-blue underline',
    style: { display: 'block', fontSize: '20px', lineHeight: '28px', color: 'blue', textDecorationLine: 'underline' },
    href: 'test',
    children: 'Link'
};

const navBase = {
    component: 'div',
    className: 'flex flex-wrap place-content-center text-white bg-black w-full sticky top-0 z-10',
    style: { display: 'flex', placeContent: 'center', flexWrap: 'wrap', width: '100%', color: 'white', backgroundColor: 'black', padding: '8px', gap: '4px', position: 'sticky', top: '0px', zIndex: '10' },
    children: []
};

const navPart = {
    component: 'a',
    className: 'block text-xl font-bold',
    style: { display: 'block', fontSize: '20px', lineHeight: '28px', fontWeight: 700, padding: '4px' },
    children: 'Sample'
};

export default {
    header, text, img, video,
    column, row,
    button, link, navBase, navPart,
    embed, dropdown
}