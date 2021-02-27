import React from 'react';
import { TShape } from '../../components/Tetriminoes';


const PageSpinner: React.FC = () => (
    <div className="relative flex justify-center items-center">
       <div className="mt-1 w-20 animate-spin">
            <TShape />
        </div>
    </div>
);

export default PageSpinner;