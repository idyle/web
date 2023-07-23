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
    console.log(config, config?.component);

    return (
        <Wrapper key={`w-${config.id}`}>
            {createElement(config.component, attributes, children)}
        </Wrapper>
    )
};

export const constructDom = (config, css, fontFamily, origin) => {
    let body = renderElements(config);
    if (fontFamily) body = createElement("div", { style: { fontFamily }, className: 'w-full max-w-full h-full max-h-full overflow-auto' }, body);
    if (css) css = createElement("link", { rel: "stylesheet", href: css });
    return (<div className="w-full max-w-full h-full max-h-full overflow-auto">{css}{body}</div>)
};