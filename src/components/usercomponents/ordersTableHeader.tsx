export default function OrdersTableHeader() {
  const headers = ['Items', 'Date', 'Status', 'Total'];

  return (
    <thead>
      <tr>
        {Array.from(headers, (header) => (
          <th
            key={header}
            className="px-4 py-2 text-xs font-medium text-left uppercase tracking-wider text-gray-700 bg-gray-200"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
