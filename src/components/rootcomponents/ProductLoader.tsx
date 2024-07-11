import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ICount {
  count: number;
}
const ProductLoader = ({ count }: ICount) => {
  return (
    <div className="flex justify-between flex-wrap">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex items-center flex-col w-72">
          <div className="group bg-white drop-shadow-sm w-72 rounded-md transition-all ease-in-out overflow-hidden  ">
            <Skeleton height={150} width={288} />
          </div>
          <div className="py-2 w-full">
            <h2 className="font-bold">
              {' '}
              <Skeleton width={288} />
            </h2>
            <h4 className="text-blue-900 font-medium   transition-all ease-in-out group-hover:py-2">
              <Skeleton width={288} />
            </h4>
            <div className="flex gap-2 items-center my-2 group-hover:hidden transition-all ease-in-out">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                  <Skeleton width={16} height={16} />
                </span>
              ))}
              <span className="text-xs">
                {' '}
                <Skeleton width={20} />
              </span>
            </div>
            <h2 className="font-bold py-2 group-hover:py-0">
              {' '}
              <Skeleton width={100} />
            </h2>
            <Skeleton width={120} height={30} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductLoader;
