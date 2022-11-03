import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operation';

import { DivItemStyled } from 'components/styles';

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    return dispatch(deleteContact(contact.id));
  };

  return (
    <DivItemStyled>
      <p>
        {contact.name}: {contact.phone}
      </p>
      <button onClick={handleDelete}>Delete contact</button>
    </DivItemStyled>
  );
};
