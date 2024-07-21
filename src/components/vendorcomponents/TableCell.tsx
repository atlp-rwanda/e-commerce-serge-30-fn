interface TableCellProps {
    content: React.ReactNode;
}

export function TableCell({ content }: TableCellProps) {
    return <td className="py-2 px-4 border-b">{content}</td>;
}