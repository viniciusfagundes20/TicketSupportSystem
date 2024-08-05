import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import useTickets from "@/Hooks/useTickets";

const TicketList: React.FC = ({ navigation }: any) => {
  const { tickets } = useTickets();
  const [selectedStatus, setSelectedStatus] = useState("");

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("TicketsDetais", { ticket: item })}
    >
      <View style={styles.ticket}>
        <Text>{item.title}</Text>
        <Text>{new Date(item.dateOpened).toLocaleDateString("pt-br", {})}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredTickets = selectedStatus && selectedStatus != "all"
    ? tickets.filter((ticket) => ticket.status === selectedStatus)
    : tickets;

  return (
    <View>
      <Text>Tickets</Text>
      <Picker
        selectedValue={selectedStatus}
        onValueChange={(itemValue: string) => setSelectedStatus(itemValue)}
      >
        <Picker.Item label="Todos" value="all" />
        <Picker.Item label="Abertos" value="open" />
        <Picker.Item label="Encerrados" value="closed" />
        <Picker.Item label="Improcedentes" value="improcedente" />
        <Picker.Item label="Cancelados" value="cancelado" />
      </Picker> 
      <FlatList
        data={filteredTickets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ticket: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default TicketList;