import React from 'react';

const TransferList = ({ transfers }) => (
    <table className="table">
        <tbody>
            { transfers.map( item => (
                <tr key={item.id}>
                    <td>{ item.description }</td>
                    <td className={item.amount > 0 ? 'text-success' : 'text-danger' }>{ item.amount }</td>
                </tr>
            ))}
        </tbody>
    </table>
)

export default TransferList;