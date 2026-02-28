# 💰 Family Expense Calculation System using ServiceNow

## 📌 Project Overview
This project is developed as part of the SmartBridge Internship Program.  
The objective of this project is to design and implement a Family Expense Calculation System using the ServiceNow platform.

The system helps families track their daily expenses, categorize them, and automatically calculate total expenses.

---

## 🎯 Objectives
- Create Family Master Table
- Create Daily Expense Table
- Establish One-to-Many Relationship
- Implement Business Rule for Auto Calculation
- Display Related Expenses

---

## 🛠 Tools & Technologies Used
- ServiceNow Platform
- Tables
- Fields
- Reference Fields
- Business Rules
- Reports

---

## 🏗 Project Modules

### 1️⃣ Setting up ServiceNow Instance
- Created Personal Developer Instance
- Logged into ServiceNow platform

### 2️⃣ Creation of Family Table
Fields:
- Family Name (String)
- Head of Family (String)
- Monthly Budget (Decimal)
- Total Expenses (Decimal)

---

### 3️⃣ Creation of Daily Expenses Table
Fields:
- Expense Date (Date)
- Category (String)
- Amount (Decimal)
- Description (String)
- Family (Reference to Family Table)

---

### 4️⃣ Relationship Creation
A One-to-Many relationship is established:
One Family → Many Daily Expenses

---

### 5️⃣ Business Rule Implementation

A Business Rule is created on Daily Expenses table.

Function:
- Whenever a new expense is inserted or updated
- The system calculates total expenses
- Updates the Total Expenses field in Family table

---

## 💻 Business Rule Script

```javascript
(function executeRule(current, previous) {

    var total = 0;
    var gr = new GlideRecord('x_daily_expense');
    gr.addQuery('family', current.family);
    gr.query();

    while (gr.next()) {
        total += parseFloat(gr.amount);
    }

    var fam = new GlideRecord('x_family');
    if (fam.get(current.family)) {
        fam.total_expenses = total;
        fam.update();
    }

})(current, previous);
