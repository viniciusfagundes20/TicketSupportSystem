import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Icon from 'react-native-vector-icons/Ionicons';
import TicketList from "@/Tickets/TicketList";
import TicketForm from "@/Tickets/TicketForm";
import TicketDetail from "@/Tickets/TicketDetail";
import TicketStatistics from "@/Tickets/TicketStatistics";

const Tab = createBottomTabNavigator();

const AppTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tickets"
        component={TicketList}
        //  options={{
        //    tabBarIcon: ({ color, size }) => (
        //      <Icon name="list" color={color} size={size} />            
        //    ),
        //  }}
      />
      <Tab.Screen
        name="TicketsDetais"
        component={TicketDetail}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Criar Ticket"
        component={TicketForm}
        // options={{
        //   tabBarIcon: ({ color, size }) => (
        //     <Ionicons name="create" color={color} size={size} />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Estatísticas"
        component={TicketStatistics}
        // options={{
        //   tabBarIcon: ({ color, size }) => (
        //     <Ionicons name="stats-chart" color={color} size={size} />
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
