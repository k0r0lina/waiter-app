import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import SingleTableForm from '../../features/SingleTableForm/SingleTableForm';

const Table = () => {
  const { id } = useParams();
  const table = useSelector(state => getTableById(state, id));

  return (
    <div>
      <SingleTableForm table={table} />
    </div>
  );
};

export default Table;