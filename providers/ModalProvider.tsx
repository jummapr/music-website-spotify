'use client'

import { FC, useState, useEffect } from 'react'

import Modal from '@/components/Modal';
import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';
import SubscribeModal from '@/components/SubscribeModal';
import { ProductWithPrice } from '@/types';

interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider: FC<ModalProviderProps> = ({ products}) => {
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
        <SubscribeModal products={products}/>
    </div>
}

export default ModalProvider