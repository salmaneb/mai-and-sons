import React from 'react';
import './Table.scss';

const Table = ({ headers, rows, noDataMessage }) => {
  console.log(rows)
  return (
    <React.Fragment>
      <section className="table-container">
        <table>
          <thead>
            <tr>
              {
                headers.map((item, index) => (
                  <th width={item.minWidth} key={index}>{item.th}</th>
                ))
              }
            </tr>
          </thead>

          <tbody>
            {
              rows.map((item, index) => (
                <tr key={index}>
                  {
                    item.informationCells.map((cellItem, cellIndex) => (
                      <td key={cellIndex}>{cellItem.content}</td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>

      </section>
    </React.Fragment>
  )
}
export default Table;