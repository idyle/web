import { useUtil } from "./Context";

const Home = () => {

    const { prompt, notify, setLoader } = useUtil();

    const testPrompt = async () => {
        // const a = await prompt("You're about to make a significant change. Do you want to proceed?",);
        // // result
        // console.log('result of test prompt', a);

        setLoader(true);
    };
    return (
        
        <div className="grid items-center justify-items-center auto-rows-min my-60">

            <div className="grid items-center justify-items-center border-b-2 border-black">
                <div class="flex items-center justify-center px-10">
                    <h1 class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-black pr-5 text-8xl font-bold">Welcome to idyle</h1>
                </div>
            </div>
            <h1 className="animate-fadeinlong text-5xl">An open-platform website builder.</h1>


        </div>

    )

};

export default Home;