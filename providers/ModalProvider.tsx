'use client'

import { FC, useState, useEffect } from 'react'

import Modal from '@/components/Modal';
import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';

interface ModalProviderProps {

}

const ModalProvider: FC<ModalProviderProps> = ({ }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null;
    }

    return <div>
        <AuthModal />
        <UploadModal />
    </div>
}

export default ModalProvider