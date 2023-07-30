// we'll use the same converter in Canvas but w/o the Wrapper

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

export const renderElements = (config) => {
    let children = config.children;
    if (children instanceof Array) children = children.map((e) => renderElements(e));

    let attributes = {};
    for (let [key, value] of Object.entries(config)) {
        if (key === 'component' || key === 'children') continue;
        if (key === 'id') value = config.id;
        attributes[`${key}`] = value;
    };

    attributes.key = `k-${config.id}`;
    return createElement(config.component, attributes, children);
};

export const constructDom = (config, toggle, css, fontFamily) => {
    let body = renderElements(config);
    if (fontFamily) body = createElement("div", { style: { fontFamily } }, body);
    if (toggle) toggle = createElement("script", { src: "https://cdn.tailwindcss.com" });
    if (css) css = createElement("link", { type: 'text/css', rel: "stylesheet", href: css });
    const aosCss = createElement("link", { rel: "stylesheet", href: "https://unpkg.com/aos@next/dist/aos.css" });
    const aosJs = createElement("script", { src: "https://unpkg.com/aos@next/dist/aos.js" });
    const aosInit = createElement("script", {}, 'AOS.init();');
    const string = renderToString(
        <html>
            <head>{css}{aosCss}{toggle}</head>
            <body style={{ width: '100%', maxWidth: '100%' }}>{body}{aosJs}{aosInit}</body>
        </html>
    );
    return (
        <iframe className="w-full h-full" srcDoc={string}></iframe>
    )
};