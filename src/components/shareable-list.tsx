import React, { useState } from 'react';
import CalculationContainer from './container';

type ListItem = {
  id: string;
  key: string;
  value: string;
};

const ShareableList = () => {
  const [items, setItems] = useState<ListItem[]>(() => {
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
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKey && newValue) {
      setItems([
        ...items,
        {
          id: Math.random().toString(36).substr(2, 9),
          key: newKey,
          value: newValue,
        },
      ]);
      setNewKey("");
      setNewValue("");
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateUrl = () => {
    const params = new URLSearchParams();
    items.forEach((item) => params.append(item.key, item.value));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

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
                <button
                  className="contrast outline"
                  onClick={() => handleRemoveItem(item.id)}
                  style={{ flex: 0, padding: '8px 12px', fontSize: '0.8rem' }}
                  aria-label="Delete"
                >
                  ✕
                </button>
              </footer>
            </article>
          ))}
          {items.length === 0 && (
            <p style={{ fontStyle: 'italic', color: 'gray', textAlign: 'center', width: '100%' }}>No items in the list. Add one below!</p>
          )}
        </div>

        {/* Add Item Form */}
        <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label style={{ flex: 1, minWidth: '120px' }}>
            Key
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="e.g. Username"
              required
            />
          </label>
          <label style={{ flex: 1, minWidth: '120px' }}>
            Value
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="e.g. admin"
              required
            />
          </label>
          <button type="submit" style={{ width: 'auto', marginBottom: 'var(--spacing)' }}>Add</button>
        </form>

        {/* Generate URL Button */}
        <button onClick={generateUrl} className="primary" style={{ width: '100%' }}>
          Generate URL
        </button>
      </div>
    </CalculationContainer>
  );
};

export default ShareableList;
