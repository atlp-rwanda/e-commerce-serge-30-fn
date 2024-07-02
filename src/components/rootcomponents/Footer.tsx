import logoImage from '../../assets/Group 1000006017.png';
import { supportLinks, accountLinks, quickLinks } from '../../data/index';
import FooterLinks from './FooterLinks';
import AppStore from '../../assets/AppStore.png';
import GooglePlay from '../../assets/GooglePlay.png';
const Footer = () => {
  return (
    <div className="bg-black py-4 font-outfit text-white">
      <div className="flex justify-between max-tablet:flex-wrap max-tablet:gap-12 px-12">
        <div>
          <img src={logoImage} alt="Logo" className="w-24" />
        </div>
        <div className="flex gap-20 items-baseline max-tablet:flex-wrap">
          <FooterLinks title="Support" links={supportLinks} />
          <FooterLinks title="Account" links={accountLinks} />
          <FooterLinks title="Quick Link" links={quickLinks} />
          <div className="pt-4">
            <h1>Download App</h1>
            <div className="pt-4">
              <a href="https://www.apple.com/app-store/">
                <img src={AppStore} alt="App Store" className="w-24" />
              </a>
              <a href="https://play.google.com/store">
                <img src={GooglePlay} alt="Google Play" className="w-24" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-500 p-0 mt-4">
        <p className="text-xs text-slate-200 text-center py-6">
          Copyright Exclusive 2024. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
