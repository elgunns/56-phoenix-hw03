// Get the canvas context
const canvas = document.getElementById('lineChart');
const ctx = canvas.getContext('2d');

// Data for the chart
const labels = ['Fall`23', 'Winter`24', 'Spring`24', 'Summer`24', 'Fall`24', 'Winter`25'];
const onlineOrders = [50, 70, 90, 120, 180, 220];
const inStoreSales = [80, 80, 130, 140, 150, 210];
const subscriptions = [20, 60, 50, 80, 110, 190];

// Set the canvas size
canvas.width = 800;
canvas.height = 400;

// Define padding and chart dimensions
const padding = 50;
const chartWidth = canvas.width - 2 * padding;
const chartHeight = canvas.height - 2 * padding;
const maxValue = Math.max(...onlineOrders, ...inStoreSales, ...subscriptions);

// Scale factor
const scaleY = chartHeight / maxValue;
const scaleX = chartWidth / (labels.length - 1);

// Function to draw the chart
function drawChart() {
  // Draw axes
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding); // Y-axis
  ctx.lineTo(canvas.width - padding, canvas.height - padding); // X-axis
  ctx.stroke();

  // Draw lines for each dataset
  drawLine(onlineOrders, '#FF5733', 2, true, '#9F3F00');  // Online Orders line with border
  drawLine(inStoreSales, '#33FF57', 3, true, '#237D19');  // In-Store Sales line with border
  drawLine(subscriptions, '#fff', 2, false, '#444');  // Subscriptions line with border (no fill)

  drawPoints(onlineOrders, '#FF5733', '#9F3F00', 'star');
  drawPoints(inStoreSales, '#33FF57', '#237D19', 'rect');
  drawPoints(subscriptions, '#fff', '#444', 'triangle');

  // Draw labels for X-axis
  ctx.fillStyle = '#555';
  ctx.font = '14px Arial';
  labels.forEach((label, index) => {
    const x = padding + index * scaleX;
    const y = canvas.height - padding + 20;
    ctx.fillText(label, x, y);
  });

  // Draw Y-axis labels
  for (let i = 0; i <= 5; i++) {
    const y = canvas.height - padding - i * (chartHeight / 5);
    const value = Math.round(i * (maxValue / 5));
    ctx.fillText(value, padding - 30, y);
  }

  // Draw chart title
  ctx.fillStyle = '#144';
  ctx.font = 'bold 18px Arial';
  ctx.fillText('Performance Overview (2024)', canvas.width / 2 - 150, padding - 20);
}

// Function to draw a line for a dataset with borders
function drawLine(data, color, lineWidth, fill, borderColor) {
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding - data[0] * scaleY);
  data.forEach((value, index) => {
    const x = padding + index * scaleX;
    const y = canvas.height - padding - value * scaleY;
    ctx.lineTo(x, y);
  });

  ctx.strokeStyle = borderColor;  // Border color
  ctx.lineWidth = lineWidth + 1;  // Border width is slightly bigger
  ctx.stroke();

  if (fill) {
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.closePath();
    ctx.fillStyle = color.replace('rgba', 'rgba').replace(')', ', 0.3)');
    ctx.fill();
  }
}

// Function to draw points for each dataset with borders
function drawPoints(data, color, borderColor, shape) {
  data.forEach((value, index) => {
    const x = padding + index * scaleX;
    const y = canvas.height - padding - value * scaleY;
    
    ctx.fillStyle = color; // Inner color
    ctx.strokeStyle = borderColor; // Border color
    ctx.lineWidth = 2; // Border width
    
    // Draw custom shape
    if (shape === 'star') {
      drawStar(x, y, 6, 12, 5); // Draw star shape
    } else if (shape === 'rect') {
      drawRectangle(x, y); // Draw rectangle shape
    } else if (shape === 'triangle') {
      drawTriangle(x, y); // Draw triangle shape
    }

    // Draw border
    ctx.stroke();
  });
}

// Function to draw a star shape
function drawStar(x, y, radius1, radius2, points) {
  const step = Math.PI / points;
  ctx.beginPath();
  ctx.moveTo(x, y - radius1);
  for (let i = 0; i < points; i++) {
    ctx.lineTo(x + Math.cos(i * step) * radius1, y - Math.sin(i * step) * radius1);
    ctx.lineTo(x + Math.cos((i + 1) * step - Math.PI / points) * radius2, y - Math.sin((i + 1) * step - Math.PI / points) * radius2);
  }
  ctx.closePath();
  ctx.fill();
}


function drawRectangle(x, y) {
  const size = 10;
  ctx.fillRect(x - size / 2, y - size / 2, size, size); 
  ctx.strokeRect(x - size / 2, y - size / 2, size, size); 
}


function drawTriangle(x, y) {
  const size = 12;
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x - size, y + size);
  ctx.lineTo(x + size, y + size);
  ctx.closePath();
  ctx.fill();
}

drawChart();
