import Elements from "./Elements.jsx";
import Options from "./Options";

const Toolbar = () => {
    return (
        <div className="grid md:grid-rows-[minmax(0,_1fr)_auto] gap-1 p-1">
            <Elements />
            <Options />
        </div>
    )
};

export default Toolbar;