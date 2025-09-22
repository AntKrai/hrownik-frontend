import * as React from "react";
import { type Worker } from "./Workers";

export interface AttendanceColumnEntry {
  date: string;
  isDateValid: boolean;
}

export interface AttendanceRecord {
  workerId: number;
  dates: {
    [date: string]: AttendanceColumnEntry;
  };
}

export interface AttendanceTableProps {
  workers: Worker[];
}

export function AttendanceTable({ workers }: AttendanceTableProps) {
  const [columns, setColumns] = React.useState<AttendanceColumnEntry[]>([
    { date: "", isDateValid: true },
  ]);

  const [records, setRecords] = React.useState<AttendanceRecord[]>(
    workers.map((w) => ({ workerId: w.id }))
  );

  const handleDateChange = (colIndex: number, value: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    const isValid = regex.test(value) && !isNaN(Date.parse(value));

    setColumns((prev) =>
      prev.map((c, i) =>
        i === colIndex ? { ...c, date: value, isDateValid: isValid } : c
      )
    );
  };

  const togglePresent = (workerId: number, date: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.workerId === workerId
          ? {
              ...r,
              [date]: {
                present: !(r[date]?.present ?? false),
                comment: r[date]?.comment ?? "",
              },
            }
          : r
      )
    );
  };

  const updateComment = (workerId: number, date: string, value: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.workerId === workerId
          ? {
              ...r,
              [date]: {
                present: r[date]?.present ?? false,
                comment: value,
              },
            }
          : r
      )
    );
  };

  const addDateColumn = () => {
    setColumns([...columns, { date: "", isDateValid: true }]);
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">Full Name</th>
            {columns.map((col, colIndex) => (
              <th
                key={`date-${colIndex}`}
                colSpan={2}
                className="border px-2 py-1 text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Date:</span>
                  <input
                    type="text"
                    value={col.date}
                    onChange={(e) => handleDateChange(colIndex, e.target.value)}
                    placeholder="YYYY-MM-DD"
                    className={`w-32 border px-1 ${
                      col.isDateValid ? "border-gray-300" : "border-red-500"
                    }`}
                  />
                  {colIndex === columns.length - 1 && (
                    <button
                      onClick={addDateColumn}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
          <tr>
            <th></th>
            {columns.map((_, colIndex) => (
              <>
                <th key={`present-${colIndex}`} className="border px-2 py-1">
                  Present
                </th>
                <th key={`comment-${colIndex}`} className="border px-2 py-1">
                  Comment
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td className="border px-2 py-1">
                {worker.name} {worker.surname}
              </td>
              {columns.map((col, colIndex) => (
                <>
                  <td
                    key={`check-${worker.id}-${colIndex}`}
                    className="border px-2 py-1 text-center"
                  >
                    <input
                      type="checkbox"
                      checked={
                        records.find((r) => r.workerId === worker.id)?.[
                          col.date
                        ]?.present ?? false
                      }
                      onChange={() => togglePresent(worker.id, col.date)}
                      disabled={!col.date || !col.isDateValid}
                    />
                  </td>
                  <td
                    key={`comment-${worker.id}-${colIndex}`}
                    className="border px-2 py-1"
                  >
                    <input
                      type="text"
                      value={
                        records.find((r) => r.workerId === worker.id)?.[
                          col.date
                        ]?.comment ?? ""
                      }
                      onChange={(e) =>
                        updateComment(worker.id, col.date, e.target.value)
                      }
                      disabled={!col.date || !col.isDateValid}
                      placeholder="Optional"
                      className="w-full border px-1"
                    />
                  </td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show error if any date is invalid */}
      {columns.some((c) => !c.isDateValid) && (
        <p className="text-red-500 mt-2">
          ❌ Please enter valid dates in YYYY-MM-DD format.
        </p>
      )}
    </div>
  );
}
