import FullLayout from '../../src/layouts/full/FullLayout';
import BEEFREEContainer from '../../src/components/container/BEEFREEContainer';

export default function EmailEditor() {
    return (
        <BEEFREEContainer type="email" heading="Welcome to the best in class Beefree SDK Email Editor!"/>
    )
}

EmailEditor.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
  };