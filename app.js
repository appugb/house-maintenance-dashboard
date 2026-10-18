fetch('property-data.json')

.then(response => response.json())

.then(data => {

const expenses =
data.expenses || [];

const maintenance =
data.maintenance || [];

document.getElementById(
'lastUpdated'
).textContent =
'Updated ' +
new Date().toLocaleDateString();

const totalSpend =
expenses.reduce(
(sum,e)=>
sum + Number(e.Cost || 0),
0
);

document.getElementById(
'totalSpend'
).textContent =
'$' +
totalSpend.toLocaleString();

const currentYear =
new Date().getFullYear();

const yearSpend =
expenses
.filter(e =>
new Date(e.Date).getFullYear()
=== currentYear
)
.reduce(
(sum,e)=>
sum + Number(e.Cost || 0),
0
);

document.getElementById(
'yearSpend'
).textContent =
'$' +
yearSpend.toLocaleString();

document.getElementById(
'expenseCount'
).textContent =
expenses.length;

const largestExpense =
Math.max(
...expenses.map(
e => Number(e.Cost || 0)
),
0
);

document.getElementById(
'largestExpense'
).textContent =
'$' +
largestExpense.toLocaleString();

const categoryTotals = {};

expenses.forEach(e => {

const category =
e.Category || 'Other';

categoryTotals[category] =
(categoryTotals[category] || 0)
+
Number(e.Cost || 0);

});

new Chart(

document.getElementById(
'categoryChart'
),

{
type:'doughnut',

data:{

labels:
Object.keys(categoryTotals),

datasets:[
{
data:
Object.values(
categoryTotals
),

backgroundColor:[
'#3b82f6',
'#22c55e',
'#f59e0b',
'#ef4444',
'#8b5cf6'
]
}
]
},

options:{
plugins:{
legend:{
position:'bottom'
}
}
}
}

);

const monthlyTotals = {};

expenses.forEach(e => {

const date =
new Date(e.Date);

const month =
date.getFullYear()
+
'-'
+
String(
date.getMonth()+1
).padStart(2,'0');

monthlyTotals[month] =
(monthlyTotals[month] || 0)
+
Number(e.Cost || 0);

});

new Chart(

document.getElementById(
'monthlyChart'
),

{
type:'line',

data:{

labels:
Object.keys(monthlyTotals),

datasets:[{

label:'Monthly Spend',

data:
Object.values(monthlyTotals),

borderColor:'#3b82f6',

backgroundColor:
'rgba(59,130,246,.15)',

fill:true,

tension:0.4
}]
},

options:{
plugins:{
legend:{
display:false
}
}
}
}

);

const activityFeed =
document.getElementById(
'activityFeed'
);

expenses

.sort(
(a,b)=>
new Date(b.Date)
-
new Date(a.Date)
)

.slice(0,5)

.forEach(item => {

activityFeed.innerHTML += `

<div class="activity-item">

<div class="activity-title">
${item.Description}
</div>

<div class="activity-date">
${item.Date}
</div>

<div class="activity-cost">
$${Number(item.Cost).toLocaleString()}
</div>

</div>

`;

});

const maintenanceFeed =
document.getElementById(
'maintenanceFeed'
);

maintenance

.slice(0,8)

.forEach(item => {

maintenanceFeed.innerHTML += `

<div class="maintenance-item">

<div class="activity-title">
${item.Task}
</div>

<div class="maintenance-location">
${item.Location}
</div>

</div>

`;

});

})

.catch(error => {

console.error(error);

alert(
'Unable to load property-data.json'
);

});
