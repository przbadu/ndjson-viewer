'use client'

// pages/index.js
import { ChangeEvent, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataItem {
  // Define the structure of the parsed data here
  [key: string]: any;
}

export default function Home() {
  const [data, setData] = useState<DataItem>([]);
  const [mergeNested, _setMergeNested] = useState(true);

  const flattenObject = (obj: Record<string, any>, parentKey = '', result: Record<string, any> = {}): Record<string, any> => {
    for (let key in obj) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        // Recursively flatten nested objects
        flattenObject(obj[key], newKey, result);
      } else {
        // Assign top-level or flattened key-value pairs
        result[newKey] = obj[key];
      }
    }
    return result;
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];

    if (file) {
      const text = await file.text();
      const lines = text.trim().split('\n');

      try {
        const parsedData: DataItem[] = lines.map(line => {
          const jsonObject = JSON.parse(line);
          return mergeNested ? flattenObject(jsonObject) : jsonObject;
        });
        setData(parsedData); // Make sure setData expects DataItem[]
      } catch (error) {
        console.error('Error parsing or flattening NDJSON file:', error);
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NDJSON File Viewer</h1>
      <Input type="file" onChange={handleFileUpload} accept=".ndjson" className="mb-4" />

      <div>
        {data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(data[0]).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, cellIndex) => (
                    <TableCell key={cellIndex}>{JSON.stringify(value)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
