import SQLite from "react-native-sqlite-storage";

//SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "TicketDatabase.db";
const database_version = "1.0";
const database_displayname = "Ticket Support Database";
const database_size = 200000;

function errorCB(ex: SQLite.SQLError) {
  console.log(("SQL Error: " + ex) as string);
}

function successCB() {
  console.log("SQL executed fine");
}

function openCB() {
  console.log("Database OPENED");
}

export const createTables = () => {
  SQLite.openDatabase(
    {
      name: database_name,
      location: "default",
    },
    async (db) => {

      await db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS tickets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          details TEXT,
          dateOpened TEXT,
          dueDate TEXT,
          status TEXT,
          dateClosed TEXT
        )`
        );

        /*tx.executeSql(
          "DELETE FROM tickets",
          [],
          () => {
            console.log("Table cleared");
          },
          (_, error) => {
            console.log("Error clearing table: ", error);
          }
        ); */
      });
    },
    errorCB
  );
};

export const getTickets = () => {
  type Ticket = {
    id: number;
    title: string;
    details: string;
    dateOpened: string;
    dueDate: string;
    status: string;
    dateClosed: string;
  };

  return new Promise<Ticket[]>((resolve, reject) => {
    SQLite.openDatabase(
      {
        name: database_name,
        location: "default",
      },
      (db) => {
        db.transaction(async (tx) => {
          const results = await tx.executeSql("SELECT * FROM tickets", []);

          if (!results) {
            reject(null);
          }

          const rows = results[1].rows.raw();
          return resolve(rows);
        });
      }
    );
  });
};

export const addTicket: any = async (ticket: any) => {
  return new Promise<any>((resolve, reject) => {
    SQLite.openDatabase(
      {
        name: database_name,
        location: "default",
      },
      async (db) => {
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO tickets (title, details, dateOpened, dueDate, status) VALUES (?, ?, ?, ?, ?)",
            [
              ticket.title,
              ticket.details,
              ticket.dateOpened,
              ticket.dueDate,
              ticket.status,
            ],
            (_, result) => resolve(result),
            (_, error) => reject(error)
          );
        });
      }
    );
  });
};

export const updateTicket: any = async (id: number, updates: any) => {
  return new Promise<any>((resolve, reject) => {
    SQLite.openDatabase(
      {
        name: database_name,
        location: "default",
      },
      async (db) => {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE tickets SET title = ?, details = ?, dateOpened = ?, dueDate = ?, status = ?, dateClosed = ? WHERE id = ?",
            [
              updates.title,
              updates.details,
              updates.dateOpened,
              updates.dueDate,
              updates.status,
              updates.dateClosed,
              id,
            ],
            (_, result) => resolve(result),
            (_, error) => reject(error)
          );
        });
      }
    );
  });
};
