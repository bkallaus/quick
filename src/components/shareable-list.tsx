import React, { useState } from 'react';
import CalculationContainer from './container';

type ListItem = {
  id: string;
  key: string;
  value: string;
};

const ShareableList = () => {
  const [items] = useState<ListItem[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const initialItems: ListItem[] = [];
    params.forEach((value, key) => {
      initialItems.push({
        id: Math.random().toString(36).substr(2, 9),
        key,
        value,
      });
    });
    return initialItems;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <CalculationContainer>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h4 style={{ textAlign: "center", marginBottom: 0 }}>Shareable List</h4>

        {/* List of Cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          {items.map((item) => (
            <article key={item.id} style={{ margin: 0, padding: '16px', minWidth: '200px', flex: '1 1 200px' }}>
              <header style={{ marginBottom: '8px', fontWeight: 'bold' }}>{item.key}</header>
              <div style={{ marginBottom: '16px', wordBreak: 'break-all' }}>{item.value}</div>
              <footer style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button
                  className="secondary outline"
                  onClick={() => handleCopy(item.value)}
                  style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
                >
                  Copy
                </button>
              </footer>
            </article>
          ))}
          {items.length === 0 && (
            <p style={{ fontStyle: 'italic', color: 'gray', textAlign: 'center', width: '100%' }}>No items in the list. Add one below!</p>
          )}
        </div>
      </div>
    </CalculationContainer>
  );
};

export default ShareableList;
