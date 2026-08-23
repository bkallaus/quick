import React, { useState, useEffect } from 'react';
import Container from './container';
import { Card, CardContent } from './ui/card';

interface KeyData {
  key: string;
  code: string;
  keyCode: number;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

const KeycodeTester: React.FC = () => {
  const [keyData, setKeyData] = useState<KeyData | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      setKeyData({
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Keycode Tester</h2>
      <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg min-h-[300px]">
        {!keyData ? (
          <p className="text-muted-foreground text-lg text-center">
            Press any key on your keyboard to see its event properties.
          </p>
        ) : (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <span className="text-6xl font-bold text-primary">{keyData.keyCode}</span>
              <p className="text-muted-foreground mt-2">event.keyCode</p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-xl font-mono truncate" title={keyData.key}>
                    {keyData.key === ' ' ? '(Space)' : keyData.key}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">event.key</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-xl font-mono truncate" title={keyData.code}>
                    {keyData.code}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">event.code</div>
                </CardContent>
              </Card>

              <Card className="col-span-2 md:col-span-1">
                <CardContent className="pt-6 text-center">
                   <div className="flex flex-wrap justify-center gap-2">
                     <span className={`px-2 py-1 text-xs rounded-md ${keyData.ctrlKey ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Ctrl</span>
                     <span className={`px-2 py-1 text-xs rounded-md ${keyData.shiftKey ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Shift</span>
                     <span className={`px-2 py-1 text-xs rounded-md ${keyData.altKey ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Alt</span>
                     <span className={`px-2 py-1 text-xs rounded-md ${keyData.metaKey ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Meta</span>
                   </div>
                   <div className="text-sm text-muted-foreground mt-2">Modifiers</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default KeycodeTester;
