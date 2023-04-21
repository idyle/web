import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Contexts";
import { listPages } from "../Editor/requests";
import { listDeploys } from "../Deployer/requests";
import { listDocs } from "../Documents/requests";
import { listFiles } from "../Objects/requests";

const DataValues = createContext();
export const useData = () => useContext(DataValues);


export const DataContext = ({ children }) => {

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

    const saveToSession = () =>{
        if (!data) return;
        const stringified = JSON.stringify(data);
        if (!stringified) return;
        sessionStorage.setItem('idyle-data', stringified);
    };

    const [data, setData] = useState();
    const { user } = useAuth();

    const onLoad = async () => {
        const token = user?.accessToken;
        if (!token) return;
        // attempt to retrieve from cache
        const cachedData = getDataFromSession();
        // get cache when applicable

        let missing = [];
        const keys = [ 'pages', 'deploys', 'docs', 'objects' ];
        for (const key of keys) if (!data[key]) missing.push(key);

        if (!missing.length) return setData(cachedData);
        // if no missing data

        let requests = [ 
            listPages(token), listDeploys(token), 
            listDocs(token), listFiles(token)
        ], requestedData = {};

        const results = await Promise.all(requests);
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const key = keys[i];
            if (result) requestedData[key] = result;
        };

        setData({ ...cachedData, ...requestedData });
    };

    useEffect(() => onLoad(), [user?.accessToken]);
    useEffect(() => saveToSession(), [data]);

    const setPages = (array) => setData({ ...data, pages: array }); 
    const setDeploys = (array) => setData({ ...data, deploys: array }); 
    const setObjects = (array) => setData({ ...data, objects: array }); 
    const setDocs = (array) => setData({ ...data, docs: array }); 

    const values = {
        pages: data?.pages || [], setPages,
        deploys: data?.deploys || [], setDeploys,
        objects: data?.objects || [], setObjects,
        docs: data?.docs || [], setDocs
    };

    return (
        <DataValues.Provider value={values} >{children}</DataValues.Provider>
    )
};