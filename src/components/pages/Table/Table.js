import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import TableForm from '../../features/TableForm/TableForm';

const Table = () => {
  const { id } = useParams();
  const table = useSelector(state => getTableById(state, id));

  return (
    <div>
      <TableForm table={table} />
    </div>
  );
};

export default Table;