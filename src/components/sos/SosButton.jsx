import { View } from 'react-native';
import { FAB, HelperText, useTheme } from 'react-native-paper';

const SosButton = ({ isSosOn, onPress }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FAB
        icon={isSosOn ? 'alert-remove' : 'alert'}
        customSize={240}
        color={colors.error}
        variant="tertiary"
        style={{
          borderRadius: 200
        }}
        onLongPress={onPress}
      />
      <HelperText
        variant="titleLarge"
        style={{ fontSize: 20, fontStyle: 'italic', paddingTop: 20 }}
        visible
      >
        Hold for enabling SOS
      </HelperText>
    </View>
  );
};

export default SosButton;
