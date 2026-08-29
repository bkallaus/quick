import { useId, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import Container from './container';

export default function SetOperations() {
  const [listA, setListA] = useState<string>('');
  const [listB, setListB] = useState<string>('');
  const [operation, setOperation] = useState<string>('union');

  const idListA = useId();
  const idListB = useId();
  const idOperation = useId();
  const idOutput = useId();

  const getSet = (text: string) => {
    return new Set(text.split('\n').map((line) => line.trim()).filter(Boolean));
  };

  const result = useMemo(() => {
    const setA = getSet(listA);
    const setB = getSet(listB);

    let resSet = new Set<string>();

    switch (operation) {
      case 'union':
        resSet = new Set([...setA, ...setB]);
        break;
      case 'intersection':
        resSet = new Set([...setA].filter((x) => setB.has(x)));
        break;
      case 'differenceAB':
        resSet = new Set([...setA].filter((x) => !setB.has(x)));
        break;
      case 'differenceBA':
        resSet = new Set([...setB].filter((x) => !setA.has(x)));
        break;
      default:
        resSet = new Set();
    }

    return Array.from(resSet).join('\n');
  }, [listA, listB, operation]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result).catch(console.error);
  };

  return (
    <Container>
      <div className="w-full max-w-4xl flex flex-col gap-6 w-full">
      <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">Set Operations</h2>
      <p className="text-center text-muted-foreground mb-8">
        Compute Union, Intersection, and Difference of two lists.
      </p>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>List A</CardTitle>
            <CardDescription>Enter items separated by newlines</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor={idListA} className="sr-only">List A</Label>
            <Textarea
              id={idListA}
              placeholder="apple&#10;banana&#10;cherry"
              className="min-h-[200px]"
              value={listA}
              onChange={(e) => setListA(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>List B</CardTitle>
            <CardDescription>Enter items separated by newlines</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor={idListB} className="sr-only">List B</Label>
            <Textarea
              id={idListB}
              placeholder="banana&#10;date&#10;elderberry"
              className="min-h-[200px]"
              value={listB}
              onChange={(e) => setListB(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Operation</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor={idOperation} className="sr-only">Operation</Label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger id={idOperation} className="w-full sm:w-[300px]">
              <SelectValue placeholder="Select operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="union">Union (A ∪ B)</SelectItem>
              <SelectItem value="intersection">Intersection (A ∩ B)</SelectItem>
              <SelectItem value="differenceAB">Difference (A \ B)</SelectItem>
              <SelectItem value="differenceBA">Difference (B \ A)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card id="set-operations-output">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Result</CardTitle>
            <CardDescription>Output of the selected operation</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy} title="Copy to clipboard">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </CardHeader>
        <CardContent>
          <Label htmlFor={idOutput} className="sr-only">Result Output</Label>
          <Textarea
            id={idOutput}
            className="min-h-[200px]"
            value={result}
            readOnly
          />
        </CardContent>
      </Card>
          </div>
    </Container>
  );
}
