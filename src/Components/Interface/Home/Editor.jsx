import { useData } from "../../../Contexts/Data";

const Editor = () => {
    const { pages } = useData();

    return (
        <div className="grid grid-rows-[minmax(0,_1fr)_auto] h-full items-center justify-items-center p-2">
            
            <div className="grid w-full h-full overflow-auto auto-rows-min gap-2">
                {
                    pages.map((page, i) => {
                        return (
                            <div key={`h-p-${i}`} className="grid justify-items-center items-center gap-1 border border-white rounded-lg select-none">
                                <h1 className="text-3xl font-bold text-center break-all">{page?.name}</h1>
                                <h1 className="text-3xl text-center break-all">/{page?.route}</h1>
                            </div>
                        )
                    })
                }
            </div>
            { (pages?.length > 0) && <h1 className="text-4xl font-bold">Pages</h1> }
        </div>
    )
};

export default Editor;