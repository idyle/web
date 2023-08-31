import { useNavigate } from "react-router-dom";

const Route = ({ title, to }) => {

    const navigate = useNavigate();
    const goTo = () => navigate(to);

    return (
        <div className="flex select-none relative" onClick={goTo}>
            <h1 className="text-4xl md:text-2xl">{title}</h1>
        </div>
    )
};

export default Route;