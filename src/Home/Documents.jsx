import { useData } from "../Contexts/Data";
import { MdDataObject } from 'react-icons/md';

const Documents = () => {

    const { docs } = useData();
    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] h-full items-center justify-items-center overflow-auto p-2">
            <h1 className="text-3xl font-bold">Documents</h1>
            <div className="grid w-full h-full overflow-auto auto-rows-min">
                {
                    docs.map((doc, i) => {
                        return (
                            <div key={`h-d-${i}`} className="flex items-center border-b-2 border-white gap-1 select-none hover:bg-gray-800">
                                <MdDataObject size="30px" />
                                <h1 className="text-3xl">{doc?.id}</h1>
                            </div>
                        )
                    })
                }

                    {/* <div className="flex items-center border-b-2 border-white gap-1 select-none hover:bg-gray-800">
                        <MdDataObject size="30px" />
                        <h1 className="text-3xl">tezt</h1>
                    </div>
                    <div className="flex items-center border-b-2 border-white gap-1 select-none hover:bg-gray-800">
                        <MdDataObject size="30px" />
                        <h1 className="text-3xl">tezt</h1>
                    </div>
                    <div className="flex items-center border-b-2 border-white gap-1 select-none hover:bg-gray-800">
                        <MdDataObject size="30px" />
                        <h1 className="text-3xl">tezt</h1>
                    </div>
                    <div className="flex items-center border-b-2 border-white gap-1 select-none hover:bg-gray-800">
                        <MdDataObject size="30px" />
                        <h1 className="text-3xl">tezt</h1>
                    </div>
                    <div className="flex items-center border-b-2 border-white gap-1 select-none hover:bg-gray-800">
                        <MdDataObject size="30px" />
                        <h1 className="text-3xl">tezt</h1>
                    </div>
                    <div className="flex items-center border-b-2 border-white gap-1 select-none hover:bg-gray-800">
                        <MdDataObject size="30px" />
                        <h1 className="text-3xl">tezt</h1>
                    </div>
                    <div className="flex items-center border-b-2 border-white gap-1 select-none hover:bg-gray-800">
                        <MdDataObject size="30px" />
                        <h1 className="text-3xl">tezt</h1>
                    </div> */}
                    


            </div>
        </div>
    )
};

export default Documents;