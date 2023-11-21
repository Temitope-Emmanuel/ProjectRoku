import { Boundary } from '#/ui/boundary';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Template({ children }: { children: React.ReactNode }) {
    return <>
        <ToastContainer />
        <Boundary labels={['Messages']}>{children}</Boundary>
    </>
}
