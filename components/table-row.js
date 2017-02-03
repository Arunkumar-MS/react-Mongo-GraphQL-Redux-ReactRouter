import React, {PropTypes} from 'react';
import ButtonActions from './buttonGroup';
const TableRow = ({row}) => {

  return (
          <tr>
            <td className="title">{row.title}</td>
            <td>{row.price}</td>
            <td>{row.quantity}</td>
            <td><ButtonActions row={row}/></td>
          </tr>

    );
}
TableRow.propTypes = {
  row: PropTypes.object.isRequired,
};
export default TableRow;
