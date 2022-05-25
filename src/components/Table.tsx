import React, {useMemo} from 'react';
import {Column, useTable} from "react-table";
import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';
import {IUser} from "./Types";

// Типы пропсов из api
type Props = {
    data: IUser[];
    columns: Array<Column>; // Не смог поправить ошибку с columns ! UPD - done)
}
// Для статичного апи
const columns:Array<Column> = [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Username',
        accessor: 'username'
    },
    {
        Header: 'Street',
        accessor: 'address.street'
    },
]

const Table = (props: Props) => {
    //Получение из api и стоп "рендер"
    const data = useMemo(() => props.data, [props.data])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable( {columns, data} )
    // Не понял, почему ошибка по columns
    // UPD Исправил с помощью  columns:Array<Column> ( :13 строка )
    // посмотрел типы: https://react-table.tanstack.com/docs/api/useTable + ошибки по теме на гите


    return (
        <BTable striped bordered hover {...getTableProps()}>
            <thead>
            {
                headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} scope='col'>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </BTable>
    );
};

export default Table;



