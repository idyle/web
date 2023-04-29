const Welcome = () => {
    return (
        <div className="grid items-center justify-items-center auto-rows-min gap-2">
            <div className="grid items-center justify-items-center border-b-2 border-black">
                <div className="flex items-center justify-center px-10">
                    <h1 className="text-8xl text-center font-bold">Welcome to idyle!</h1>
                </div>
            </div>
            <h1 className="text-center text-5xl">The first open-platform website builder.</h1>
            <div className="flex items-center gap-2">
            {/* <div className="flex items-center border border-black rounded-lg p-2 hover:bg-black hover:text-white select-none">
                <h1 className="text-3xl">Quickstart</h1>
            </div> */}
            </div>
        </div>

            // <div className="grid items-center justify-items-center auto-rows-min gap-2">
    // <div className="grid items-center justify-items-center border-b-2 border-black">
    //     <div className="flex items-center justify-center px-10">
    //         <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-black pr-5 text-8xl font-bold">Welcome to idyle</h1>
    //     </div>
    // </div>
    // <h1 className="animate-fadeinlong text-5xl">An open-platform website builder.</h1>
    // <div className="flex items-center border border-black rounded-lg p-2 hover:bg-black hover:text-white select-none">
    //     <h1 className="text-3xl">Let's Get Started</h1>
    // </div>
    // </div>
    )
};  

export default Welcome;