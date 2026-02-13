import React from 'react';

const SideNav = () => {
  return (
    <aside style={{
        position: 'sticky',
        top: '1rem',
        alignSelf: 'flex-start',
        minWidth: '200px',
        padding: '1rem',
    }}>
      <nav>
        <ul>
          <li><a href="#shareable-list">Shareable List</a></li>
          <li><a href="#percent-to-hex">Percent to Hex</a></li>
          <li><a href="#ml-to-cups">Ml to Cups</a></li>
          <li><a href="#pour-over">Pour Over</a></li>
          <li><a href="#qr-code">QR Code</a></li>
          <li><a href="#iframe-tester">Iframe Tester</a></li>
          <li><a href="#generate-list">Generate List</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
