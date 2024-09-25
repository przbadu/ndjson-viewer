'use client'

// pages/index.js
import { ChangeEvent, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { flattenObject } from '@/lib/utils';

interface DataItem {
  // Define the structure of the parsed data here
  [key: string]: any;
}

export default function Home() {
  const [data, setData] = useState<DataItem>([]);
  const [mergeNested, _setMergeNested] = useState(true);
  const [error, setError] = useState(null);

  const handleFileUpload = useCallback(async (file) => {
    if (file) {
      try {
        const text = await file.text();
        const lines = text.trim().split('\n');
        const parsedData: DataItem[] = lines.map(line => {
          const jsonObject = JSON.parse(line);
          return mergeNested ? flattenObject(jsonObject) : jsonObject;
        });
        setData(parsedData); // Make sure setData expects DataItem[]
        setError(null)
      } catch (error) {
        console.error('Error parsing or flattening NDJSON file:', error);
        setData([])
      }
    }
  })

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles[0]);
    }
  }, [handleFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/x-ndjson': ['.ndjson'],
    },
  });

  return (
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">NDJSON File Viewer</h1>

      <div
        {...getRootProps()}
        className={`flex-grow flex items-center justify-center border-2 border-dashed rounded-lg p-4 ${
isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
}`}
      >
        <input {...getInputProps()} />
        {data.length === 0 && !error && (
          <p className="text-center text-gray-500">
            Drag and drop your NDJSON file here, or click to select a file
          </p>
        )}

        {error && (
          <AlertDialog variant="destructive">
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialog>
        )}

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
