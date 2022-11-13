import { init } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs/dist/grapes.min.js';
// import 'grapesjs-plugin-ckeditor/dist/grapesjs-plugin-ckeditor.min.js'
import { useEffect, useState } from 'react';
import ReactDOMServer from "react-dom/server";
import Icon from './Icon';
import Test from './Test';
import { styleManager } from './config';
import internal from './internal.css';
// import './cke.js';
import 'ckeditor/ckeditor.js';
import plugin from 'grapesjs-plugin-ckeditor';

import './reset.css';
import './styles.css';


import test from './styles.css';

console.log(internal);// provide ability to click on page inside of editor


const Main = () => {

  const html = ReactDOMServer.renderToStaticMarkup(<Icon />);
  const test = ReactDOMServer.renderToStaticMarkup(<Test />);
  const [editor, setEditor] = useState();

    useEffect(() => {
      // wait to be ready
        const editor = init({

          canvas: {
            styles: ['http://localhost:3000/internal.css'],
            scripts: [
              "https://cdn.ckeditor.com/ckeditor5/12.4.0/classic/ckeditor.js"
          ]
        },
            // Indicate where to init the editor. You can also pass an HTMLElement
            container: '#gjs',
            // Get the content for the canvas directly from the element
            // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
            fromElement: true,
            plugins: [plugin],
            pluginsOpts: {
              'gjs-plugin-ckeditor' : {
                options: {
                        language: 'en',
                        toolbarGroups: [
                          { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                          { name: 'forms', groups: [ 'forms' ] },
                          '/',
                          { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                          { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                          { name: 'links', groups: [ 'links' ] },
                          { name: 'insert', groups: [ 'insert' ] },
                          '/',
                          { name: 'styles', groups: [ 'styles' ] },
                          { name: 'colors', groups: [ 'colors' ] },
                          { name: 'tools', groups: [ 'tools' ] },
                          { name: 'others', groups: [ 'others' ] },
                          { name: 'about', groups: [ 'about' ] }
                        ],
                        removeButtons: 'NewPage'
                      },
              }
            },
            canvasCss: `
            .gjs-selected {
              outline: none !important;
              border: 1.5px solid black !important;
            }

            .gjs-selected-parent {
              border: none !important;
              outline:4px solid black !important;
              }

              .gjs-placeholder.vertical, .gjs-placeholder.int, .gjs-placeholder.horizontal  {
                outline: none !important;
                border: 1.5px solid black !important;
              }
            `,
            // Size of the editor
            height: 'auto',
            width: 'auto',
            // Disable the storage manager for the moment
            storageManager: false,
            // Avoid any default panel
            panels: { defaults: [] },
            styleManager,
            blockManager: {
              custom: true,
                appendTo: '#blocks',
                blocks: [
                  {
                    id: 'section', // id is mandatory
                    label: html, // You can use HTML/SVG inside labels
                    attributes: { class:'gjs-block-section' },
                    content: `<section style="font-family: Helectiva, serif">
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

          editor.on('canvas:drop', () => console.log(editor.getHtml()))
          setEditor(editor);
          editor.on('load', function () {
            //Add Lato Font & Set as Default
           const fontProperty = editor.StyleManager.getProperty('typography', 'font-family');
           console.log(fontProperty.get());
           fontProperty.addOption({value: `Okta Neue, sans-serif`, name: 'TESTTEST'});
           fontProperty.set('default', `Okta Neue, sans-serif`);
       });



    }, []);

    
    console.log('htmll', html)
    
    return (
      <div className="grid grid-cols-[15%_70%_15%] m-2">
        <div className="grid p-2 shadow-xl rounded-lg m-1">
        <div className="h-full" id="blocks"></div>
        </div>
        <div className="grid p-2 shadow-xl overflow-hidden rounded-lg m-1">
        <div className="p-4 rounded-xl overflow-hidden" id="gjs"></div>
        
    </div>
    <div className="grid p-2 shadow-xl rounded-lg m-1">
    <div className="styles-container"></div>
        </div>
    
      </div>



    )
};

export default Main;