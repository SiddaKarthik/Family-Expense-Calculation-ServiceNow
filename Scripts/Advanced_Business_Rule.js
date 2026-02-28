/*
 Business Rule using Script Include
*/

(function executeRule(current, previous) {

    var utils = new ExpenseUtils();
    var total = utils.calculateTotal(current.family);

    var familyGR = new GlideRecord('x_family');
    if (familyGR.get(current.family)) {

        familyGR.total_expenses = total;

        if (total > familyGR.monthly_budget) {
            gs.addInfoMessage("⚠ Budget Limit Crossed!");
        }

        familyGR.update();
    }

})(current, previous);
