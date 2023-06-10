import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { listPages } from "../Components/Interface/Editor/requests";
import { getWebsite, listDeploys } from "../Components/Interface/Deployer/requests";
import { listDocs } from '../Components/Interface/Documents/requests';
import { listFiles } from "../Components/Interface/Objects/requests";
import { getMetrics } from "../Components/Interface/Payments/requests";
import { useUtil } from "./Util";

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
    const { user, token } = useAuth();
    const { load } = useUtil();

    const onLoad = async () => {
        const cachedData = getDataFromSession();
        if (!token) return setData({ ...cachedData });
        // attempt to retrieve from cache
        // get cache when applicable
        let missing = [];
        const keys = [ 
            'pages', 'deploys', 'docs', 
            'objects', 'website', 'metrics' 
        ];
        for (const key of keys) if (!data?.[key]) missing.push(key);

        if (!missing.length) {
            load(false)
            return setData({ ...cachedData });
        };
        // if no missing data

        let requests = [ 
            listPages(token), listDeploys(token), 
            listDocs(token), listFiles(token), 
            getWebsite(token), getMetrics(token)
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
            return setData({ ...cachedData, ...requestedData });
        };

        const secondaryResults = await Promise.all(secondary?.map(i => requests[i]));
        for (let i = 0; i < secondaryResults?.length; i++) {
            const result = secondaryResults[i];
            const key = keys[secondary[i]];
            if (result) requestedData[key] = result;
        };

        setData({ ...cachedData, ...requestedData });
        load(false);
    };

    useEffect(() => {
        load(true);
        onLoad();
    }, [token]);

    useEffect(() => saveToSession(data), [data]);

    const resetObjects = async () => setObjects((await listFiles(user?.accessToken)));
    const resetDeploys = async () => setDeploys((await listDeploys(user?.accessToken)));
    const resetWebsite = async () => setWebsite((await getWebsite(user?.accessToken)));

    const setPages = (array) => setData({ ...data, pages: array }); 
    const setDeploys = (array) => setData({ ...data, deploys: array }); 
    const setObjects = (array) => setData({ ...data, objects: array }); 
    const setDocs = (array) => setData({ ...data, docs: array }); 
    const setWebsite = (obj) => setData({ ...data, website: obj });
    const setMetrics = (obj) => setData({ ...data, metrics: obj });
    const setPageId = (str) => setData({ ...data, pageId: str });
    
    const resetData = () => {
        setData();
        sessionStorage.setItem('idyle-data', '');
    };

    const values = {
        pages: data?.pages || [], setPages,
        deploys: data?.deploys || [], setDeploys, resetDeploys,
        objects: data?.objects || [], setObjects, resetObjects,
        docs: data?.docs || [], setDocs,
        website: data?.website || '', setWebsite, resetWebsite,
        metrics: data?.metrics || '', setMetrics,
        pageId: data?.pageId || '', setPageId,
        resetData
    };

    return (
        <DataValues.Provider value={values} >{children}</DataValues.Provider>
    )
};

export default DataContext;