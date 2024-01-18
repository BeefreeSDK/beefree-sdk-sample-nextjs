import FullLayout from '../../src/layouts/full/FullLayout';
import BEEFREEContainer from '../../src/components/container/BEEFREEContainer';

export default function PageBuilder() {
    return (
        <BEEFREEContainer type="page" heading="Use our Page Builder to create stunning landing pages!"/>
    )
}

PageBuilder.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
  };