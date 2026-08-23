import PercentToHex from "./components/percent-to-hex";
import PourOver from "./components/pour-over";
import QrCode from "./components/qr-code";
import MlToCups from "./components/ml-to-cups";
import IframeTester from "./components/iframe-tester";
import ShareableList from "./components/shareable-list";
import GenerateList from "./components/generate-list";
import Base64Encoder from "./components/base64-encoder";
import PasswordGenerator from "./components/password-generator";
import TimestampConverter from "./components/timestamp-converter";
import UnixPermissions from "./components/unix-permissions";
import PxToRem from "./components/px-to-rem";
import ColorContrast from "./components/color-contrast";
import LoremIpsum from "./components/lorem-ipsum";
import UrlParser from "./components/url-parser";
import WordCounter from "./components/word-counter";
import KeycodeTester from "./components/keycode-tester";
import SideNav from "./components/side-nav";
import "./App.css";

export default function App() {
  return (
    <div className="container app-layout">
      <SideNav />
      <main className="main-content">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
            Quick Calculations
          </h1>
          <div id="shareable-list"><ShareableList /></div>
          <div id="percent-to-hex"><PercentToHex /></div>
          <div id="ml-to-cups"><MlToCups /></div>
          <div id="pour-over"><PourOver /></div>
          <div id="qr-code"><QrCode /></div>
          <div id="iframe-tester"><IframeTester /></div>
          <div id="generate-list"><GenerateList /></div>
          <div id="base64-encoder"><Base64Encoder /></div>
          <div id="password-generator"><PasswordGenerator /></div>
          <div id="timestamp-converter"><TimestampConverter /></div>
          <div id="unix-permissions"><UnixPermissions /></div>
          <div id="px-to-rem"><PxToRem /></div>
          <div id="color-contrast"><ColorContrast /></div>
          <div id="lorem-ipsum-generator"><LoremIpsum /></div>
          <div id="url-parser"><UrlParser /></div>
          <div id="word-counter"><WordCounter /></div>
          <div id="keycode-tester"><KeycodeTester /></div>
        </div>
      </main>
    </div>
  );
}
