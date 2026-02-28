/*
 Business Rule: Budget Exceed Alert
 Table: Daily Expenses
 When: After Insert & Update
*/

(function executeRule(current, previous) {

    var totalExpense = 0;

    var expenseGR = new GlideRecord('x_family_daily_expense');
    expenseGR.addQuery('family', current.family);
    expenseGR.query();

    while (expenseGR.next()) {
        totalExpense += parseFloat(expenseGR.amount);
    }

    var familyGR = new GlideRecord('x_family');
    if (familyGR.get(current.family)) {

        familyGR.total_expenses = totalExpense;

        // Budget Check Logic
        if (totalExpense > familyGR.monthly_budget) {
            gs.addInfoMessage("⚠ Budget Exceeded for this Family!");
        }

        familyGR.update();
    }

})(current, previous);
