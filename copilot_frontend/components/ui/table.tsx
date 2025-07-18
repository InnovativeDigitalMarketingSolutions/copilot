import * as React from "react"

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full border-collapse border border-gray-300">{children}</table>
}

Table.Header = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100 border-b border-gray-300">{children}</thead>
)

Table.Body = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
)

Table.Row = ({ children }: { children: React.ReactNode }) => (
  <tr className="hover:bg-gray-50">{children}</tr>
)

Table.Head = ({ children }: { children: React.ReactNode }) => (
  <th className="p-2 text-left border border-gray-300">{children}</th>
)

Table.Cell = ({ children }: { children: React.ReactNode }) => (
  <td className="p-2 border border-gray-300">{children}</td>
)