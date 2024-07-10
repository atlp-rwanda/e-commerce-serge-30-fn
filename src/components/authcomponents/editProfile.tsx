import { useEffect, useState } from 'react';
import profilePhoto from '../../assets/profilephoto.jpg';
import * as userComponents from '../../components/index';
import {
  useUserProfileQuery,
  useUpdateProfileMutation,
} from '../../service/authApi';
import { toast } from 'react-toastify';
export const EditProfile = () => {
  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    gender: '',
    birthdate: '',
    preferred_language: '',
    preferred_currency: '',
    location: '',
  });
  useEffect(() => {
    if (userProfile?.profile) {
      setProfileData(userProfile.profile);
    }
  }, [userProfile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfile(profileData).unwrap();
      await refetch();
      setIsEditProfile(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile. Please try again.');
    }
  };
  const handleClick = () => {
    setIsEditProfile(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  const profile = userProfile?.profile;
  return (
    <>
      {isEditProfile && (
        <div className="w-full h-full pl-6 pr-6 mt-2 md:pl-10 md:ml-2">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

          <div className="flex items-center mb-4">
            <img
              src={profilePhoto}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-2xl">{profile?.username}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="gender"
                className="font-normal text-base"
              >
                Gender:
              </userComponents.Label>
              <select
                id="gender"
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="birthdate"
                className="font-normal text-base"
              >
                Birthdate:
              </userComponents.Label>
              <userComponents.Input
                type="date"
                id="birthdate"
                name="birthdate"
                placeholder="Enter your birthdate"
                value={profileData.birthdate}
                onChange={handleChange}
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
                className1="w-full mt-1 mb-0"
              />
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="language"
                className="font-normal text-base"
              >
                Preferred Language:
              </userComponents.Label>
              <select
                id="language"
                name="preferred_language"
                value={profileData.preferred_language}
                onChange={handleChange}
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
              >
                <option value="">Select your preferred language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="currency"
                className="font-normal text-base"
              >
                Preferred Currency:
              </userComponents.Label>
              <select
                id="currency"
                name="preferred_currency"
                value={profileData.preferred_currency}
                onChange={handleChange}
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
              >
                <option value="">Select your preferred currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="CNY">CNY</option>
              </select>
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="location"
                className="font-normal text-base"
              >
                Location:
              </userComponents.Label>
              <userComponents.Input
                type="text"
                id="location"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                placeholder="Your location"
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
                className1="w-full mt-1 mb-0"
              />
            </div>

            <userComponents.Button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md"
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </userComponents.Button>
          </form>
        </div>
      )}
      {!isEditProfile && (
        <div className="w-full h-full pl-6 pr-6 mt-2 md:pl-10 md:ml-2">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome {profile?.username}
          </h2>

          <div className="flex items-center mb-4">
            <img
              src={profilePhoto}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-2xl">{profile?.username}</p>
            </div>
          </div>

          <form>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="username"
                className="font-normal text-base"
              >
                User Name:
              </userComponents.Label>
              <userComponents.Input
                type="text"
                id="username"
                value={profile?.username}
                placeholder="username"
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
                className1="w-full mt-1 mb-0"
              />
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="email"
                className="font-normal text-base"
              >
                Email:
              </userComponents.Label>
              <userComponents.Input
                type="text"
                id="email"
                value={profile?.email}
                placeholder="example@gmail.com"
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
                className1="w-full mt-1 mb-0"
              />
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="gender"
                className="font-normal text-base"
              >
                Gender:
              </userComponents.Label>
              <userComponents.Input
                type="text"
                id="gender"
                value={profile?.gender}
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
                className1="w-full mt-1 mb-0"
              />
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="birthdate"
                className="font-normal text-base"
              >
                Birthdate:
              </userComponents.Label>
              <userComponents.Input
                type="text"
                id="birthdate"
                value={profile?.birthdate}
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
                className1="w-full mt-1 mb-0"
              />
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="language"
                className="font-normal text-base"
              >
                Preferred Language:
              </userComponents.Label>
              <userComponents.Input
                type="text"
                id="language"
                value={profile?.preferred_language}
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
                className1="w-full mt-1 mb-0"
              />
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="currency"
                className="font-normal text-base"
              >
                Preferred Currency:
              </userComponents.Label>
              <userComponents.Input
                type="text"
                id="currency"
                value={profile?.preferred_currency}
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
                className1="w-full mt-1 mb-0"
              />
            </div>
            <div className="mb-4">
              <userComponents.Label
                htmlFor="location"
                className="font-normal text-base"
              >
                Location:
              </userComponents.Label>
              <userComponents.Input
                type="text"
                id="location"
                value={profile?.location}
                placeholder="Your location"
                className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
                className1="w-full mt-1 mb-0"
              />
            </div>

            <userComponents.Button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md"
              onClick={handleClick}
            >
              Edit Profile
            </userComponents.Button>
          </form>
        </div>
      )}
    </>
  );
};
