import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { listPages } from "../Components/Interface/Editor/requests";
import { getWebsites, listDeploys } from "../Components/Interface/Deployer/requests";
import { listDocs } from '../Components/Interface/Documents/requests';
import { listFiles } from "../Components/Interface/Objects/requests";
import { getMetrics } from "../Components/Interface/Payments/requests";
import { useUtil } from "./Util";
import { getAuth } from "firebase/auth";

const DataValues = createContext();
export const useData = () => useContext(DataValues);

const DataContext = ({ children }) => {

    // impl only for LIST requests in editor, deployer, objects, docs
    // applicable also for get requests in deployer
    // implements caching using session storage

    const getDataFromSession = () => {
        try {
            const storage = sessionStorage.getItem('idyle-data');
            if (!storage) return {};
            return JSON.parse(storage);
        } catch {
            return {};
        }
    };

    const saveToSession = (data) =>{
        if (!data) return;
        const stringified = JSON.stringify(data);
        if (!stringified) return;
        sessionStorage.setItem('idyle-data', stringified);
    };

    const [data, setData] = useState(getDataFromSession);
    const { getToken } = useAuth();
    const { load } = useUtil();

    const onLoad = async () => {
        const cachedData = getDataFromSession();
        const token = await getToken();
        if (!token) return setData({ ...data, ...cachedData });
        // attempt to retrieve from cache
        // get cache when applicable
        let missing = [];
        const keys = [ 
            'pages', 'deploys', 'docs', 
            'objects', 'metrics', 'websites' 
        ];
        for (const key of keys) if (!data?.[key]) missing.push(key);

        if (!missing.length) {
            load(false);
            return setData({ ...data, ...cachedData });
        };
        // if no missing data

        let requests = [ 
            listPages(token), listDeploys(token), 
            listDocs(token), listFiles(token), getMetrics(token), getWebsites(token)
        ], requestedData = {}, secondary = [];


        const results = await Promise.all(requests);
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const key = keys[i];
            if (!result) secondary.push(i);
            requestedData[key] = result;
        };


        // if our req was complete
        if (!secondary?.length) {
            load(false);
            return setData({ ...data, ...cachedData, ...requestedData });
        };

        const secondaryResults = await Promise.all(secondary?.map(i => requests[i]));
        for (let i = 0; i < secondaryResults?.length; i++) {
            const result = secondaryResults[i];
            const key = keys[secondary[i]];
            if (result) requestedData[key] = result;
        };

        setData({ ...data, ...cachedData, ...requestedData });
        load(false);
    };

    useEffect(() => {
        load(true);
        onLoad();
    }, [getAuth().currentUser]);

    useEffect(() => saveToSession(data), [data]);

    const resetWebsitesAndDeploys = async () => {
        const deploys = await listDeploys((await getToken()));
        const websites = await getWebsites((await getToken()));
        setData({ ...data, deploys, websites });
    };
    const resetObjects = async () => setObjects((await listFiles((await getToken()))));
    const resetDeploys = async () => setDeploys((await listDeploys((await getToken()))));
    const resetWebsites = async () => setWebsites((await getWebsites((await getToken()))));

    const setPages = (array) => setData({ ...data, pages: array }); 
    const setDeploys = (array) => setData({ ...data, deploys: array });
    const setObjects = (array) => setData({ ...data, objects: array }); 
    const setDocs = (array) => setData({ ...data, docs: array });
    const setWebsites = (array) => setData({ ...data, websites: array });
    const setMetrics = (obj) => setData({ ...data, metrics: obj });
    const setPageId = (str) => setData({ ...data, pageId: str });
    const setWebsiteName = (str) => setData({ ...data, websiteName: str });
    
    const resetData = () => {
        setData();
        sessionStorage.setItem('idyle-data', '');
    };

    const renewData = async () => {
        resetData();
        load(true);
        await onLoad();
    };

    const values = {
        pages: data?.pages || [], setPages,
        deploys: data?.deploys || [], setDeploys, resetDeploys,
        objects: data?.objects || [], setObjects, resetObjects,
        docs: data?.docs || [], setDocs,
        websites: data?.websites || [], setWebsites, resetWebsites,
        metrics: data?.metrics || null, setMetrics,
        pageId: data?.pageId || '', setPageId,
        websiteName: data?.websiteName || '', setWebsiteName,
        resetData, renewData, resetWebsitesAndDeploys
    };

    return (
        <DataValues.Provider value={values} >{children}</DataValues.Provider>
    )
};

export default DataContext;