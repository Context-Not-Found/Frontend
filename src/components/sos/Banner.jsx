import { Banner, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SosBanner = ({ visible, text, onPress }) => {
  const { colors } = useTheme();
  return (
    <Banner
      elevation={2}
      style={{ backgroundColor: colors.errorContainer }}
      visible={visible}
      actions={[
        {
          label: 'Dismis',
          onPress
        }
      ]}
      icon={({ size }) => <Icon name="alert" color={colors.error} size={size} />}
    >
      <Text variant="bodyLarge">{text}</Text>
    </Banner>
  );
};

export default SosBanner;
