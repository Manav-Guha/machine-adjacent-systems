// MIAF 3D Surface Visualization

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('miaf-surface');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight || 400;
  canvas.width = width;
  canvas.height = height;
  
  drawMIAFSurface(ctx, width, height);
});

function drawMIAFSurface(ctx, width, height) {
  // Dark background
  ctx.fillStyle = '#0a0e1a';
  ctx.fillRect(0, 0, width, height);
  
  const centerX = width / 2;
  const centerY = height / 2 + 40;
  const gridSize = 12;
  const cellSize = 40;
  const perspective = 700;
  
  // 3D projection
  function project3D(x, y, z) {
    const scale = perspective / (perspective + z);
    return {
      x: (x - centerX) * scale + centerX,
      y: (y - centerY) * scale + centerY,
      scale: scale
    };
  }
  
  // Surface height function
  function getHeight(x, z) {
    return Math.sin(x * 0.035) * Math.cos(z * 0.03) * 60;
  }
  
  // Store all quads for proper rendering order
  const quads = [];
  
  // Generate all quads
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
      
      const avgHeight = (y1 + y2 + y3 + y4) / 4;
      const avgZ = (z1 + z2 + z3 + z4) / 4;
      
      quads.push({
        points: [p1, p2, p3, p4],
        avgHeight: avgHeight,
        avgZ: avgZ,
        x1, z1, x2, z2, x3, z3, x4, z4
      });
    }
  }
  
  // Draw surface fills
  quads.forEach(quad => {
    const heightFactor = (quad.avgHeight + 60) / 120;
    const depthFactor = (quad.avgZ + gridSize * cellSize) / (gridSize * 2 * cellSize);
    
    // Blue gradient based on height
    const alpha = 0.15 + heightFactor * 0.25;
    const blue = Math.floor(150 + heightFactor * 80);
    
    ctx.fillStyle = `rgba(80, 100, ${blue}, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(quad.points[0].x, quad.points[0].y);
    ctx.lineTo(quad.points[1].x, quad.points[1].y);
    ctx.lineTo(quad.points[2].x, quad.points[2].y);
    ctx.lineTo(quad.points[3].x, quad.points[3].y);
    ctx.closePath();
    ctx.fill();
  });
  
  // Draw grid lines
  quads.forEach(quad => {
    ctx.strokeStyle = 'rgba(120, 150, 200, 0.4)';
    ctx.lineWidth = 1;
    
    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(quad.points[0].x, quad.points[0].y);
    ctx.lineTo(quad.points[1].x, quad.points[1].y);
    ctx.stroke();
    
    // Vertical line (only if not at edge)
    if (quad.z3 >= -gridSize * cellSize) {
      ctx.beginPath();
      ctx.moveTo(quad.points[0].x, quad.points[0].y);
      ctx.lineTo(quad.points[3].x, quad.points[3].y);
      ctx.stroke();
    }
  });
  
  // Draw axes labels (optional - can be removed for cleaner look)
  ctx.fillStyle = 'rgba(200, 200, 200, 0.6)';
  ctx.font = '12px sans-serif';
  
  // PPTO Domain label
  const pptoDomainPos = project3D(-gridSize * cellSize - 80, 0, 0);
  ctx.fillText('PPTO Domain', pptoDomainPos.x, pptoDomainPos.y);
  
  // Register label  
  const registerPos = project3D(gridSize * cellSize + 40, 0, 0);
  ctx.fillText('Register', registerPos.x, registerPos.y);
  
  // Impact label
  const impactPos = project3D(0, -80, -gridSize * cellSize);
  ctx.fillText('Impact', impactPos.x, impactPos.y);
}
