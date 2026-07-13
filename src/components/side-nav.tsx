import React from 'react';

const SideNav = () => {
  return (
    <aside className="side-nav">
      <nav>
        <ul>
          <li><a href="#shareable-list">Shareable List</a></li>
          <li><a href="#percent-to-hex">Percent to Hex</a></li>
          <li><a href="#ml-to-cups">Ml to Cups</a></li>
          <li><a href="#pour-over">Pour Over</a></li>
          <li><a href="#qr-code">QR Code</a></li>
          <li><a href="#iframe-tester">Iframe Tester</a></li>
          <li><a href="#generate-list">Generate List</a></li>
          <li><a href="#base64-encoder">Base64 Encoder/Decoder</a></li>
          <li><a href="#temperature-converter">Temperature Converter</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
