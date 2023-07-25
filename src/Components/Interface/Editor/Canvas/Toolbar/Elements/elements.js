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
    style: { fontSize: '20px', lineHeight: '28px' },
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus lorem mauris, sed pharetra eros blandit eu. Praesent a aliquam dui. Nulla elementum nisl eu massa pharetra, sed rutrum diam.'
};

const grid = {
    component: 'div',
    "data-aos": "fade-in",
    className: 'grid',
    style: { display: 'grid' },
    children: [ { ...header, children: 'Grid Section' }, text ]
};

const flex = {
    component: 'div',
    "data-aos": "fade-in",
    className: 'flex flex-col md:flex-row @md:flex-row w-full',
    style: { display: 'flex' },
    children: [ { ...header, children: 'Flex Section' }, text ]
};

const section1 = {
    component: 'div',
    "data-aos": "fade-in",
    className: 'flex w-full overflow-auto',
    style: { display: 'flex' },
    children: [ { ...header, children: '1 Section' }, text ]
};

const section2 = {
    component: 'div',
    className: 'grid md:grid-cols-2 @md:grid-cols-2',
    style: { display: 'grid' },
    children: [ { ...header, children: '2 Section' }, text ]
};

const section3 = {
    component: 'div',
    className: 'grid md:grid-cols-3 @md:grid-cols-3',
    style: { display: 'grid' },
    children: [ { ...header, children: '3 Section' }, header, text ]
}

const img = {
    component: 'img',
    src: 'https://i.imgur.com/EJOjIMC.jpeg',
    alt: 'Image'
};

const video = {
    component: 'video',
    src: 'https://i.imgur.com/WWDmWU7.mp4',
    alt: 'Video',
    controls: 'true',
};

const button = {
    component: 'a',
    className: 'block text-white bg-black rounded-lg select-none',
    style: { display: 'block', color: 'white', backgroundColor: 'black', borderRadius: '8px', userSelect: 'none' },
    href: 'test',
    children: [ { ...text, children: 'Button Name' }]
};

const link = {
    component: 'a',
    className: 'text-xl text-blue underline',
    style: { fontSize: '20px', lineHeight: '28px', color: 'blue', textDecorationLine: 'underline' },
    href: 'test',
    children: 'Link'
}

const navBase = {
    component: 'div',
    className: 'grid grid-flow-col text-white bg-black gap-1 p-1',
    style: { display: 'grid', gridAutoFlow: 'column', color: 'white', backgroundColor: 'black', gap: '4px', padding: '4px' },
    children: []
};

const navPart = {
    component: 'a',
    className: 'text-xl',
    style: { fontSize: '20px', lineHeight: '28px' },
    children: 'Sample'
};

export default {
    header, text, img, video,
    flex, grid,
    section1, section2, section3, 
    button, link, navBase, navPart
}