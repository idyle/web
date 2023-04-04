import { MdRadioButtonChecked, MdCheck, MdInfoOutline } from "react-icons/md";
import { GrPowerReset, GrDeploy } from 'react-icons/gr';

const Control = () => {
    return (
        <div className="grid grid-rows-[auto_minmax(0,_1fr)] gap-1 overflow-auto">
            <div className="grid auto-rows-min bg-black rounded-lg text-white p-3">

                <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex w-full items-center gap-2">
                        <h1 className="shrink-0 text-4xl font-bold">Website Name</h1>
                        <input className="text-white bg-black text-3xl w-full border-b-2" value="s"/>
                    </div>
                    <MdCheck size="30px" />
                </div>

                <div className="text-2xl italic">Website name unavailable. </div>

                <div className="flex items-center gap-1">
                    <MdInfoOutline size="20px" />
                    <div className="text-xl">This is a one-time only setup. Once saved, a website name cannot be changed.</div>
                </div>
               
            </div>
            <div className="grid border border-black rounded-lg p-3 overflow-auto">

                <div className="flex items-center gap-2 p-2">
                    <GrDeploy size="40px" />
                    <h1 className="text-6xl">Your Deploys</h1>
                </div>


                <div className="grid gap-2 auto-rows-min overflow-auto">

                <div className="flex items-center border border-black rounded-xl p-2 justify-between">
                    <div className="grid p-2">
                        <h1 className="text-4xl font-bold">Deploy #1</h1>
                        <h1 className="text-3xl">Deploy ID: ewoiq042194</h1>
                        <h1 className="text-3xl">Last updated at: 24 January 2022</h1>
                    </div>
                    <GrPowerReset size="40px" />
                </div>

                <div className="flex items-center bg-black text-white rounded-xl p-2 justify-between">
                    <div className="grid p-2">
                        <h1 className="text-4xl font-bold">Deploy #2</h1>
                        <h1 className="text-3xl">Deploy ID: ewoiq042194</h1>
                        <h1 className="text-3xl">Last updated at: 24 January 2022</h1>
                    </div>
                    <MdRadioButtonChecked size="40px" />
                </div>

                <div className="flex items-center border border-black rounded-xl p-2 justify-between">
                    <div className="grid p-2">
                        <h1 className="text-4xl font-bold">Deploy #1</h1>
                        <h1 className="text-3xl">Deploy ID: ewoiq042194</h1>
                        <h1 className="text-3xl">Last updated at: 24 January 2022</h1>
                    </div>
                    <GrPowerReset size="40px" />
                </div>

                <div className="flex items-center border border-black rounded-xl p-2 justify-between">
                    <div className="grid p-2">
                        <h1 className="text-4xl font-bold">Deploy #1</h1>
                        <h1 className="text-3xl">Deploy ID: ewoiq042194</h1>
                        <h1 className="text-3xl">Last updated at: 24 January 2022</h1>
                    </div>
                    <GrPowerReset size="40px" />
                </div>

                <div className="flex items-center border border-black rounded-xl p-2 justify-between">
                    <div className="grid p-2">
                        <h1 className="text-4xl font-bold">Deploy #1</h1>
                        <h1 className="text-3xl">Deploy ID: ewoiq042194</h1>
                        <h1 className="text-3xl">Last updated at: 24 January 2022</h1>
                    </div>
                    <GrPowerReset size="40px" />
                </div>

                </div>

            </div>
        </div>


    )
};

export default Control;