import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Reset from "./Reset";
import Confirm from "./Confirm";
import { useNavigate } from "react-router-dom";

const Actions = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [mode, setMode] = useState("resetPassword");
    const [code, setCode] = useState();
  
    useEffect(() => {
      const code = searchParams?.get("oobCode");
      const mode = searchParams?.get("mode");
      if (mode) setMode(mode);
      if (code) setCode(code);
    }, [searchParams]);


  return (
    <div className="grid justify-items-center items-center h-full w-full bg-black text-white border-gunmetal">
        <div className="grid w-[400px] my-10 p-6 gap-4 auto-rows-min justify-items-center border-2 border-gunmetal rounded-xl overflow-auto">
            <div className="grid gap-7 items-center justify-items-center">
                <h1 className="text-6xl font-bold">idyle</h1>
            </div>
            {mode === "resetPassword" ? (<Reset code={code} />) : (<Confirm code={code} />)}
            <div className="relative flex items-center w-full">
                <div className="flex-grow border-t-2 border-white"></div>
                <span className="flex-shrink px-3 text-white text-xl">Other Options</span>
                <div className="flex-grow border-t-2 border-white"></div>
            </div>
            <div className="grid w-full gap-1">
                <div onClick={() => navigate("/")} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg border-2 border-gunmetal hover:scale-[.98]">
                    <h1 className="text-2xl text-white">Go to Home</h1>
                </div>
                <div onClick={() => navigate("/login/login")} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg border-2 border-gunmetal hover:scale-[.98]">
                    <h1 className="text-2xl text-white">Login to an Account</h1>
                </div>
                <div onClick={() => navigate("/login/register")} className="grid p-2 items-center justify-items-center cursor-pointer select-none border rounded-lg border-2 border-gunmetal hover:scale-[.98]">
                    <h1 className="text-2xl text-white">Register an Account</h1>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Actions;