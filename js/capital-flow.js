// Capital Flow - Static 3D Surface Visualization

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('capital-flow-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;
  
  // Draw static 3D surface
  drawSurface(ctx, width, height);
});

function drawSurface(ctx, width, height) {
  // Clear
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, width, height);
  
  const gridSize = 20;
  const cellSize = 35;
  const centerX = width / 2;
  const centerY = height / 2;
  
  // 3D projection settings
  const perspective = 600;
  const angle = Math.PI / 6;
  
  function project3D(x, y, z) {
    const scale = perspective / (perspective + z);
    return {
      x: (x - centerX) * scale + centerX,
      y: (y - centerY) * scale + centerY,
      scale: scale
    };
  }
  
  function getHeight(x, z) {
    return Math.sin(x * 0.04) * Math.cos(z * 0.03) * 40;
  }
  
  // Draw from back to front
  for (let z = gridSize; z >= -gridSize; z--) {
    for (let x = -gridSize; x < gridSize; x++) {
      const x1 = x * cellSize;
      const z1 = z * cellSize;
      const x2 = (x + 1) * cellSize;
      const z2 = z * cellSize;
      const x3 = (x + 1) * cellSize;
      const z3 = (z - 1) * cellSize;
      const x4 = x * cellSize;
      const z4 = (z - 1) * cellSize;
      
      const y1 = getHeight(x1, z1);
      const y2 = getHeight(x2, z2);
      const y3 = getHeight(x3, z3);
      const y4 = getHeight(x4, z4);
      
      const p1 = project3D(x1, y1, z1);
      const p2 = project3D(x2, y2, z2);
      const p3 = project3D(x3, y3, z3);
      const p4 = project3D(x4, y4, z4);
      
      // Fill surface
      const avgHeight = (y1 + y2 + y3 + y4) / 4;
      const heightFactor = (avgHeight + 40) / 80;
      const alpha = 0.15 + heightFactor * 0.15;
      
      ctx.fillStyle = `rgba(80, 120, 200, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fill();
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(100, 140, 200, 0.4)';
      ctx.lineWidth = 0.8;
      
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      
      // Vertical
      if (z < gridSize) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }
    }
  }
}
