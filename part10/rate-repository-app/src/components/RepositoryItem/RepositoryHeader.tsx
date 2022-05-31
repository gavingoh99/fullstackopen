import { Image, View, StyleSheet, Text as NativeText } from 'react-native';
import Text from '../Text';
import theme from '../../../theme';
const styles = StyleSheet.create({
  repoHeader: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
  },
  repoHeaderRight: {
    display: 'flex',
    marginLeft: 15,
    alignItems: 'baseline',
  },
});
interface RepositoryHeaderProps {
  avatarUrl: string;
  name: string;
  description: string;
  language: string;
}
const RepositoryHeader = ({
  avatarUrl,
  name,
  description,
  language,
}: RepositoryHeaderProps) => {
  return (
    <View style={styles.repoHeader}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 5 }}
        source={{ uri: avatarUrl }}
      />
      <View style={styles.repoHeaderRight}>
        <Text
          style={{ marginBottom: 7 }}
          fontSize='subheading'
          fontWeight='bold'
          testID='repositoryName'
        >
          {name}
        </Text>
        <Text style={{ marginBottom: 7 }} fontSize='subheading'>
          {description}
        </Text>
        <NativeText
          style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
            padding: 6,
            overflow: 'hidden',
            borderRadius: 5,
          }}
        >
          {language}
        </NativeText>
      </View>
    </View>
  );
};
export default RepositoryHeader;
