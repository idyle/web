const Infoline = ({ title, text }) => {
    return (
        <div className="flex items-center gap-[20px] border border-black rounded-lg p-2">
            <h1 className="text-2xl font-black select-none">{title}</h1>
            <div className="flex items-center gap-[10px]">
                <h1 className="text-2xl font-thin">{text}</h1>
            </div>
        </div>
    )

};

export default Infoline;