import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useTickets from "@/Hooks/useTickets";

const TicketDetail: React.FC = ({ route, navigation }: any) => {
  const { ticket } = route.params;

  const { updateExistingTicket } = useTickets();
  const [description, setDescription] = useState(ticket.description || "");
  const [status, setStatus] = useState(ticket.status);

  const handleSubmit = () => {
    updateExistingTicket(ticket.id, {
      title: ticket.title,
      description,
      status ,
      dateOpened: ticket.dateOpened,
      dueDate: ticket.dueDate,
      details: ticket.details,
      dateClosed: new Date().toISOString(),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>{ticket.title}</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição"
      />
      <Text>Novo Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue: any) => setStatus(itemValue)}
      >
        <Picker.Item label="Encerrado" value="closed" />
        <Picker.Item label="Improcedente" value="improcedente" />
        <Picker.Item label="Cancelado" value="cancelado" />
      </Picker>
      <Button title="Encerrar Ticket" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default TicketDetail;
