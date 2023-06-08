"use client";
import { useState } from 'react';
import { Price, ProductsWithPrices } from '@/types';
import useUser from '@/hooks/userUser';
import Modal from './Modal';
import Buttom from './Button'



interface SubscribeModalProps {
    products: ProductsWithPrices[]
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0 )/100);
    return priceString;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
    products
}) => {
    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<String>();
    const handleCheckout = async (price: Price) => {

    }
    let content = (
        <div className="text-center">
            No products avilable
        </div>
    );
    if (products.length) {
        content = (
            <div>
                {
                    products.map((product) => {
                        if (!product.prices?.length) {
                            return (
                                <div key={product.id}>
                                    No prices available
                                </div>
                            )
                        }
                        return product.rpices.map((price) => (
                            <Button key={price.id} onClick={()=> handleCheckout(price)} disable={isLoading || price.id === priceIdLoading} className="mb-4">
                                {`Sbuscribe for ${formatPrice(price)} a ${price.interval}`}
                            </Button>   
                        ))
                    })
                }
            </div>
        )
    }

    return (
        <Modal title="Only for premium users" description="Listen to music with Spotify Premium" isOpen onChange={()=>{}}>
            { content }
        </Modal>
    )
}

export default SubscribeModal;b