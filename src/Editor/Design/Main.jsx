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
import "grapesjs-plugin-ckeditor";
import ckeditor from "ckeditor";

import './reset.css';
import './styles.css';
import './internal.css'

console.log(internal);// provide ability to click on page inside of editor


const Main = () => {

  const html = ReactDOMServer.renderToStaticMarkup(<Icon />);
  const test = ReactDOMServer.renderToStaticMarkup(<Test />);
  const [editor, setEditor] = useState();

    useEffect(() => {
      console.log(window.CKEDITOR)
      // wait to be ready
        const editor = init({

          canvas: {
            styles: ['http://localhost:3000/internal.css'],
            scripts: [
            'https://cdn.ckeditor.com/ckeditor5/35.3.1/classic/ckeditor.js'
          ]
        },
            // Indicate where to init the editor. You can also pass an HTMLElement
            container: '#gjs',
            // Get the content for the canvas directly from the element
            // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
            fromElement: true,
            plugins: ['gjs-plugin-ckeditor'],
            pluginsOpts: {
              'gjs-plugin-ckeditor': {
                position: "center",
                options: {
                  language: "en"
                  //skin: 'moono-dark',
                }
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
            height: '100%',
            width: '100%',
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
                    id: 'test',
                    label: html
                  },
                  {
                    id: 'test2',
                    label: html
                  },
                  {
                    id: 'test3',
                    label: html
                  },
                  {
                    id: 'test4',
                    label: html
                  },
                  {
                    id: 'test5',
                    label: html
                  },
                  {
                    id: 'test6',
                    label: html
                  },
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
                    content: `
                    <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                    </div>
                    <style>
                      .row {
                        display: flex;
                        justify-content: flex-start;
                        align-items: stretch;
                        flex-wrap: nowrap;
                        padding: 10px;
                        min-height: 75px;
                      }
                      .row-cell {
                        flex-grow: 1;
                        flex-basis: 100%;
                        padding: 5px;
                      }
                    </style>
                  `,
                    resizable: true
                  }, {
                    id: 'column',
                    label: '2 Columns',
                    content: `
                    <div class="row" data-gjs-droppable=".row-cell" data-gjs-draggable="true">
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                    </div>
                    <style>
                      .row {
                        display: flex;
                        justify-content: flex-start;
                        align-items: stretch;
                        flex-wrap: nowrap;
                        padding: 10px;
                        min-height: 75px;
                      }
                      .row-cell {
                        flex-grow: 1;
                        flex-basis: 100%;
                        padding: 5px;
                      }
                    </style>
                  `,
                  }
                ]
              },
                        blockManager: {
              custom: true,
                appendTo: '#blocks',
                blocks: [
                  {
                    id: 'test',
                    label: html,
                    category: 'Test'
                  },
                  {
                    id: 'test2',
                    label: html,
                    category: 'Test'
                  },
                  {
                    id: 'test3',
                    label: html,
                    category: 'Test'
                  },
                  {
                    id: 'test4',
                    label: html
                  },
                  {
                    id: 'test5',
                    label: html
                  },
                  {
                    id: 'test6',
                    label: html
                  },
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
                    content: `
                    <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                    </div>
                    <style>
                      .row {
                        display: flex;
                        justify-content: flex-start;
                        align-items: stretch;
                        flex-wrap: nowrap;
                        padding: 10px;
                        min-height: 75px;
                      }
                      .row-cell {
                        flex-grow: 1;
                        flex-basis: 100%;
                        padding: 5px;
                      }
                    </style>
                  `,
                    resizable: true
                  }, {
                    id: 'column',
                    label: '2 Columns',
                    content: `
                    <div class="row" data-gjs-droppable=".row-cell" data-gjs-draggable="true">
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                    </div>
                    <style>
                      .row {
                        display: flex;
                        justify-content: flex-start;
                        align-items: stretch;
                        flex-wrap: nowrap;
                        padding: 10px;
                        min-height: 75px;
                      }
                      .row-cell {
                        flex-grow: 1;
                        flex-basis: 100%;
                        padding: 5px;
                      }
                    </style>
                  `,
                  }
                ]
              },
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