"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

const GAME_WIDTH = 6;
const GAME_HEIGHT = 8;
const PLAYER_WIDTH = 1.2;
const COLLECTIBLE_SIZE = 0.6;
const FALL_SPEED = 0.08;
const PLAYER_SPEED = 0.25;

type Collectible = { id: number; x: number; y: number };

function Player({ xRef }: { xRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = xRef.current;
    }
  });
  return (
    <group ref={groupRef} position={[0, -GAME_HEIGHT / 2 + 1, 0]}>
      <mesh>
        <boxGeometry args={[PLAYER_WIDTH, 0.8, 0.5]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
    </group>
  );
}

function CollectibleCoconut({ pos }: { pos: Collectible }) {
  return (
    <mesh position={[pos.x, pos.y, 0]}>
      <sphereGeometry args={[COLLECTIBLE_SIZE / 2, 12, 12]} />
      <meshStandardMaterial color="#92400e" />
    </mesh>
  );
}

function GameContent({
  playerXRef,
  score,
  setScore,
  gameOver,
  collectiblesRef,
  setCollectibles,
  collectibles,
}: {
  playerXRef: React.MutableRefObject<number>;
  score: number;
  setScore: (s: number | ((n: number) => number)) => void;
  gameOver: boolean;
  collectiblesRef: React.MutableRefObject<Collectible[]>;
  setCollectibles: React.Dispatch<React.SetStateAction<Collectible[]>>;
  collectibles: Collectible[];
}) {
  const nextId = useRef(0);
  const spawnTimer = useRef(0);

  useFrame((_, delta) => {
    if (gameOver) return;

    spawnTimer.current += delta;
    if (spawnTimer.current > 1.2) {
      spawnTimer.current = 0;
      const next: Collectible = {
        id: nextId.current++,
        x: (Math.random() - 0.5) * (GAME_WIDTH - 1),
        y: GAME_HEIGHT / 2 + 0.5,
      };
      collectiblesRef.current = [...collectiblesRef.current, next];
      setCollectibles(collectiblesRef.current);
    }

    collectiblesRef.current = collectiblesRef.current
      .map((c) => ({ ...c, y: c.y - FALL_SPEED * 60 * delta }))
      .filter((c) => {
        if (c.y < -GAME_HEIGHT / 2 - 1) return false;
        const dx = Math.abs(c.x - playerXRef.current);
        const dy = Math.abs(c.y - (-GAME_HEIGHT / 2 + 1));
        if (dx < PLAYER_WIDTH / 2 + COLLECTIBLE_SIZE / 2 && dy < 1) {
          setScore((n) => n + 10);
          return false;
        }
        return true;
      });
    setCollectibles([...collectiblesRef.current]);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === "ArrowLeft") playerXRef.current = Math.max(-GAME_WIDTH / 2 + PLAYER_WIDTH / 2, playerXRef.current - PLAYER_SPEED);
      if (e.key === "ArrowRight") playerXRef.current = Math.min(GAME_WIDTH / 2 - PLAYER_WIDTH / 2, playerXRef.current + PLAYER_SPEED);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameOver, playerXRef]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Player xRef={playerXRef} />
      {collectibles.map((c) => (
        <CollectibleCoconut key={c.id} pos={c} />
      ))}
    </>
  );
}

export default function ClawsteinGame() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const playerXRef = useRef(0);
  const collectiblesRef = useRef<Collectible[]>([]);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [highScores, setHighScores] = useState<{ addr: string; score: number }[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("clawstein_scores");
      if (stored) setHighScores(JSON.parse(stored));
    } catch {
      setHighScores([
        { addr: "7xK...2mN", score: 450 },
        { addr: "9pL...4nQ", score: 320 },
        { addr: "2aM...8kT", score: 280 },
      ]);
    }
  }, []);

  return (
    <section id="game" className="relative scroll-mt-20 py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border-2 border-amber-400/50 bg-sky-900/80 p-6 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-amber-500 px-4 py-1 text-sm font-bold text-gray-900">
              DEMO
            </span>
            <span className="text-2xl font-bold text-amber-400">Score: {score}</span>
          </div>
          <p className="mb-4 text-center text-amber-100">
            Full game coming soon! Use ← → to move. Catch coconuts!
          </p>
          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-sky-950">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
              <GameContent
                playerXRef={playerXRef}
                score={score}
                setScore={setScore}
                gameOver={gameOver}
                collectiblesRef={collectiblesRef}
                setCollectibles={setCollectibles}
                collectibles={collectibles}
              />
            </Canvas>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 font-semibold text-amber-200">Leaderboard</h3>
            <div className="space-y-1 rounded-lg bg-black/30 p-3 font-mono text-sm">
              {highScores.map((h, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-amber-100">{h.addr}</span>
                  <span className="text-amber-400">{h.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
