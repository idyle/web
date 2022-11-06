import { init } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { useEffect } from 'react';
import ReactDOMServer from "react-dom/server";
import Icon from './Icon';
import Test from './Test';

import "./reset.css";
import "./styles.css";



const Main = () => {

  const html = ReactDOMServer.renderToStaticMarkup(<Icon />);
  const test = ReactDOMServer.renderToStaticMarkup(<Test />);

    useEffect(() => {
        const editor = init({
            defaults: {

                toolbar: [], // this will prevent its rendering on the component
              },
            // Indicate where to init the editor. You can also pass an HTMLElement
            container: '#gjs',
            // Get the content for the canvas directly from the element
            // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
            fromElement: true,
            // Size of the editor
            height: 'auto',
            width: 'auto',
            // Disable the storage manager for the moment
            storageManager: false,
            // Avoid any default panel
            buildProps: ['font-family', 'Okta Nueve'],
properties:[
	{  
		property: 'font-family',
		name: 'Font',
		list: [
			{ name: 'Okta Nueve', value: 'Okta Nueve, sans-serif' }
		
		]
	}],
            panels: { defaults: [] },
            blockManager: {
              custom: true,
                appendTo: '#blocks',
                blocks: [
                  {
                    id: 'section', // id is mandatory
                    label: html, // You can use HTML/SVG inside labels
                    attributes: { class:'gjs-block-section' },
                    content: `<section>
                      <h1>This is a simple title</h1>
                      <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                    </section>`,
                  }, {
                    id: 'text',
                    label: html,
                    content: test,
                  }, {
                    id: 'image',
                    label: html,
                    // Select the component once it's dropped
                    select: true,
                    // You can pass components as a JSON instead of a simple HTML string,
                    // in this case we also use a defined component type `image`
                    content: { type: 'image' },
                    // This triggers `active` event on dropped components and the `image`
                    // reacts by opening the AssetManager 
                    // Asset
                    activate: true,
                  }
                ]
              },
          });
          editor.on('load', function () {
            //Add Lato Font & Set as Default
           const fontProperty = editor.StyleManager.getProperty('Typography', 'font-family');
           fontProperty.addOption({value: `Okta Neue sans-serif`, name: 'Okta Neue'});
           fontProperty.set('defaults', `Okta Neue sans-serif`);
       });
          editor.stopCommand('core:copy')
    }, []);

    
    console.log('htmll', html)
    
    return (
      <div className="grid grid-cols-[10%_90%] w-full h-[400px]">
        <div className="h-full" id="blocks"></div>
        <div id="gjs"></div>
      </div>


    )
};

export default Main;