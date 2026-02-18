import React, { useState, useRef, useEffect } from 'react';
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

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopiedId(null);
        timeoutRef.current = null;
      }, 2000);
    });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <CalculationContainer>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h4 style={{ textAlign: "center", marginBottom: 0 }}>Shareable List</h4>

        {/* List of Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item) => (
            <article key={item.id} style={{ margin: 0, padding: '16px' }}>
              <header style={{ marginBottom: '8px', fontWeight: 'bold' }}>{item.key}</header>
              <div style={{ marginBottom: '16px', wordBreak: 'break-all' }}>{item.value}</div>
              <footer style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button
                  className={`secondary ${copiedId === item.id ? "" : "outline"}`}
                  onClick={() => handleCopy(item.id, item.value)}
                  style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
                >
                  {copiedId === item.id ? "Copied!" : "Copy"}
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
