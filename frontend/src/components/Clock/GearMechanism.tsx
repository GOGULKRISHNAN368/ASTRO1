import React from 'react';
import Gear from './Gear';

const GearMechanism: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '5%',
        overflow: 'hidden',
        opacity: 0.6,
        zIndex: 1,
        borderRadius: '50%',
      }}
    >
      {/* Large main gear - center */}
      <div
        className="animate-gear-slow"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Gear 
          size={180} 
          teeth={24} 
          color="hsl(43, 74%, 35%)"
          innerColor="hsl(0, 0%, 5%)"
          holeSize={0.4}
        />
      </div>
      
      {/* Top-right gear */}
      <div
        className="animate-gear-reverse-medium"
        style={{
          position: 'absolute',
          right: '15%',
          top: '10%',
        }}
      >
        <Gear 
          size={80} 
          teeth={12} 
          color="hsl(30, 60%, 40%)"
          innerColor="hsl(0, 0%, 5%)"
          holeSize={0.35}
        />
      </div>
      
      {/* Top-left gear */}
      <div
        className="animate-gear-medium"
        style={{
          position: 'absolute',
          left: '10%',
          top: '15%',
        }}
      >
        <Gear 
          size={100} 
          teeth={16} 
          color="hsl(0, 0%, 60%)"
          innerColor="hsl(0, 0%, 5%)"
          holeSize={0.3}
        />
      </div>
      
      {/* Bottom-left gear */}
      <div
        className="animate-gear-reverse-slow"
        style={{
          position: 'absolute',
          left: '5%',
          bottom: '20%',
        }}
      >
        <Gear 
          size={120} 
          teeth={18} 
          color="hsl(20, 70%, 45%)"
          innerColor="hsl(0, 0%, 5%)"
          holeSize={0.35}
        />
      </div>
      
      {/* Bottom-right gear */}
      <div
        className="animate-gear-fast"
        style={{
          position: 'absolute',
          right: '10%',
          bottom: '15%',
        }}
      >
        <Gear 
          size={70} 
          teeth={10} 
          color="hsl(43, 80%, 50%)"
          innerColor="hsl(0, 0%, 5%)"
          holeSize={0.4}
        />
      </div>
      
      {/* Small decorative gears */}
      <div
        className="animate-gear-reverse-medium"
        style={{
          position: 'absolute',
          right: '25%',
          bottom: '30%',
        }}
      >
        <Gear 
          size={50} 
          teeth={8} 
          color="hsl(0, 0%, 50%)"
          innerColor="hsl(0, 0%, 5%)"
          holeSize={0.3}
        />
      </div>
      
      <div
        className="animate-gear-medium"
        style={{
          position: 'absolute',
          left: '25%',
          top: '35%',
        }}
      >
        <Gear 
          size={60} 
          teeth={10} 
          color="hsl(30, 50%, 35%)"
          innerColor="hsl(0, 0%, 5%)"
          holeSize={0.35}
        />
      </div>
    </div>
  );
};

export default GearMechanism;
