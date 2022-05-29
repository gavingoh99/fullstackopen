import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  private namespace: string;
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }
  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:token`);
    return token ? (JSON.parse(token) as string) : null;
  }
  async setAccessToken(accessToken: string) {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken)
    );
  }
  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}
export default AuthStorage;
