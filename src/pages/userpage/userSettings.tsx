import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import * as authcomponents from '../../components/index';
import { useNavigate } from 'react-router-dom';

export const UserSettings: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      if (!isAuthenticated) {
        navigate('/auth/login');
      }
    };
    redirect();
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-3/5 bg-zinc-50 border-r border-gray-300">
        <div className="p-4">
          <authcomponents.EditProfile />
        </div>
      </div>
      <div className="w-full md:w-2/5 bg-zinc-50">
        <div className="p-4">
          <authcomponents.UpdatePassword />
        </div>
      </div>
    </div>
  );
};
