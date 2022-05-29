import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Group
          screenOptions={({
            navigation,
          }: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            navigation: NavigationProp<any, any>;
          }) => ({
            header: () => <AppBar navigation={navigation} />,
          })}
        >
          <Stack.Screen name='RepositoryList' component={RepositoryList} />
          <Stack.Screen name='Login' component={SignIn} />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};
export default Main;
