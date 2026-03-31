import javax.swing.*;
import java.awt.*;

/**
 * Custom component to draw a bar chart representing the budget data.
 * Extends JComponent to provide custom painting capabilities.
 */
public class BudgetChartComponent extends JComponent {
    private double income = 0;
    private double expenses = 0;
    private double savings = 0;

    // Standard constructor
    public BudgetChartComponent() {
        // Set a preferred size so pack() knows how big to make the frame
        setPreferredSize(new Dimension(400, 200));
    }

    /**
     * Updates the data and triggers a repaint of the component.
     */
    public void updateData(double income, double expenses, double savings) {
        this.income = income;
        this.expenses = expenses;
        this.savings = savings;
        // repaint() schedules a call to paintComponent
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        // Always call super.paintComponent to ensure background is cleared
        super.paintComponent(g);

        // Cast to Graphics2D for more advanced drawing features
        Graphics2D g2d = (Graphics2D) g;

        // Enable anti-aliasing for smoother text
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int width = getWidth();
        int height = getHeight();
        int barHeight = 30;
        int spacing = 20;
        int startX = 100; // Offset for labels

        // Calculate maximum value for scaling the bars
        double maxVal = Math.max(income, Math.max(expenses, Math.abs(savings)));
        if (maxVal == 0) maxVal = 1; // Avoid division by zero

        double scale = (width - startX - 50) / maxVal;

        // 1. Draw Income Bar (Green)
        g2d.setColor(new Color(34, 139, 34)); // Forest Green
        int incomeWidth = (int) (income * scale);
        g2d.fillRect(startX, 20, incomeWidth, barHeight);
        g2d.setColor(Color.BLACK);
        g2d.drawString("Income", 10, 20 + barHeight / 2 + 5);
        g2d.drawString(String.format("$%.2f", income), startX + incomeWidth + 5, 20 + barHeight / 2 + 5);

        // 2. Draw Expenses Bar (Red)
        g2d.setColor(new Color(178, 34, 34)); // Firebrick Red
        int expensesWidth = (int) (expenses * scale);
        g2d.fillRect(startX, 20 + barHeight + spacing, expensesWidth, barHeight);
        g2d.setColor(Color.BLACK);
        g2d.drawString("Expenses", 10, 20 + barHeight + spacing + barHeight / 2 + 5);
        g2d.drawString(String.format("$%.2f", expenses), startX + expensesWidth + 5, 20 + barHeight + spacing + barHeight / 2 + 5);

        // 3. Draw Savings Bar (Blue)
        g2d.setColor(new Color(70, 130, 180)); // Steel Blue
        int savingsWidth = (int) (Math.max(0, savings) * scale);
        g2d.fillRect(startX, 20 + (barHeight + spacing) * 2, savingsWidth, barHeight);
        g2d.setColor(Color.BLACK);
        g2d.drawString("Savings", 10, 20 + (barHeight + spacing) * 2 + barHeight / 2 + 5);
        g2d.drawString(String.format("$%.2f", savings), startX + savingsWidth + 5, 20 + (barHeight + spacing) * 2 + barHeight / 2 + 5);
    }
}
