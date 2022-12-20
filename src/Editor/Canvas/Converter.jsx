import { createElement, useState } from 'react';
import { renderToString } from 'react-dom/server';

import Wrapper from './Wrapper';

// const Website = () => {

//     const [config, setConfig] = useState({
//         component: 'div',
//         class: 'grid grid-cols-2',
//         id: '0',
//         // during json object, id is generated following a parent-child pattern (with dash)
        
//         children: [
//             {
//                 component: 'div',
//                 class: 'grid grid-cols-2',
//                 id: 'main-1',
//                 children: [
//                     {
//                         component: 'h1',
//                         class: 'text-4xl',
//                         children: 'hi',
//                         id: 'main-1-1'
//                     },
//                     {
//                         component: 'h1',
//                         class: 'text-4xl',
//                         children: 'hi',
//                         id: 'main-1-2'
//                     }
//                 ]
//             },
//             {
//                 component: 'div',
//                 class: 'grid grid-cols-2',
//                 id: 'main-2',
//                 // id is based on index
//                 children: [
//                     {
//                         component: 'h1',
//                         class: 'text-4xl',
//                         children: 'hi',
//                         id: 'main-2-1'
//                     }
//                 ]
//             },
//         ]
//     })
       
//     return renderElements(config);
// };

// export default Website;


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

export const convertToString = (reactElement) => {
    return renderToString(reactElement)
}

