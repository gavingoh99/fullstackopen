import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useApolloClient, useQuery } from '@apollo/client';

import theme from '../../theme';
import { GET_AUTHENTICATED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
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
  const results = useQuery(GET_AUTHENTICATED_USER);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const logout = () => {
    void authStorage.removeAccessToken();
    void apolloClient.resetStore();
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={{ display: 'flex', flexDirection: 'row' }}>
        <Pressable onPress={() => navigation.navigate('RepositoryList')}>
          <Text style={styles.tabs}>Repositories</Text>
        </Pressable>
        {!results.loading && results.data.me !== null ? (
          <Pressable onPress={() => logout()}>
            <Text style={styles.tabs}>Sign Out</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.tabs}>Sign In</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};
export default AppBar;
