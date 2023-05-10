import { MdOutlinePermMedia, MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { RiGasStationFill } from 'react-icons/ri';
import File from './File';
import { useUtil } from '../../Contexts/Util';
import { useAuth } from '../../Contexts/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { deployWebsite } from '../requests';

const Staging = ({ website, deploy }) => {

    const { prompt, notify, setIntegrator, integrator, setLoader } = useUtil();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const { pathname: origin } = useLocation();

    const sendFileRequest = async () => {
        setIntegrator({ active: true, target: 'objects', origin });
        notify('Sending you to objects. Please select a file to deploy.')
        navigate('/objects');
    };

    const setIndex = (i) => {
        let array = files;
        console.log('FILES', files);
        for (const index in files) console.log(index);
        console.log('ARRAY', array);
        setFiles(array);
    };

    // returning
    useEffect(() => {
        console.log('integrator', integrator, integrator?.origin, origin);
        if (!integrator?.active || !integrator?.data) return console.log('EHK');
        if (integrator?.target !== 'objects' || integrator?.origin !== origin) return console.log('ehk2');
        setFiles([ ...files, { path: integrator?.data?.name, index: true } ]);
        setIntegrator({ active: false });
    }, [integrator?.active]);

    useEffect(() => console.log(files), [files]);

    const remove = async (filePath) => {
        if (!(await prompt('Remove your chosen file?'))) return;
        setFiles(files.filter(file => file.path !== filePath));
        notify('Removed the file.');
    };

    const onDeploy = async () => {
        if (!files.length) return notify('You added no files.');
        if (!(await prompt("You're about to make a deploy. Proceed?"))) return;
        deploy(files);
    };

    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] bg-black text-white rounded-lg p-3 gap-2 overflow-auto">

            <div className="grid">
            <div className="flex items-center gap-2 p-2">
                    <RiGasStationFill size="40px" />
                    <h1 className="text-6xl">Staging Area</h1>
                </div>

            <div onClick={sendFileRequest} className="flex items-center gap-2 place-content-center border border-white rounded-xl select-none hover:scale-[.98]">
                <h1 className="text-4xl text-center">Select Files from Objects</h1>
            </div>

            </div>

            <div className="grid auto-rows-min rounded-lg p-2 border border-white overflow-auto">
                {files?.map((file, i) => (<File file={file} key={`f${i}`} setIndex={setIndex} remove={remove} />))}
            </div>

            <div onClick={onDeploy} className="grid items-center justify-items-center bg-white text-black p-2 gap-1 rounded-lg select-none hover:scale-[.98]">
                <h1 className="text-4xl font-bold">Initiate Deploy</h1>
            </div>
        </div>
    )
};

export default Staging;