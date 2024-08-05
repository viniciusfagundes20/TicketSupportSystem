import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import useTickets from "@/Hooks/useTickets";

const TicketStatistics: React.FC = () => {
  const { tickets } = useTickets();
  const [stats, setStats] = useState({
    open: 0,
    closed: 0,
    improcedente: 0,
    cancelado: 0,
    averageClosureTime: 0,
  });

  useEffect(() => {
    const open = tickets.filter((ticket) => ticket.status === "open").length;
    const closed = tickets.filter((ticket) => ticket.status === "closed")
      .length;
    const improcedente = tickets.filter(
      (ticket) => ticket.status === "improcedente"
    ).length;
    const cancelado = tickets.filter((ticket) => ticket.status === "cancelado")
      .length;
    const closureTimes = tickets
      .filter((ticket) => ticket.dateClosed)
      .map(
        (ticket) =>
          new Date(ticket.dateClosed).getTime() -
          new Date(ticket.dateOpened).getTime()
      );
    const averageClosureTime = closureTimes.length
      ? closureTimes.reduce((a, b) => a + b) / closureTimes.length / 60000
      : 0;

    setStats({
      open,
      closed,
      improcedente,
      cancelado,
      averageClosureTime,
    });
  }, [tickets]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estatísticas de Tickets</Text>
      <PieChart
        data={[
          {
            name: "Abertos",
            population: stats.open,
            color: "blue",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Encerrados",
            population: stats.closed,
            color: "green",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Improcedentes",
            population: stats.improcedente,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Cancelados",
            population: stats.cancelado,
            color: "orange",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
        ]}
        width={400}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <Text>Total Geral: {tickets.length}</Text>
      <Text>
        Média de Tempo para Encerramento: {stats.averageClosureTime.toFixed(2)}{" "}
        minutos
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
});

export default TicketStatistics;
