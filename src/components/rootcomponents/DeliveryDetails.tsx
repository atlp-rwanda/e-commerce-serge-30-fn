import { GrDeliver } from 'react-icons/gr';
import { RiRefreshLine } from 'react-icons/ri';
import DeliveryDetailItem from './DeliveryDetailItem'; // Adjust the path if necessary

const Deliverydetails: React.FC = () => {
  return (
    <div className="w-fit">
      <DeliveryDetailItem
        icon={<GrDeliver />}
        title="Free Delivery"
        description="Enter your postal code for Delivery Availability"
      />
      <DeliveryDetailItem
        icon={<RiRefreshLine />}
        title="Return Delivery"
        description="Free 30 Days Delivery Returns."
        linkText="Details"
      />
    </div>
  );
};
export default Deliverydetails;
