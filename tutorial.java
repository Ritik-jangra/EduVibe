package Tutorial;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
//import package1.package2.Message;

public class Tutorial {

    public static Connection connectToDatabase(String url, String user, String password) {
        Connection connection = null;
        try {
            // Load the JDBC driver (optional for newer versions of Java)
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish the connection
            connection = DriverManager.getConnection(url, user, password);
            System.out.println("Database connected successfully!");
        } catch (ClassNotFoundException e) {
            System.out.println("JDBC Driver not found: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Failed to connect to the database: " + e.getMessage());
        }
        return connection;
    }

    public static void main(String[] args) {
        // Example usage
        String url = "jdbc:mysql://localhost(SQL Server):16.0.1000.6/registration";
        String user = "AbHiXJoD\\abhij";
        String password = "Atul@gulia_1";

        Connection connection = connectToDatabase(url, user, password);

        // Close the connection when done
        if (connection != null) {
            try {
                connection.close();
                System.out.println("Connection closed.");
            } catch (SQLException e) {
                System.out.println("Failed to close the connection: " + e.getMessage());
            }
        }
    }
}