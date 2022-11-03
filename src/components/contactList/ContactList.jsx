import { Contact } from '../contact/Contact';
import { useContacts } from 'hooks/useContacts';
import { useFilter } from 'hooks/useFilter';
import { ItemStyled } from 'components/styles';

export const ContactList = () => {
  const contacts = useContacts();
  const filter = useFilter();

  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.status.toLowerCase());
  });

  return (
    <ul>
      {visibleContacts.map(contact => (
        <ItemStyled key={contact.id}>
          <Contact contact={contact} />
        </ItemStyled>
      ))}
      <h1
        style={{
          padding: '90px',
          paddingTop: '700px',
          fontSize: '100px',
        }}
      >
        cringe
      </h1>
    </ul>
  );
};
