import { useNav } from "./Context";

const Navbutton = ({ children, onClick, route }) => {

    const { path, setPath } = useNav();
    return (
        <div onClick={() => setPath(route)} className={`flex ${path === route && 'bg-black text-white'} select-none w-full border rounded-lg border-black place-content-center transform transition duration-100 hover:scale-[.98]`}>
            <div className="flex gap-1 h-[2rem] p-1 items-center">
                {children}
            </div>
        </div>
    )
};

export default Navbutton;