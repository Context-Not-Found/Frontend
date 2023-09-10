import { Card, Divider, Text, useTheme } from 'react-native-paper';

const DetailsBox = ({ details }) => {
  const { colors } = useTheme();
  return (
    <Card
      style={{
        marginHorizontal: 15,
        marginBottom: 50,
        backgroundColor: colors.secondaryContainer
      }}
    >
      <Card.Content>
        <Text variant="titleLarge">Name: {details.name}</Text>
        <Divider
          style={{ marginTop: 5, marginBottom: 10, height: 2, backgroundColor: colors.secondary }}
        />
        <Text variant="bodyLarge">Email: {details.email}</Text>

        <Divider style={{ height: 0, margin: 2 }} />

        <Text variant="bodyLarge">Phone Number: {details.number}</Text>
      </Card.Content>
    </Card>
  );
};

export default DetailsBox;
