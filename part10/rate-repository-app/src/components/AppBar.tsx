import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useApolloClient, useQuery } from '@apollo/client';

import theme from '../../theme';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    backgroundColor: theme.colors.background,
  },
  tabs: {
    color: 'white',
    margin: 10,
    fontSize: 15,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppBar = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const results = useQuery(GET_CURRENT_USER);
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
          <>
            <Pressable onPress={() => navigation.navigate('CreateReview')}>
              <Text style={styles.tabs}>Create a review</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('UserReviews')}>
              <Text style={styles.tabs}>My reviews</Text>
            </Pressable>
            <Pressable onPress={() => logout()}>
              <Text style={styles.tabs}>Sign Out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.tabs}>Sign In</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.tabs}>Sign Up</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default AppBar;
