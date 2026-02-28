/*
 Business Rule: Calculate Total Family Expenses
 Table: Daily Expenses
 When: After Insert & Update
*/

(function executeRule(current, previous) {

    var totalExpense = 0;

    // Fetch all expense records related to the same family
    var expenseGR = new GlideRecord('x_family_daily_expense');
    expenseGR.addQuery('family', current.family);
    expenseGR.query();

    while (expenseGR.next()) {
        totalExpense += parseFloat(expenseGR.amount);
    }

    // Update total expenses in Family table
    var familyGR = new GlideRecord('x_family');
    if (familyGR.get(current.family)) {
        familyGR.total_expenses = totalExpense;
        familyGR.update();
    }

})(current, previous);
