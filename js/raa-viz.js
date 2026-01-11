// RAA - Static Adversarial Diagram

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('adversarial-viz');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.offsetWidth || 1200;
  const height = canvas.offsetHeight || 350;
  canvas.width = width;
  canvas.height = height;
  
  drawRAA(ctx, width, height);
});

function drawRAA(ctx, width, height) {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, width, height);
  
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.25;
  
  // 4 agents in circle
  const agents = [];
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI / 2) - Math.PI / 2;
    agents.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    });
  }
  
  // Draw arrows
  ctx.strokeStyle = '#ff9500';
  ctx.fillStyle = '#ff9500';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.7;
  
  for (let i = 0; i < 4; i++) {
    const from = agents[i];
    const to = agents[(i + 1) % 4];
    
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);
    
    const startX = from.x + Math.cos(angle) * 15;
    const startY = from.y + Math.sin(angle) * 15;
    const endX = to.x - Math.cos(angle) * 15;
    const endY = to.y - Math.sin(angle) * 15;
    
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const curveX = midX + Math.cos(angle + Math.PI / 2) * 25;
    const curveY = midY + Math.sin(angle + Math.PI / 2) * 25;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(curveX, curveY, endX, endY);
    ctx.stroke();
    
    // Arrow head
    const headAngle = Math.atan2(endY - curveY, endX - curveX);
    const headSize = 10;
    
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - headSize * Math.cos(headAngle - Math.PI / 6),
      endY - headSize * Math.sin(headAngle - Math.PI / 6)
    );
    ctx.lineTo(
      endX - headSize * Math.cos(headAngle + Math.PI / 6),
      endY - headSize * Math.sin(headAngle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  }
  
  ctx.globalAlpha = 1;
  
  // Draw nodes
  agents.forEach(agent => {
    // Glow
    const gradient = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, 24);
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.6)');
    gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(agent.x, agent.y, 24, 0, Math.PI * 2);
    ctx.fill();
    
    // Node
    ctx.fillStyle = '#00d4ff';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.arc(agent.x, agent.y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  
  // Center node
  ctx.strokeStyle = 'rgba(100, 150, 200, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
  ctx.stroke();
}
