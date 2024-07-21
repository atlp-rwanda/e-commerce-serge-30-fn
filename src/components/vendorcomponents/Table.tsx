interface Column<T> {
    header: string;
    accessor: keyof T;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading: boolean;
}

export function Table<T>({ data, columns, loading }: TableProps<T>) {
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        {columns.map((column) => (
                            <th key={column.header} className="py-3 px-6 text-left">{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            {columns.map((column) => (
                                <td key={column.accessor as string} className="py-3 px-6 text-left whitespace-nowrap">
                                    {item[column.accessor] as unknown as React.ReactNode}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
