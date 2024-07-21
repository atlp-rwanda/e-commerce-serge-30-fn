import React from 'react';
import { TableCell } from './TableCell';

interface TableColumn<T> {
    header: string;
    accessor: keyof T;
}

interface TableRowProps<T> {
    row: T;
    columns: TableColumn<T>[];
}

export function TableRow<T>({ row, columns }: TableRowProps<T>) {
    return (
        <tr>
            {columns.map((column) => {
                const value = row[column.accessor];

                const content: React.ReactNode = value !== undefined && value !== null
                    ? value.toString()
                    : '-';

                return (
                    <TableCell
                        key={String(column.accessor)}
                        content={content}
                    />
                );
            })}
        </tr>
    );
}