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

export const constructDom = (config, toggle, css, fontFamily, origin) => {
    console.log('font from cb', fontFamily, 'FROM', origin);
    let body = renderElements(config);
    if (fontFamily) body = createElement("div", { style: { fontFamily } }, body);
    if (toggle) toggle = createElement("script", { src: "https://cdn.tailwindcss.com" });
    if (css) css = createElement("link", { type: 'text/css', rel: "stylesheet", href: css });
    const string = renderToString(<html><head>{css}{toggle}</head><body>{body}</body></html>);
    return (
        <iframe className="w-full h-full" srcDoc={string}></iframe>
    )
};