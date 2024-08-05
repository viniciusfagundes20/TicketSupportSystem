import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useState } from "react";
import { getTickets, addTicket, updateTicket } from "@/services/db";

type Ticket = {
  id: number;
  title: string;
  details: string;
  dateOpened: string;
  dueDate: string;
  status: string;
  dateClosed: string;
};

const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchTickets = async () => {
        const allTickets = await getTickets();
        setTickets(allTickets);
      };
      fetchTickets();
    }, [])
  );

  const addNewTicket = async (ticket: any) => {
    await addTicket(ticket);
    const allTickets = [...tickets, ticket];
    setTickets(allTickets);
  };

  const updateExistingTicket = async (id: number, updates: any) => {
    await updateTicket(id, updates);
    setTickets(
      tickets.map((ticket: any) =>
        ticket.id === id ? { ...ticket, ...updates } : ticket
      )
    );
  };

  return { tickets, addNewTicket, updateExistingTicket };
};

export default useTickets;
