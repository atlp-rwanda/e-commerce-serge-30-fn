import Skeleton from 'react-loading-skeleton';
export default function UserTableSkeleton() {
  return (
    <div>
      <table className="w-full table-auto">
        <tbody>
          {Array.from({ length: 12 }, (_, i) => (
            <tr key={i}>
              <td className="px-4 py-2 text-sm text-gray-700 max-sm:hidden">
                <Skeleton width={300} height={16} />
              </td>
              <td>
                <Skeleton width={200} height={16} />
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <Skeleton width={96} height={16} />
              </td>
              <td className="py-2 text-sm text-gray-700">
                <Skeleton width={100} height={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
