import FullLayout from '../../src/layouts/full/FullLayout';
import BEEFREEContainer from '../../src/components/container/BEEFREEContainer';

export default function PopupBuilder() {
    return (
        <BEEFREEContainer type="popup" heading="Create awesome pop-up designs with our PopUp Builder!"/>   
    )
}

PopupBuilder.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
  };