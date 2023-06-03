import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import Wrapper from './Wrapper';

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

    return (
        <Wrapper key={`w-${config.id}`}>
            {createElement(config.component, attributes, children)}
        </Wrapper>
    )
};

export const constructDom = (config, css) => {
    let body = renderElements(config);
    if (css) css = createElement("link", { rel: "stylesheet", href: css });
    return (<div>{css}{body}</div>)
};