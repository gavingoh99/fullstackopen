export const Filter = ({ handleSearchFilter, filter }) => (
  <div>
    find countries <input value={filter} onChange={handleSearchFilter} />{' '}
  </div>
);
