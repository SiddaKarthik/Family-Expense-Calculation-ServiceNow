/*
 Client Script: Prevent Negative Expense Amount
*/

function onSubmit() {

    if (g_form.getValue('amount') < 0) {
        alert("Expense amount cannot be negative.");
        return false;
    }

    return true;
}
