import React from 'react';
import { toast } from 'react-toastify';
import Button from './Button'; //importing button component

type ToastProps = {
  message: string;
  onCancel?: () => void;
  onProceed?: () => void;
};

export const ToastMessage: React.FC<ToastProps> = ({
  message,
  onCancel,
  onProceed,
}) => {
  return (
    <div>
      <p>{message}</p>
      <div className="flex justify-center mt-2">
        <Button
          type="button"
          title="Cancel"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
          onClick={() => {
            toast.dismiss();
            if (onCancel) onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          title="Proceed to Stock"
          className="bg-black text-white p-2 rounded-md hover:bg-gray-800"
          onClick={() => {
            toast.dismiss();
            if (onProceed) onProceed();
          }}
        >
          Stock
        </Button>
      </div>
    </div>
  );
};

export default ToastMessage;
