import { useData } from "../../../Contexts/Data";

const Editor = () => {
    const { pages } = useData();

    return (
        <div className="grid grid-rows-[minmax(0,_1fr)_auto] h-full items-center justify-items-center p-2">
            <div className="grid w-full h-full overflow-auto auto-rows-min gap-2">
                {
                    pages.map((page, i) => {
                        return (
                            <div key={`h-p-${i}`} className="flex place-content-center items-center gap-1 p-1 bg-white text-gunmetal rounded-lg select-none">
                                <h1 className="text-4xl font-bold text-center break-all">{page?.name}</h1>
                                <h1 className="text-3xl text-center break-all">/{page?.route}</h1>
                            </div>
                        )
                    })
                }
            </div>
            <h1 className="text-4xl font-bold">Pages</h1>
            {
                !pages?.length && <h1 className="text-3xl text-center">No pages available.</h1>
            }
        </div>
    )
};

export default Editor;