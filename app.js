fetch('property-data.json')
  .then(response => response.json())
  .then(data => {

    const expenses = data.expenses || [];
    const contractors = data.contractors || [];
    const maintenance = data.maintenance || [];

    // KPI CARDS

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
      .filter(item => {
        const year = new Date(item.Date).getFullYear();
        return year === currentYear;
      })
      .reduce(
        (sum, item) => sum + Number(item.Cost || 0),
        0
      );

    document.getElementById('yearSpend').textContent =
      '$' + yearSpend.toLocaleString
