import { Fragment } from 'react';
import Alert from 'components/utils/alert';
import Confirm from 'components/utils/confirm';
import Load from 'components/utils/load';
import Notify from 'components/utils/notify';
import Prompt from 'components/utils/prompt';
import Spin from 'components/utils/spin';

const Utils = () => {
    return (
        <Fragment>
            <Alert />
            <Confirm />
            <Load />
            <Notify />
            <Prompt />
            <Spin />
        </Fragment>
    )
};

export default Utils;