import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/**
 * Main application window for the Personal Budget Tracker.
 * Extends JFrame to inherit window functionality.
 */
public class BudgetTrackerFrame extends JFrame {

    // UI Components
    private JTextField incomeField;
    private JTextField expensesField;
    private JTextField monthlySavingsField;
    private JTextField yearlySavingsField;
    private JButton calculateButton;
    private BudgetChartComponent chartComponent;

    public BudgetTrackerFrame() {
        // Set window title
        setTitle("Personal Budget Tracker");
        // Ensure application exits when window is closed
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Use GridBagLayout for flexible component positioning
        setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();

        // Add 10px padding around all components
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Row 0: Monthly Income
        gbc.gridx = 0; gbc.gridy = 0;
        add(new JLabel("Monthly Income:"), gbc);
        gbc.gridx = 1;
        incomeField = new JTextField(15);
        add(incomeField, gbc);

        // Row 1: Monthly Expenses
        gbc.gridx = 0; gbc.gridy = 1;
        add(new JLabel("Monthly Expenses:"), gbc);
        gbc.gridx = 1;
        expensesField = new JTextField(15);
        add(expensesField, gbc);

        // Row 2: Monthly Savings (Output)
        gbc.gridx = 0; gbc.gridy = 2;
        add(new JLabel("Monthly Savings:"), gbc);
        gbc.gridx = 1;
        monthlySavingsField = new JTextField(15);
        monthlySavingsField.setEditable(false); // Output field
        add(monthlySavingsField, gbc);

        // Row 3: Yearly Savings (Output)
        gbc.gridx = 0; gbc.gridy = 3;
        add(new JLabel("Yearly Savings:"), gbc);
        gbc.gridx = 1;
        yearlySavingsField = new JTextField(15);
        yearlySavingsField.setEditable(false); // Output field
        add(yearlySavingsField, gbc);

        // Row 4: Calculate Button
        gbc.gridx = 0; gbc.gridy = 4;
        gbc.gridwidth = 2; // Span across two columns
        calculateButton = new JButton("Calculate");
        add(calculateButton, gbc);

        // Row 5: Graphics Panel (Chart)
        gbc.gridx = 0; gbc.gridy = 5;
        gbc.gridwidth = 2;
        gbc.fill = GridBagConstraints.BOTH;
        gbc.weightx = 1.0;
        gbc.weighty = 1.0;
        chartComponent = new BudgetChartComponent();
        add(chartComponent, gbc);

        // Action Listener using Lambda expression
        calculateButton.addActionListener(e -> {
            try {
                // Parse input values
                double income = Double.parseDouble(incomeField.getText());
                double expenses = Double.parseDouble(expensesField.getText());

                // Perform calculations
                double monthlySavings = income - expenses;
                double yearlySavings = monthlySavings * 12;

                // Update output fields
                monthlySavingsField.setText(String.format("%.2f", monthlySavings));
                yearlySavingsField.setText(String.format("%.2f", yearlySavings));

                // Update and repaint the chart
                chartComponent.updateData(income, expenses, monthlySavings);

            } catch (NumberFormatException ex) {
                // Handle invalid numeric input
                JOptionPane.showMessageDialog(this, 
                    "Please enter valid numeric values for income and expenses.", 
                    "Input Error", 
                    JOptionPane.ERROR_MESSAGE);
            }
        });

        // Pack the window to respect preferred sizes of components
        pack();
        // Center the window on the screen
        setLocationRelativeTo(null);
        // Make the window visible (should be called last)
        setVisible(true);
    }

    /**
     * Entry point of the application.
     */
    public static void main(String[] args) {
        // Ensure Swing UI updates happen on the Event Dispatch Thread
        SwingUtilities.invokeLater(() -> {
            new BudgetTrackerFrame();
        });
    }
}
