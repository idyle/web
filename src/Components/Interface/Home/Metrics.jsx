import { MdOutlineDataUsage } from "react-icons/md";
import { useData } from "../../../Contexts/Data";

const Metrics = () => {

    const { metrics } = useData();

    const percentage = metrics?.used / metrics?.limit;

    const view = (
        (percentage < 0.10) ? 'w-0' : (
            (percentage >= 0.10 && percentage < 0.25) ? 'w-1/4' : (
                (percentage >= 0.25 && percentage < 0.50) ? 'w-1/2' : (
                    (percentage >= 0.50 && percentage < 0.75) ? 'w-3/4' : (
                        (percentage > 0.75) && 'w-full'
                    )
                )

            )
        )
    );

    return (
        <div className="grid items-center justify-items-center p-2 gap-2">
        <div className="h-3 w-full bg-gray-700 rounded-lg"><div className={`h-3 bg-white ${view} rounded-lg`}></div></div>
        <div className="flex items-center gap-1">
            <MdOutlineDataUsage size="50px" />
            <h1 className="text-6xl text-center">{metrics?.used} of {metrics?.limit} GB</h1>
        </div>
        <h1 className="text-3xl italic">{metrics?.free} GB Remaining</h1>
    </div>
    )
};

export default Metrics;