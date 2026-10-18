fetch('property-data.json')

.then(r => r.json())

.then(data => {

const expenses = data.expenses || [];
const maintenance = data.maintenance || [];

const totalSpend =
expenses.reduce(
(a,b)=>a+Number(b.Cost||0),
0
);

document.getElementById(
'totalSpend'
).innerText =
'$' +
Math.round(totalSpend)
.toLocaleString();

const largestExpense =
Math.max(
...expenses.map(
x =>
Number(x.Cost || 0)
),
0
);

document.getElementById(
'largestExpense'
).innerText =
'$' +
largestExpense.toLocaleString();

const currentYear =
new Date().getFullYear();

const yearSpend =
expenses
.filter(
e =>
new Date(e.Date)
.getFullYear()
=== currentYear
)
.reduce(
(a,b)=>
a+Number(b.Cost||0),
0
);

document.getElementById(
'yearSpend'
).innerText =
'$' +
yearSpend.toLocaleString();

const months = {};

expenses.forEach(e => {

const d =
new Date(e.Date);

const key =
d.getFullYear() +
'-' +
String(
d.getMonth()+1
).padStart(2,'0');

months[key] =
(months[key] || 0)
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
Object.keys(months),
datasets:[{
data:Object.values(months),
borderColor:'#60a5fa',
borderWidth:3,
fill:false,
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

const categories = {};

expenses.forEach(e => {

const cat =
e.Category || 'Other';

categories[cat] =
(categories[cat] || 0)
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
Object.keys(categories),
datasets:[{
data:
Object.values(categories),
backgroundColor:[
'#60a5fa',
'#34d399',
'#f59e0b',
'#f87171'
]
}]
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
new Date(b.Date) -
new Date(a.Date)
)
.slice(0,5)
.forEach(item => {

activityFeed.innerHTML += `

<div class="mb-4 pb-4 border-b border-slate-800">

<div class="font-medium">
${item.Description}
</div>

<div class="text-slate-400 text-sm mt-1">
${item.Date}
</div>

<div class="mt-2 text-emerald-400">
$${Number(item.Cost)
.toLocaleString()}
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

<div class="mb-4">

<div>
${item.Task}
</div>

<div class="text-slate-400 text-sm">
${item.Location}
</div>

</div>

`;

});

});
