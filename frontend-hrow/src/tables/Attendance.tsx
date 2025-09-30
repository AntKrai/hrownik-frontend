import * as React from "react";
import { type Worker } from "./Workers";

export interface AttendanceEntry {
  present: boolean;
  comment: string;
}

export interface AttendanceRecord {
  workerId: number;
  dates: { [date: string]: AttendanceEntry };
}

export interface AttendanceColumn {
  date: string;
  isDateValid: boolean;
}

interface AttendanceTableProps {
  workers: Worker[];
}

export default function AttendanceTable({ workers }: AttendanceTableProps) {
  const [columns, setColumns] = React.useState<AttendanceColumn[]>([
    { date: "", isDateValid: true },
  ]);

  const [records, setRecords] = React.useState<AttendanceRecord[]>(
    workers.map((w) => ({
      workerId: w.id,
      dates: {},
    }))
  );

  const handleDateChange = (colIndex: number, newDate: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    const isValid = regex.test(newDate) && !isNaN(Date.parse(newDate));

    const oldDate = columns[colIndex].date;

    setColumns((prev) =>
      prev.map((c, i) =>
        i === colIndex ? { ...c, date: newDate, isDateValid: isValid } : c
      )
    );

    // Move existing data if renaming
    if (oldDate && newDate && oldDate !== newDate) {
      setRecords((prev) =>
        prev.map((r) => {
          if (r.dates[oldDate]) {
            const { [oldDate]: oldEntry, ...rest } = r.dates;
            return {
              ...r,
              dates: {
                ...rest,
                [newDate]: oldEntry,
              },
            };
          }
          return r;
        })
      );
    }
  };

  // logic for togglePresent and updateComment
  const updateAttendance = (
    workerId: number,
    date: string,
    updater: (entry: AttendanceEntry) => AttendanceEntry
  ) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.workerId === workerId
          ? {
              ...r,
              dates: {
                ...r.dates,
                [date]: updater(
                  r.dates[date] ?? { present: false, comment: "" }
                ),
              },
            }
          : r
      )
    );
  };

  const togglePresent = (workerId: number, date: string) => {
    updateAttendance(workerId, date, (entry) => ({
      ...entry,
      present: !entry.present,
    }));
  };

  const updateComment = (workerId: number, date: string, value: string) => {
    updateAttendance(workerId, date, (entry) => ({
      ...entry,
      comment: value,
    }));
  };

  const addDateColumn = () => {
    const newDate = "";
    setColumns([...columns, { date: newDate, isDateValid: true }]);

    setRecords((prev) =>
      prev.map((r) => ({
        ...r,
        dates: {
          ...r.dates,
          [newDate]: r.dates[newDate] ?? { present: false, comment: "" },
        },
      }))
    );
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
                    <button onClick={addDateColumn} className="add-date">
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
                <th
                  key={`present-${colIndex}`}
                  className="presence-table-header"
                >
                  Present
                </th>
                <th
                  key={`comment-${colIndex}`}
                  className="presence-table-header"
                >
                  Comment
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => {
            const record = records.find((r) => r.workerId === worker.id)!;
            return (
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
                        checked={record.dates[col.date]?.present ?? false}
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
                        value={record.dates[col.date]?.comment ?? ""}
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
            );
          })}
        </tbody>
      </table>

      {/* Error message */}
      {columns.some((c) => !c.isDateValid) && (
        <p className="incorrect-date-alert">
          ❌ Please enter valid dates in YYYY-MM-DD format.
        </p>
      )}
    </div>
  );
}
