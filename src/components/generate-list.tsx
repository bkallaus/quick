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

  return (
    <CalculationContainer>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h4 style={{ textAlign: "center", marginBottom: 0 }}>Generate Shareable List</h4>

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
          <label style={{ width: 'auto' }}>
            &nbsp;
            <button type="submit" style={{ width: 'auto', marginBottom: 'var(--spacing)' }}>Add</button>
          </label>
        </form>
      </div>
    </CalculationContainer>
  );
};

export default ShareableList;
