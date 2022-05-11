export const Filter = ({ handleSearchFilter, filter }) => (
  <div>
    filter shown with: <input onChange={handleSearchFilter} value={filter} />
  </div>
);
