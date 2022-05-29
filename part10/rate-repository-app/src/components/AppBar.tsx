import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    backgroundColor: theme.colors.background,
  },
  tabs: {
    color: 'white',
    margin: 10,
    fontSize: 20,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppBar = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={{ display: 'flex', flexDirection: 'row' }}>
        <Pressable onPress={() => navigation.navigate('RepositoryList')}>
          <Text style={styles.tabs}>Repositories</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.tabs}>Sign In</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
export default AppBar;
