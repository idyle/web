// we'll use the same converter in Canvas but w/o the Wrapper

import { createElement } from 'react';

export const renderElements = (config, toggle = true) => {
    let children = config.children;
    if (children instanceof Array) children = children.map((e) => renderElements(e, toggle));

    let attributes = {};
    for (let [key, value] of Object.entries(config)) {
        if (key === 'component' || key === 'children') continue;
        if (key === 'id') value = config.id;
        attributes[`${key}`] = value;
    };

    attributes.key = `k-${config.id}`;
    if (!toggle) attributes.style = { all: 'initial' };

    return createElement(config.component, attributes, children);
};

