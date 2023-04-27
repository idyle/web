import { useData } from "../Contexts/Data";

const Editor = () => {
    const { pages } = useData();
    console.log(pages, 'pages');

    return (
        <div className="grid grid-rows-[minmax(0,_1fr)_auto] h-full gap-2 items-center justify-items-center overflow-auto p-2">
            
            <div className="grid w-full h-full overflow-auto auto-rows-min gap-1">
                {
                    pages.map((page, i) => {
                        return (
                            <div key={`h-p-${i}`} className="grid justify-items-center items-center gap-1 border border-white rounded-lg select-none">
                                <h1 className="text-3xl font-bold">{page?.name}</h1>
                                <h1 className="text-3xl">/{page?.route}</h1>
                            </div>
                        )
                    })
                }
                <div className="grid justify-items-center items-center gap-1 border border-white rounded-lg select-none">
                    <h1 className="text-3xl font-bold">Page Name</h1>
                    <h1 className="text-3xl">/route</h1>
                </div>


            </div>
            <h1 className="text-4xl font-bold">Pages</h1>
        </div>
    )
};

export default Editor;