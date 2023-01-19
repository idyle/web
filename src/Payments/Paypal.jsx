// App.js
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const Paypal = () => {
    const clientId = 'Acd3FTbNcXisEOQSvr8cs-yYOeYXgax3cvzbLw0UGka-X0sI5gmGrXBqU2tBHEkff17rOdGstuGfOSdS';
    return (
        <PayPalScriptProvider options={{ "client-id": clientId }}/>
    );
};

export default Paypal;