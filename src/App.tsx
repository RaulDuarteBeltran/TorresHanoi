import { ChangeEvent, useRef, useState } from "react";

import "./App.css";

function App() {
  return (
    <div>
      <TowerGame />
    </div>
  );
}

export default App;

function TowerGame() {
  const [diskNumber, setDiskNumber] = useState(3);
  const towersRef = useRef([
    [...[...Array(diskNumber).keys()].map((element) => element + 1).reverse()],
    [],
    [],
  ]);
  const [towerDisks, setTowerDisks] = useState([...towersRef.current]);
  const [movementHistory, setMovementHistory] = useState<number[][][]>([]);

  function ChangeNumberOfPieces(e: ChangeEvent<HTMLInputElement>) {
    const newDisksQuantity = Number(e.target.value);
    setDiskNumber(newDisksQuantity);
    const initialTowersState = [
      [
        ...[...Array(newDisksQuantity).keys()]
          .map((element) => element + 1)
          .reverse(),
      ],
      [],
      [],
    ];
    towersRef.current = [...initialTowersState];
    setTowerDisks([...initialTowersState]);
    setMovementHistory([]);
  }

  function ResolverTorres() {
    const [torre1, torre2, torre3] = [...towersRef.current];
    AñadirMovimientoAHistoria();
    //Agreguen su algoritmo aquí!!!!
  }

  function AñadirMovimientoAHistoria() {
    const [estadoTorre1, estadoTorre2, estadoTorre3] = [...towersRef.current];
    const nuevoEstadoTorre1 = [...estadoTorre1];
    const nuevoEstadoTorre2 = [...estadoTorre2];
    const nuevoEstadoTorre3 = [...estadoTorre3];
    setMovementHistory((historial) => {
      const nuevoHistorial = [...historial];
      nuevoHistorial.push([
        nuevoEstadoTorre1,
        nuevoEstadoTorre2,
        nuevoEstadoTorre3,
      ]);
      return nuevoHistorial;
    });
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <label htmlFor="pieces" style={{ fontSize: "40px" }}>
          Piezas del juego (1 a 7):
        </label>
        <input
          type="text"
          size={1}
          style={{ fontSize: "40px" }}
          value={diskNumber}
          onChange={ChangeNumberOfPieces}
        />
        <button
          style={{
            backgroundColor: "white",
            color: "black",
            margin: "0px 10px",
            height: "60px",
          }}
          onClick={ResolverTorres}
        >
          Resolver Torre
        </button>
      </div>
      <div className="game_zone">
        <Towers towerDisks={towerDisks} diskNumber={diskNumber} />
        <div className="history">
          <h3 style={{ color: "black" }}>History</h3>
          {movementHistory.map((movimiento, index) => {
            return (
              <button
                className="history_button"
                onClick={() => setTowerDisks(movimiento)}
              >
                Step {index}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface TowersProps {
  towerDisks: number[][];
  diskNumber: number;
}
function Towers({ towerDisks, diskNumber }: TowersProps) {
  const [tower1Disks, tower2Disks, tower3Disks] = [...towerDisks];

  return (
    <div className="towers">
      <Tower totalDisks={diskNumber} towerDisks={tower1Disks} />
      <Tower totalDisks={diskNumber} towerDisks={tower2Disks} />
      <Tower totalDisks={diskNumber} towerDisks={tower3Disks} />
    </div>
  );
}

interface TowerProps {
  totalDisks: number;
  towerDisks: number[];
}
function Tower({ totalDisks, towerDisks }: TowerProps) {
  return (
    <div className="tower">
      {towerDisks.map((disk) => (
        <Disk number={disk} width={100 - (totalDisks - disk) * 10} />
      ))}
    </div>
  );
}

interface DiskProps {
  number: number;
  width: number;
}

const diskColors = ["blue", "red", "green", "yellow", "orange", "pink"];

function Disk({ number, width }: DiskProps) {
  return (
    <div
      style={{
        width: `${width}%`,
        backgroundColor: diskColors[number - 1],
        height: "100px",
      }}
    >
      <h1>{number}</h1>
    </div>
  );
}
