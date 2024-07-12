import { GrDeliver } from 'react-icons/gr';
import { RiRefreshLine } from 'react-icons/ri';

export const Deliverydetails: React.FC = () => {
    return (
        <div className="w-fit">
            <div className="flex border flex-col mt-4">
                <div className="flex flex-row items-center px-6 py-4 gap-x-6">
                <p className="text-3xl">
                    <GrDeliver />
                </p>
                <div>
                    <p>Free Delivery</p>
                    <p className="underline">
                    Enter your postal code for Delivery Availability
                    </p>
                </div>
                </div>
            </div>
            <div className="flex border flex-col">
                <div className="flex flex-row items-center px-6 py-4 gap-x-6">
                <p className="text-3xl">
                    <RiRefreshLine />
                </p>
                <div>
                    <p>Return Delivery</p>
                    <p>
                    Free 30 Days Delivery Returns.{' '}
                    <span className="underline">Details</span>
                    </p>
                </div>
                </div>
            </div>
            </div>
    )
}