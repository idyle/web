const header = {
    component: 'h1',
    className: 'text-2xl font-bold',
    style: { fontSize: '24px', lineHeight: '32px' },
    children: 'Your Header Here'
};

const text = {
    component: 'h1',
    className: 'text-xl',
    style: { fontSize: '20px', lineHeight: '28px' },
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus lorem mauris, sed pharetra eros blandit eu. Praesent a aliquam dui. Nulla elementum nisl eu massa pharetra, sed rutrum diam.'
};

const section1 = {
    component: 'div',
    className: 'grid',
    children: [ { ...header, children: '1 Section' }, text ]
};

const section2 = {
    component: 'div',
    className: 'grid md:grid-cols-2',
    children: [ { ...header, children: '2 Section' }, text ]
};

const section3 = {
    component: 'div',
    className: 'grid md:grid-cols-3',
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
    className: 'text-white bg-black rounded-lg select-none block',
    href: 'test',
    children: [ { ...text, children: 'Button Name' }]
};

const link = {
    component: 'a',
    className: 'md:text-2xl text-xl text-blue-500 underline',
    href: 'test',
    children: 'Link'
}

const navBase = {
    component: 'div',
    className: 'grid grid-flow-col gap-1 bg-black text-white p-1',
    children: []
};

const navPart = {
    component: 'a',
    className: 'md:text-2xl text-xl',
    children: 'Sample'
};

export default {

    header, text, img, video,
    section1, section2, section3, 
    button, link, navBase, navPart
    
}