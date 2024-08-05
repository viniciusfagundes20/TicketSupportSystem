import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput as RTextInput } from "react-native";
import useTickets from "@/Hooks/useTickets";
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInput from "@/components/TextInput";
import { useForm, Controller } from "react-hook-form";

const TicketForm: React.FC = ({ navigation }: any) => {

   const { addNewTicket } = useTickets();
   const [title, setTitle] = useState("");
   const [details, setDetails] = useState("");
   const [dueDate, setDueDate] = useState(new Date());
   const [showPicker, setShowPicker] = useState(false);

   const { control, handleSubmit } = useForm({
      defaultValues: {
         title: "",
         details: "",
         dueDate: new Date(),
      },
   });

   const onChangeDueDate = (event: any, selectedDate?: Date) => {
      const currentDate = selectedDate || dueDate;
      setShowPicker(false);
      setDueDate(currentDate);
   };

   const onClickCreate = (data: any) => {
      
      setTitle(data.title);
      setDetails(data.details);
      
      const newTicket = {
         title,
         details,
         dateOpened: new Date().toISOString(),
         dueDate: dueDate.toISOString(),
         status: "open",
      };

      console.log("New Ticket:", newTicket);

      addNewTicket(newTicket);
      navigation.navigate("Tickets");
   };

   return (
      <View style={styles.container}>         
         <TextInput name="title" control={control} style={styles.input} placeholder="Título" />
         <TextInput name="detais" control={control} style={styles.input} placeholder="Detalhes" />
         <RTextInput
            style={styles.input}         
            placeholder="Prazo de Encerramento"
            value={dueDate.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' })}
            onFocus={() => setShowPicker(true)}
         />
         {showPicker && (
            <DateTimePicker value={dueDate} display="default" onChange={onChangeDueDate} />
         )}
         <Button title="Criar Ticket" onPress={handleSubmit(onClickCreate)} />
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

export default TicketForm;