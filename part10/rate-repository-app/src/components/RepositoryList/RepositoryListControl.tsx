import { useState } from 'react';
import { Menu, Searchbar, Button } from 'react-native-paper';

const RepositoryListControl = ({
  setSelectedPrinciple,
  setSearchKeyword,
  searchKeyword,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

  return (
    <>
      <Searchbar
        placeholder='Search'
        onChangeText={(query) => setSearchKeyword(query)}
        value={searchKeyword}
        style={{ margin: 10 }}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button style={{ margin: 10 }} onPress={openMenu}>
            Show Menu
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setSelectedPrinciple('latest');
            closeMenu();
          }}
          title='Latest repositories'
        />

        <Menu.Item
          onPress={() => {
            setSelectedPrinciple('highestRating');
            closeMenu();
          }}
          title='Highest rated repositories'
        />
        <Menu.Item
          onPress={() => {
            setSelectedPrinciple('lowestRating');
            closeMenu();
          }}
          title='Lowest rated repositories'
        />
      </Menu>
    </>
  );
};
export default RepositoryListControl;
