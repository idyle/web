import { createElement } from 'react';

import Wrapper from './Wrapper';

export const renderElements = (config) => {

    let children = config.children;
    if (children instanceof Array) children = children.map((e) => renderElements(e));

    let attributes = {};
    for (let [key, value] of Object.entries(config)) {
        if (key === 'component' || key === 'children') continue;
        if (key === 'id') value = config.id;
        if (key === 'className') value = value.replace(/md:/g, "@md:");
        // canvas-only
        attributes[`${key}`] = value;
    };

    attributes.key = `k-${config.id}`;

    return (
        <Wrapper key={`w-${config.id}`}>
            {createElement(config.component, attributes, children)}
        </Wrapper>
    )
};

export const constructDom = (config, css, fontFamily) => {
    let body = renderElements(config);
    if (fontFamily) body = createElement("div", { style: { fontFamily } }, body);
    if (css) css = createElement("link", { rel: "stylesheet", href: css });
    return (<div className='w-full max-w-full'>{css}{body}</div>)
};