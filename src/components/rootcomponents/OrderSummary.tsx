interface IOrder {
  label: string;
  content: string;
}
const OrderSummary = ({ label, content }: IOrder) => {
  return (
    <div className="flex justify-between mt-4">
      <p>{label}</p>
      <p>${content}</p>
    </div>
  );
};

export default OrderSummary;
