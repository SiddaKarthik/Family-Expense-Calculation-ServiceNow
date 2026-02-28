/*
 Script Include: ExpenseUtils
 Purpose: Calculate total expense for a family
*/

var ExpenseUtils = Class.create();
ExpenseUtils.prototype = {

    initialize: function() {},

    calculateTotal: function(familyId) {

        var total = 0;

        var gr = new GlideRecord('x_family_daily_expense');
        gr.addQuery('family', familyId);
        gr.query();

        while (gr.next()) {
            total += parseFloat(gr.amount);
        }

        return total;
    },

    type: 'ExpenseUtils'
};
