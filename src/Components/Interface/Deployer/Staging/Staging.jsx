import { RiGasStationFill } from 'react-icons/ri';
import File from './File';
import { useUtil } from '../../../../Contexts/Util';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { convertPages } from '../requests';
import { useData } from '../../../../Contexts/Data';
import Page from './Page';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../../../Contexts/Auth';

const Staging = ({ deploy }) => {

    const { getToken } = useAuth();
    const { confirm, notify, setIntegrator, integrator, load } = useUtil();
    const navigate = useNavigate();
    const { pathname: origin } = useLocation();
    const { pages: pagesFromEditor, resetObjects } = useData();
    const [files, setFiles] = useState([]);
    const [pages, setPages] = useState(pagesFromEditor);
    const [index, setIndex] = useState();
    useEffect(() => setPages(pagesFromEditor), [pagesFromEditor]);

    // move this over to Labs
    const sendFileRequest = async () => {
        setIntegrator({ active: true, target: 'objects', origin });
        notify('Sending you to objects. Please select a file to deploy.')
        navigate('/objects');
    };

    // returning
    useEffect(() => {
        if (!integrator?.active || !integrator?.data) return;
        if (integrator?.target !== 'objects' || integrator?.origin !== origin) return;
        setFiles([ ...files, { path: integrator?.data?.name } ]);
        setIntegrator({ active: false });
    }, [integrator?.active]);


    const removePage = async (pageId) => {
        if (!(await confirm('Remove your chosen page?'))) return;
        setPages(pages.filter(page => page.id !== pageId));
        notify('Removed the file.');
    };

    const removeFile = async (filePath) => {
        if (!(await confirm('Remove your chosen file?'))) return;
        setFiles(files.filter(file => file.path !== filePath));
        notify('Removed the file.');
    };

    const onDeploy = async () => {
        if (!files.length && !pages?.length) return notify('You added no pages or files.');
        if (!index) return notify('You must specify an index.');
        if (!(await confirm("You're about to make a deploy. Proceed?"))) return;

        // let's first run a batch convert on our pages 
        if (!pages?.length) return deploy(files);
        notify('Beginning conversion on the pages first...');
        load(true);
        const token = await getToken();
        const batch = await convertPages(token);
        load(false);
        if (!batch) return notify('Something went wrong trying to convert.');
        resetObjects();
        // let pageFiles = pages.map(( { route }) => ({ path: objects?.find(( { name } ) => name === `${route}.html`)?.path }));
        let pageFiles = pages.map(( { route, id }) => ({ path: `${route}.html`, index: (id === index) }));
        let objectFiles = files.map(( { path } ) => ({ path, index: (path === index) }));
        notify('Now initiating deploy...');
        deploy([ ...objectFiles, ...pageFiles ]);
    };

    // (load) show pages with ability to remove / specify index 
    // (load) index by default is first item in array

    // (deploy) 1: run batchconvert on ALL pages
    // (deploy) 2: initiate deploy

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] bg-gunmetal text-white rounded-lg p-3 gap-2 md:overflow-auto">
            <div className="grid">
                <div className="flex items-center gap-2 p-2">
                    <RiGasStationFill size="40px" />
                    <h1 className="text-5xl md:text-6xl font-bold">Staging Area</h1>
                </div>
                <div onClick={sendFileRequest} className="flex items-center gap-2 place-content-center border border-white rounded-xl select-none hover:scale-[.98]">
                    <h1 className="text-4xl text-center">Select Files from Objects</h1>
                </div>
            </div>

            <div className="grid auto-rows-min rounded-lg p-2 border border-white md:overflow-auto">
                {pages?.map((page, i) => (<Page page={page} key={`p-d${i}`} setIndex={setIndex} index={index} remove={removePage} />))}
                {files?.map((file, i) => (<File file={file} key={`f${i}`} setIndex={setIndex} index={index} remove={removeFile} />))}
            </div>

            <div onClick={onDeploy} className="grid items-center justify-items-center bg-white text-black p-2 gap-1 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-4xl font-bold">Initiate Deploy</h1>
            </div>
        </div>
    )
};

export default Staging;