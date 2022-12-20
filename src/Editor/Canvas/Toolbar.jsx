import { useEditor } from "../Editor";
import { useDom } from "./Canvas";

const Toolbar = () => {

    const { JSON, setJSON } = useEditor();
    const { selected, setSelected } = useDom();

    const setObjectFromPath = (data, path, value) => {
        let current = data;
        let nearestParent = current;
    
        for (let depth = 0; depth < path.length; depth++) {

            console.log('iteration ', depth, 'current', current, 'path', path);

            if (current.component === 'div') {
                nearestParent = current;
                // saves the nearest parent in advance, in case the succeeding is a non div
                // tells us that there is a child inside
                current = current.children[path[depth]];
                console.log('the current being changed', current, 'at index', path[depth], 'with depth', depth);
            } 
            console.log('the nearest parent', nearestParent);

        };
        if (current.component !== 'div') current = nearestParent;
        // if our selected item is not a div

        value.id = `${current.id}-${current.children?.length}`;
        current.children = [...current.children, value];

        return data;
    };

    const generateId = () => {

    }

    const testfunction = () => {
        // JSON, path, template
        let path = [];
        if (selected?.includes('-')) path = selected.split('-');
        path.shift();

        for (let i = 0; i < path.length; i++) path[i] = parseInt(path[i]);


        const object = {
            component: 'h1',
            className: 'text-red-900 text-xl',
            children: 'hello',
        }
        const test = setObjectFromPath(JSON, path, object);
        

        setJSON({ ...test });
        // ALWAYS SPREAD TO AVOID

        // BASIS OF CREATION of ID = , taken from selected element (appending -[lenght])
        // onset should indicagte an empty array


    };

    const testfunction2 = () => {
        let path = [];
        if (selected?.includes('-')) path = selected.split('-');
        path.shift();
        for (let i = 0; i < path.length; i++) path[i] = parseInt(path[i]);


        const object = {
            component: 'div',
            className: 'grid grid-cols-2',
            children: []
        }
        const test = setObjectFromPath(JSON, path, object);
        setJSON({ ...test });
    };

    const testfunction3 = () => {
        const object = {
            component: 'img',
            src: 'https://i.imgur.com/EJOjIMC.jpeg'
        };

        let path = [];
        if (selected?.includes('-')) path = selected.split('-');
        path.shift();
        for (let i = 0; i < path.length; i++) path[i] = parseInt(path[i]);
        const test = setObjectFromPath(JSON, path, object);
        setJSON({ ...test });
    }


    return (
        <div className="grid auto-rows-min border border-black p-2 shadow-xl rounded-lg m-1">
            <h1 className="text-xl" onClick={testfunction}>Insert h1</h1>
            <h1 className="text-xl" onClick={testfunction2}>Insert Div</h1>
            <h1 className="text-xl" onClick={testfunction3}>Insert img</h1>
        </div> 
    )
};

export default Toolbar;