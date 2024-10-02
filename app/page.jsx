"use client";

// pages/index.js
import { ChangeEvent, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { flattenObject } from "@/lib/utils";

export default function Home() {
  const [data, setData] = useState([]);
  const [mergeNested, _setMergeNested] = useState(true);
  const [error, setError] = useState(null);

  const handleFileUpload = useCallback(async (file) => {
    if (file) {
      try {
        const text = await file.text();
        const lines = text.trim().split("\n");
        const parsedData = lines.map((line) => {
          const jsonObject = JSON.parse(line);
          return mergeNested ? flattenObject(jsonObject) : jsonObject;
        });
        setData(parsedData); // Make sure setData expects DataItem[]
        setError(null);
      } catch (error) {
        console.error("Error parsing or flattening NDJSON file:", error);
        setData([]);
      }
    }
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0]);
      }
    },
    [handleFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/x-ndjson": [".ndjson"],
    },
  });

  return (
    <div className="w-full h-screen flex flex-col">
      {/* <h1 className="text-2xl font-bold mb-4 ml-8 mt-8">NDJSON File Viewer</h1> */}

      <div
        {...getRootProps()}
        className={`flex-grow flex items-center justify-center rounded-lg ${
isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
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

        {data.length > 0 ? (
          <div className="mt-6 px-6 h-full shrink overflow-hidden flex flex-col">
            <div className="flex flex-row items-start h-full shrink overflow-hidden">
              <div className="h-full min-w-[30%] shrink-0 !w-full">
                <div className="px-6">
                  Total Rows: {data.length}
                </div>

                <div className="flex flex-col h-full font-mono w-full bg-white rounded-lg border text-[12px] relative">
                  <div className="overflow-auto overscroll-none w-full h-full rounded-lg">
                    <div className="z-10 top-0 sticky w-full rounded-t-lg border-b">
                      {data.length > 0 && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {Object.keys(data[0]).map((key) => (
                                <TableHead
                                  key={key}
                                  className="shrink-0 border-r border-gray-200 py-1.5 px-4 font-semibold border-b -mb-[1px]"
                                >
                                  {key}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data.map((row, index) => (
                              <TableRow key={index}>
                                {Object.values(row).map((value, cellIndex) => (
                                  <TableCell
                                    key={cellIndex}
                                    className="shrink-0 border-r border-b border-gray-200 focus:z-10 focus:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
                                    style={{
                                      position: "relative",
                                      top: "0px",
                                      width: "312px",
                                    }}
                                  >
                                    {value}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
