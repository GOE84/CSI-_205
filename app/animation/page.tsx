"use client";
import { useEffect, useState } from 'react';

const ballImages: Record<string, string> = {
  Basketball: '/images/basketball.png', Football: '/images/football.png',
  Volleyball: '/images/volleyball.png', Human: '/images/phoom.jpg'
};
export default function AnimationPage() {
  const [ballType, setBallType] = useState('Basketball');
  const [running, setIsRunning] = useState(false);
  const [frame, setFrame] = useState({ x: 0, y: 0, moveLeft: false, moveUp: false, rotation: 0 });

  // เคลื่อนที่ 45 องศาและสะท้อนขอบ ต่อจาก Weed_4
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setFrame((prev) => {
        let x = prev.x + (prev.moveLeft ? -3 : 3);
        let y = prev.y + (prev.moveUp ? -3 : 3);
        let moveLeft = prev.moveLeft;
        let moveUp = prev.moveUp;
        if (x >= 540) { x = 1080 - x; moveLeft = true; }
        else if (x <= 0) { x = -x; moveLeft = false; }
        if (y >= 380) { y = 760 - y; moveUp = true; }
        else if (y <= 0) { y = -y; moveUp = false; }
        return { x, y, moveLeft, moveUp, rotation: (prev.rotation + 3) % 360 };
      });
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [running]);

  return (
    <section aria-label="Animation" tabIndex={0} className="mx-auto mt-6 max-w-2xl px-2" onKeyDown={(event) => {
      if (event.key === ' ') { event.preventDefault(); setIsRunning(!running); }
      const types = ['None', 'Basketball', 'Football', 'Volleyball', 'Human'];
      const index = Number(event.key) - 1;
      if (index >= 0 && index < types.length) setBallType(types[index]);
    }}>
      <div className="relative overflow-hidden rounded-lg border-2 border-gray-400 aspect-[4/3]" style={{ backgroundImage: 'url(/images/fill.jpg)', backgroundSize: 'cover' }}>
        <div aria-label={ballType} className="absolute rounded-full" style={{
          width: '15.625%', height: '20.8333%', left: `${frame.x / 640 * 100}%`, top: `${frame.y / 480 * 100}%`,
          backgroundImage: ballImages[ballType] ? `url(${ballImages[ballType]})` : 'none',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: ballType === 'None' ? 'orange' : 'transparent',
          transform: `rotate(${frame.rotation}deg)`
        }} />
      </div>
      <div className="flex flex-wrap justify-between gap-2 mt-2">
        <button className={`rounded px-3 py-2 text-white ${running ? 'bg-red-600' : 'bg-green-700'}`} onClick={() => setIsRunning(!running)}>{running ? 'PAUSE' : 'RUN'}</button>
        <div className="flex flex-wrap gap-1">
          {['None', ...Object.keys(ballImages)].map((type) => <button key={type} aria-pressed={type === ballType} className={`border rounded px-2 py-1 ${type === ballType ? 'bg-blue-600 text-white' : 'text-blue-600'}`} onClick={() => setBallType(type)}>{type}</button>)}
        </div>
      </div>
    </section>
  );
}
