console.log('scripts.js loaded');
$(document).ready(onReady);

// employee constructor and array

function Employee(firstName, lastName, emplId, emplTitle, salary) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.emplId = parseInt(emplId);
  this.emplTitle = emplTitle;
  this.salary = parseFloat(salary);
} // end Employee

let employees = [];
employees.push(new Employee('Jen', 'Barber', 4521, 'Team Lead', 80000));
employees.push(new Employee('Maurice', 'Moss', 8724, 'Support Team', 58000));
employees.push(new Employee('Roy', 'Smith', 9623, 'Quality Assurance', 48000));

// component functions

function addEmployee(roster) {
  // If all the fields are filled out, generate a new Employee from the values,
  // push the new Employee to the employees roster, and regenerate the table.
  let newFirstName = $('#firstName').val();
  let newLastName = $('#lastName').val();
  let newEmplId = $('#emplId').val();
  let newEmplTitle = $('#emplTitle').val();
  let newSalary = $('#salary').val();
  if (newFirstName && newLastName && newEmplId && newEmplTitle && newSalary) {
    roster.push(new Employee(newFirstName, newLastName, newEmplId, newEmplTitle, newSalary));
    listEmployees(roster);
    $('#addEmployeeForm input').val('');
  } else {
    alert('Please fill out all values to add a new employee.');
  } // end if
} // end addEmployee

function deleteEmployee() {
  // Delete the employee at the index value of the button that called the function,
  // then display the updated employee list.
  // TODO: rewrite this function to accept parameters for the array and index
  // rather than hardcoding the array and relying on being called by a specific element
  let index=$(this).data('row');
  // console.log('in deleteEmployee; index:', index);
  employees.splice(index, 1);
  listEmployees(employees);
} // end deleteEmployee

function formatCurrency(num) {
  // I cannot take credit for this bit of regular expression wizardry.
  // I just googled for ways to format numbers in jQuery,
  // and this seemed much simpler than using an additional plugin.
  // source: https://blog.abelotech.com/posts/number-currency-formatting-javascript/
  // author: Tom Pawlek
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  // If you would rather see how much I could figure out on my own,
  // comment out the above line and instead use:
  return '$' + num.toFixed(2);
} // end formatCurrency

function listEmployees(roster) {
  // Replace the current contents of the employee table with the data
  // supplied to the function (an array of Employees).
  // Also, calculate the monthly total salary load.
  let monthlySalary = 0;
  $('#employeeTable tbody').empty();
  for (i in roster) {
    // add the table row
    let $tr = $('<tr></tr>');
    $tr.append(`<td class="colFirstName">${roster[i].firstName}</td>`);
    $tr.append(`<td class="colLastName">${roster[i].lastName}</td>`);
    $tr.append(`<td class="colEmplId">${roster[i].emplId}</td>`);
    $tr.append(`<td class="colEmplTitle">${roster[i].emplTitle}</td>`);
    let prettySalary = formatCurrency(roster[i].salary);
    $tr.append(`<td class="colSalary">${prettySalary}</td>`);
    $tr.append(`<td class="colDelete"><button data-row="${i}">Delete</button></td>`);
    $('#employeeTable tbody').append($tr);
    // bind the delete function to the button
    // TODO: rewrite this to call deleteEmployee with explicit
    // array and index parameters
    $(`button[data-row="${i}"]`).on('click', deleteEmployee);
    // tally up the additional monthly salary
    monthlySalary += (roster[i].salary) / 12;
  } // end for
  $('#monthlyTotal').text(`${formatCurrency(monthlySalary)}`);
  if (monthlySalary > 20000) {
    $('#monthlyTotal').addClass('warning');
  } else {
    $('#monthlyTotal').removeClass('warning');
  } // end if monthly total check
} // end listEmployees

// document ready function

function onReady() {
  console.log('jQuery onReady loaded');
  listEmployees(employees);
  $('#submitEmployee').on('click', function(){
    addEmployee(employees);
  });
}