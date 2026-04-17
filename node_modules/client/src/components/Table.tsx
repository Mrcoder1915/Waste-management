import { FaEdit, FaTrash } from "react-icons/fa";

export default function Table() {
  const rows = [
    { date: "April 1", bio: 5, rec: 3, res: 2 },
    { date: "April 2", bio: 6, rec: 2, res: 3 },
    { date: "April 3", bio: 4, rec: 4, res: 2 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">Segregation Records</h2>

        <div className="flex gap-2">
          <input
            placeholder="Search..."
            className="border px-2 py-1 rounded"
          />
          <button className="bg-green-600 text-white px-3 py-1 rounded">
            + Add Record
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="text-gray-400 border-b">
            <th>Date</th>
            <th>Bio</th>
            <th>Rec</th>
            <th>Res</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b">
              <td className="py-2">{r.date}</td>
              <td>{r.bio}</td>
              <td>{r.rec}</td>
              <td>{r.res}</td>
              <td>{r.bio + r.rec + r.res}</td>
              <td className="flex justify-center gap-2 py-2">
                <FaEdit className="cursor-pointer text-blue-500" />
                <FaTrash className="cursor-pointer text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}