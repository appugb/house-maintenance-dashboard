fetch('property-data.json')
  .then(response => response.json())
  .then(data => {

    const expenses = data.expenses || [];
    const contractors = data.contractors || [];

    const totalSpend = expenses.reduce(
      (sum, item) => sum + Number(item.Cost || 0),
      0
    );

    document.getElementById('totalSpend').textContent =
      '$' + totalSpend.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

    const currentYear = new Date().getFullYear();

    const yearSpend = expenses
      .filter(x => new Date(x.Date).getFullYear() === currentYear)
      .reduce((sum, item) => sum + Number(item.Cost || 0), 0);

    document.getElementById('yearSpend').textContent =
      '$' + yearSpend.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

    document.getElementById('expenseCount').textContent =
      expenses.length;

    document.getElementById('contractorCount').textContent =
      contractors.length;

    const categoryTotals = {};

    expenses.forEach(item => {

      const category = item.Category || 'Unknown';

      categoryTotals[category] =
        (categoryTotals[category] || 0) +
        Number(item.Cost || 0);
    });

    new Chart(
      document.getElementById('categoryChart'),
      {
        type: 'pie',
        data: {
          labels: Object.keys(categoryTotals),
          datasets: [{
            data: Object.values(categoryTotals)
          }]
        }
      }
    );

    const yearlyTotals = {};

    expenses.forEach(item => {

      const year =
        new Date(item.Date).getFullYear();

      yearlyTotals[year] =
        (yearlyTotals[year] || 0) +
        Number(item.Cost || 0);
    });

    new Chart(
      document.getElementById('yearChart'),
      {
        type: 'bar',
        data: {
          labels: Object.keys(yearlyTotals),
          datasets: [{
            label: 'Spend',
            data: Object.values(yearlyTotals),
            backgroundColor: '#2f5597'
          }]
        }
      }
    );

    const topExpenses =
      [...expenses]
        .sort((a, b) => Number(b.Cost) - Number(a.Cost))
        .slice(0, 10);

    const tbody =
      document.querySelector('#expenseTable tbody');

    topExpenses.forEach(item => {

      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${item.Date}</td>
        <td>${item.Description}</td>
        <td>$${Number(item.Cost).toLocaleString()}</td>
      `;

      tbody.appendChild(row);
    });

  })
  .catch(error => {
    console.error(error);
    alert('Could not load property-data.json');
  });
