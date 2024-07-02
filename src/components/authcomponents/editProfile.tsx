import profilePhoto from '../../assets/profilephoto.jpg';
import * as userComponents from '../../components/index';

export const EditProfile = () => {
  return (
    <div className="w-full h-full pl-6 pr-6 mt-2 md:pl-10 md:ml-2">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <div className="flex items-center mb-4">
        <img
          src={profilePhoto}
          alt="Profile Picture"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="text-lg font-2xl">John Doe</p>
        </div>
      </div>

      <form>
        <div className="mb-4">
          <userComponents.Label
            htmlFor="username"
            className="font-normal text-base"
          >
            Username:
          </userComponents.Label>
          <userComponents.Input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
            className1="w-full mt-1 mb-0"
          />
        </div>

        <div className="mb-4">
          <userComponents.Label
            htmlFor="profilePhoto"
            className="font-normal text-base"
          >
            Profile Photo URL:
          </userComponents.Label>
          <userComponents.Input
            type="text"
            id="profilePhoto"
            placeholder="Enter the URL of your profile photo"
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
            type="email"
            id="email"
            placeholder="Enter your email address"
            className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
            className1="w-full mt-1 mb-0"
          />
        </div>

        <div className="mb-4">
          <userComponents.Label
            htmlFor="urls"
            className="font-normal text-base"
          >
            URLs:
          </userComponents.Label>
          <userComponents.Input
            type="text"
            id="url1"
            placeholder="Enter your URLs"
            className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
            className1="w-full mt-1 mb-0"
          />
          <userComponents.Input
            type="text"
            id="url2"
            placeholder="Enter your URLs"
            className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
            className1="w-full mt-1 mb-0"
          />
          <userComponents.Input
            type="text"
            id="url3"
            placeholder="Enter your URLs"
            className="rounded-md w-full border border-slate-500 py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none text-[16px]"
            className1="w-full mt-1 mb-0"
          />
        </div>

        <div className="mb-4">
          <userComponents.Label htmlFor="bio" className="font-normal text-base">
            Bio:
          </userComponents.Label>
          <textarea
            id="bio"
            rows={3}
            className="mt-1 p-2 w-full border  border-slate-500 rounded-md"
            placeholder="Write something about yourself"
          />
        </div>

        <userComponents.Button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md"
        >
          Save Changes
        </userComponents.Button>
      </form>
    </div>
  );
};
