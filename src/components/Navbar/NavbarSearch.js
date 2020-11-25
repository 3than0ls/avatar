import React from 'react';
import Icon from '~components/common/Icon';

const NavbarSearch = React.forwardRef(function Search(props, ref) {
  const { minimized, onSearch } = props;
  const [searchValue, setSearchValue] = React.useState('');
  const search = () => {
    onSearch(searchValue);
  };

  return (
    <label
      className={`${
        minimized ? 'py-1' : 'py-3'
      } px-3 w-1/2 flex flex-row items-center bg-gray-200 rounded-md transition-all`}
    >
      <Icon name="search" className="ml-2 mr-4" onClick={search} />
      <input
        className="w-full h-full bg-transparent select-none focus:outline-none text-lg"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.keyCode === 13 || e.which === 13) {
            search();
          }
        }}
        placeholder="Search for an image"
        ref={ref}
      />
    </label>
  );
});

export default NavbarSearch;
