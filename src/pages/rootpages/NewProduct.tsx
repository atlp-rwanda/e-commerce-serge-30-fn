import MACBOOKAIR from '../../assets/store-card-40-macbook-air-202402.jpeg';
import Footer from '../../components/rootcomponents/Footer';
const NewProduct = () => {
  return (
    <div className=" h-full   font-outfit">
      <div className="flex justify-between gap-6 p-12">
        <div>
          <h1 className="text-7xl font=bold">MACBOOK AIR</h1>
          <h4 className="text-3xl py-4">
            Subheading for description or instructions
          </h4>
          <p>
            Body text for your whole article or post. We’ll put in some lorem
            ipsum to show how a filled-out page might look: Excepteur efficient
            emerging, minim veniam anim aute carefully curated Ginza
            conversation exquisite perfect nostrud nisi intricate Content. Qui
            international first-class nulla ut. Punctual adipisicing, essential
            lovely queen tempor eiusmod irure. Exclusive izakaya charming
            Scandinavian impeccable aute quality of life soft power pariatur
            Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter
            destination Toto remarkable officia Helsinki excepteur Basset hound.
            Zürich sleepy perfect consectetur.
          </p>
        </div>
        <div>
          <img
            src={MACBOOKAIR}
            alt="macbookair"
            className="h-96 w-[150rem] object-cover"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewProduct;
