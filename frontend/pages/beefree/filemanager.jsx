import FullLayout from '../../src/layouts/full/FullLayout';
import BEEFREEContainer from '../../src/components/container/BEEFREEContainer';

export default function FileManager() {
    return (
        <BEEFREEContainer type="filemanager" heading="Store all your files from one place with our File Manager App!"/>
    )
}

FileManager.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
  };