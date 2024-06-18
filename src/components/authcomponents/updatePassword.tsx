import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import * as authSlices from '../../slices/index';
import * as userComponents from '../../components/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdatePasswordMutation } from '../../service/authApi';
import { newPasswordSchema, matchPasswordschema } from '../../utils/schema';
import { z } from 'zod';

interface ErrorResponse {
  data?: {
    message?: string;
  };
}

export const UpdatePassword: React.FC = () => {
  const [updatePassword] = useUpdatePasswordMutation();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.user.user?.user_id);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Validate passwords using Zod schemas
      matchPasswordschema.parse({ newPassword, confirmNewPassword });
      newPasswordSchema.parse(newPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const firstError = error.errors[0];
        const errorMessage = firstError.message;

        if (firstError.path[0] === 'confirmNewPassword') {
          dispatch(authSlices.passwordMismatch());
        } else if (firstError.path[0] === 'newPassword') {
          dispatch(authSlices.passwordTooShort());
        }

        toast.error(errorMessage);
        return;
      }

      // Handle other validation errors
      toast.error(
        'An error occurred during validation. Please check your input.',
      );
      return;
    }

    dispatch(authSlices.setLoading());

    try {
      if (userId) {
        await updatePassword({
          userId,
          userCredentials: { oldPassword, newPassword, confirmNewPassword },
        }).unwrap();
        dispatch(authSlices.setSuccess('Password updated successfully!'));
        toast.success('Password updated successfully!');
      } else {
        dispatch(authSlices.setErrorrMsg('User ID not found.'));
        toast.error('User ID not found.');
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error && typeof error === 'object' && 'data' in error) {
        const err = error as ErrorResponse;
        if (err.data?.message) {
          errorMessage = err.data.message;
        }
      }
      dispatch(authSlices.setErrorrMsg(errorMessage));
      toast.error(errorMessage);
    }

    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="w-full h-full mt-2 p-6 pb-20 md:p-6 md:pl-10 md:ml-2">
      <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <userComponents.Label
            htmlFor="oldpassword"
            className="font-normal text-base"
          >
            Old Password:
          </userComponents.Label>
          <userComponents.Input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
            className1="w-full mt-1 mb-0"
          />
        </div>
        <div className="mb-4">
          <userComponents.Label
            htmlFor="newPassword"
            className="font-normal text-base"
          >
            New Password:
          </userComponents.Label>
          <userComponents.Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
            className1="w-full mt-1 mb-0"
          />
        </div>
        <div className="mb-4">
          <userComponents.Label
            htmlFor="confirmNewPassword"
            className="font-normal text-base"
          >
            Confirm New Password:
          </userComponents.Label>
          <userComponents.Input
            type="password"
            placeholder="Confirm Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
            className1="w-full mt-1 mb-0"
          />
        </div>
        <userComponents.Button
          type="submit"
          disabled={useSelector((state: RootState) => state.password.loading)}
          className="text-white py-2 px-4 rounded-md"
        >
          {useSelector((state: RootState) => state.password.loading)
            ? 'Updating...'
            : 'Update Password'}
        </userComponents.Button>
      </form>
      <ToastContainer />
    </div>
  );
};
