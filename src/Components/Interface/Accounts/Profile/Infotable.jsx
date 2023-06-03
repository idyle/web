import Infoline from './Infoline';

const Infotable = ({ info }) => {
    const table = info.map(({ title, text}, i) => (<Infoline key={`i${i}`} title={title} text={text} />));
    return (<div className="grid p-3 gap-5">{table}</div>);
};

export default Infotable;