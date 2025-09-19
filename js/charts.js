document.addEventListener('DOMContentLoaded', function() {
    // Line Chart
    const healthTrendCanvas = document.getElementById('healthTrendChart');
    if (healthTrendCanvas) { /* ... line chart code ... */ }

    // Pie Chart
    const distributionCanvas = document.getElementById('workerDistributionChart');
    if (distributionCanvas) { /* ... pie chart code ... */ }

    // NEW: Bar Chart for Disease Types
    const diseaseTypeCanvas = document.getElementById('diseaseTypeChart');
    if (diseaseTypeCanvas) {
        new Chart(diseaseTypeCanvas, {
            type: 'bar',
            data: {
                labels: ['Viral Fever', 'Malaria', 'Skin Infections', 'Injuries', 'Dehydration'],
                datasets: [{
                    label: 'Number of Cases',
                    data: [120, 55, 80, 150, 60],
                    backgroundColor: 'rgba(220, 53, 69, 0.7)'
                }]
            },
            options: { indexAxis: 'y' } // Horizontal bar chart
        });
    }
});