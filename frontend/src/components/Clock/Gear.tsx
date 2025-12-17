import React from 'react';

interface GearProps {
  size: number;
  teeth: number;
  color: string;
  innerColor?: string;
  style?: React.CSSProperties;
  className?: string;
  holeSize?: number;
}

const Gear: React.FC<GearProps> = ({ 
  size, 
  teeth, 
  color, 
  innerColor = 'transparent',
  style, 
  className = '',
  holeSize = 0.3
}) => {
  const generateGearPath = () => {
    const outerRadius = size / 2;
    const innerRadius = outerRadius * 0.75;
    const toothHeight = outerRadius * 0.15;
    const points: string[] = [];
    
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.3) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const angle4 = ((i + 0.7) / teeth) * Math.PI * 2;
      
      // Inner point
      const x1 = Math.cos(angle1) * innerRadius + outerRadius;
      const y1 = Math.sin(angle1) * innerRadius + outerRadius;
      
      // Tooth rise
      const x2 = Math.cos(angle2) * (outerRadius + toothHeight) + outerRadius;
      const y2 = Math.sin(angle2) * (outerRadius + toothHeight) + outerRadius;
      
      // Tooth top
      const x3 = Math.cos(angle3) * (outerRadius + toothHeight) + outerRadius;
      const y3 = Math.sin(angle3) * (outerRadius + toothHeight) + outerRadius;
      
      // Tooth fall
      const x4 = Math.cos(angle4) * innerRadius + outerRadius;
      const y4 = Math.sin(angle4) * innerRadius + outerRadius;
      
      if (i === 0) {
        points.push(`M ${x1} ${y1}`);
      }
      points.push(`L ${x2} ${y2}`);
      points.push(`L ${x3} ${y3}`);
      points.push(`L ${x4} ${y4}`);
    }
    points.push('Z');
    
    return points.join(' ');
  };

  const holeRadius = (size / 2) * holeSize;
  const center = size / 2;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      style={style}
      className={className}
    >
      <defs>
        <linearGradient id={`gear-gradient-${size}-${teeth}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
        <filter id={`gear-shadow-${size}`}>
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>
      <path 
        d={generateGearPath()} 
        fill={`url(#gear-gradient-${size}-${teeth})`}
        stroke={color}
        strokeWidth="3"
        filter={`url(#gear-shadow-${size})`}
      />
      {/* Center hole */}
      <circle 
        cx={center} 
        cy={center} 
        r={holeRadius} 
        fill={innerColor}
        stroke={color}
        strokeWidth="4"
      />
      {/* Inner decorative circles */}
      <circle 
        cx={center} 
        cy={center} 
        r={holeRadius * 0.6} 
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.7"
      />
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <line
          key={i}
          x1={center + Math.cos((angle * Math.PI) / 180) * holeRadius * 0.8}
          y1={center + Math.sin((angle * Math.PI) / 180) * holeRadius * 0.8}
          x2={center + Math.cos((angle * Math.PI) / 180) * ((size / 2) * 0.6)}
          y2={center + Math.sin((angle * Math.PI) / 180) * ((size / 2) * 0.6)}
          stroke={color}
          strokeWidth="4"
          opacity="0.6"
        />
      ))}
    </svg>
  );
};

export default Gear;
