import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // Import ChartJS for auto-registration

const ApplicationsPerMonthChart = ({ jobs }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (jobs && jobs.length > 0) {
            const applicationsByMonth = {};

            jobs.forEach(job => {
                const appliedDate = new Date(job.appliedDate);
                const monthYear = `${appliedDate.getMonth() + 1}/${appliedDate.getFullYear()}`; // Month/Year format

                applicationsByMonth[monthYear] = (applicationsByMonth[monthYear] || 0) + 1;
            });

            const labels = Object.keys(applicationsByMonth).sort(); // Sort months chronologically
            const data = labels.map(month => applicationsByMonth[month]);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Applications',
                        data,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Example color
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [jobs]);

    if (!chartData) {
        return <div>Loading chart data...</div>; // Or a placeholder
    }

    const options = {  // Customize chart appearance
        responsive: true,
        maintainAspectRatio: false, // Important for responsive charts
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month/Year'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Applications'
                },
                beginAtZero: true, // Start y-axis at 0
                ticks: {
                    stepSize: 1 // Show whole numbers on y-axis
                }
            }
        }
    };


    return (
        <div style={{ height: '400px' }}> {/* Set a height for the chart container */}
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ApplicationsPerMonthChart;