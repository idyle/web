import { HiCreditCard, HiOutlineCreditCard, HiDatabase, HiOutlineDatabase } from 'react-icons/hi';

const Icon = () => {
    const style = {
        fontFamily: 'Arial, sans-serif'
    }
    return (
        <div style={style}className="grid items-center border p-2 border-black rounded-full">
            < HiCreditCard color="black" size='50px' />
        </div>
    )
};

export default Icon;