import PercentToHex from "./components/percent-to-hex";
import PourOver from "./components/pour-over";
import QrCode from "./components/qr-code";
import MlToCups from "./components/ml-to-cups";

export default function App() {
  return (
    <main className="container">
      <div style={{ display: "flex", flexDirection: "column", gap: 24, margin: "32px 0" }}>
        <h1 style={{ marginBottom: 24 }}>
          Quick Calculations
        </h1>
        <PercentToHex />
        <MlToCups />
        <PourOver />
        <QrCode />
      </div>
    </main>
  );
}
