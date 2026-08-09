import React, { useState } from 'react';

const UrlParser: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [parsedUrl, setParsedUrl] = useState<URL | null>(null);
  const [error, setError] = useState('');

  const handleParse = (value: string) => {
    setInputUrl(value);
    if (!value.trim()) {
      setParsedUrl(null);
      setError('');
      return;
    }

    // Add protocol if missing so we can still parse it as a URL if they just type "google.com"
    let urlToParse = value;
    if (!/^https?:\/\//i.test(value)) {
        urlToParse = 'http://' + value;
    }

    try {
      const url = new URL(urlToParse);
      setParsedUrl(url);
      setError('');
    } catch (e) {
      setParsedUrl(null);
      setError('Invalid URL format');
    }
  };

  return (
    <article className="component">
      <header>
        <h2>URL Parser</h2>
      </header>

      <div className="grid">
        <label htmlFor="url-input">
          Enter URL
          <input
            id="url-input"
            type="text"
            placeholder="https://example.com/path?query=1"
            value={inputUrl}
            onChange={(e) => handleParse(e.target.value)}
          />
        </label>
      </div>

      {error && <p style={{ color: 'var(--pico-del-color)' }}>{error}</p>}

      {parsedUrl && (
        <div style={{ marginTop: 'var(--pico-spacing)' }}>
          <table role="grid">
            <tbody>
              <tr>
                <th scope="row">Protocol</th>
                <td>{parsedUrl.protocol}</td>
              </tr>
              <tr>
                <th scope="row">Host</th>
                <td>{parsedUrl.host}</td>
              </tr>
              {parsedUrl.port && (
                <tr>
                  <th scope="row">Port</th>
                  <td>{parsedUrl.port}</td>
                </tr>
              )}
              <tr>
                <th scope="row">Pathname</th>
                <td>{parsedUrl.pathname}</td>
              </tr>
              {parsedUrl.search && (
                <tr>
                  <th scope="row">Query String</th>
                  <td>{parsedUrl.search}</td>
                </tr>
              )}
              {parsedUrl.hash && (
                <tr>
                  <th scope="row">Hash</th>
                  <td>{parsedUrl.hash}</td>
                </tr>
              )}
            </tbody>
          </table>

          {parsedUrl.searchParams.toString() && (
             <div style={{ marginTop: 'var(--pico-spacing)' }}>
                 <strong>Query Parameters</strong>
                 <table role="grid">
                     <thead>
                         <tr>
                             <th>Key</th>
                             <th>Value</th>
                         </tr>
                     </thead>
                     <tbody>
                        {Array.from(parsedUrl.searchParams.entries()).map(([key, value], index) => (
                           <tr key={index}>
                               <td>{key}</td>
                               <td>{value}</td>
                           </tr>
                        ))}
                     </tbody>
                 </table>
             </div>
          )}
        </div>
      )}
    </article>
  );
};

export default UrlParser;
