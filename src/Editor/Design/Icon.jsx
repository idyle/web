import { HiCreditCard, HiOutlineCreditCard, HiDatabase, HiOutlineDatabase } from 'react-icons/hi';

const Icon = () => {
    const style = {
        fontFamily: 'Arial, sans-serif'
    }
    return (
        <div className="grid text-black shadow-xl rounded-lg items-center justify-items-center">
            < HiCreditCard color="inherit" size='60px' />
            <h1 className="text-xl text-inherit">Test</h1>
        </div>
    )
};

export default Icon;