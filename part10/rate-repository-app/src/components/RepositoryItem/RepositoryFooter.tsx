import { View, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  repoFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  repoFooterField: {
    display: 'flex',
    alignItems: 'center',
  },
});
const RepoFooterField = ({
  field,
  fieldName,
}: {
  field: number;
  fieldName: string;
}) => {
  return (
    <View style={styles.repoFooterField}>
      <Text fontWeight='bold'>
        {field > 1000 ? `${(field / 1000).toFixed(1)} k` : field}
      </Text>
      <Text fontSize='subheading'>{fieldName}</Text>
    </View>
  );
};
interface RepositoryFooterProps {
  stars: number;
  forks: number;
  reviews: number;
  ratings: number;
}
const RepositoryFooter = ({
  stars,
  forks,
  reviews,
  ratings,
}: RepositoryFooterProps) => {
  return (
    <View style={styles.repoFooter}>
      <RepoFooterField field={stars} fieldName='Stars' />
      <RepoFooterField field={forks} fieldName='Forks' />
      <RepoFooterField field={reviews} fieldName='Reviews' />
      <RepoFooterField field={ratings} fieldName='Ratings' />
    </View>
  );
};
export default RepositoryFooter;
