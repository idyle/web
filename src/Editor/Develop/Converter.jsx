import { createElement, useState } from 'react';
import { renderToString } from 'react-dom/server';

import Text from '../Elements/Text';

const Website = () => {

    const [config, setConfig] = useState({
        component: 'div',
        class: 'grid grid-cols-2',
        children: [
            {
                component: 'div',
                class: 'grid grid-cols-2',
                children: [
                    {
                        component: 'h1',
                        class: 'text-4xl',
                        children: 'hi'
                    },
                    {
                        component: 'h1',
                        class: 'text-4xl',
                        children: 'hi'
                    }
                ]
            },
            {
                component: 'div',
                class: 'grid grid-cols-2',
                children: [
                    {
                        component: 'h1',
                        class: 'text-4xl',
                        children: 'hi'
                    }
                ]
            },
        ]
    })
       
    return renderElements(config);
};

export default Website;


export const renderElements = (config) => {
    if (config.children instanceof Array) config.children = config.children.map((e) => renderElements(e));
    return createElement(config.component, { class: config.class }, config.children)
};

export const convertToString = (reactElement) => {
    return renderToString(reactElement)
}

console.log(convertToString(<Text/>))