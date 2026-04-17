import { useState } from "react";

export default function Segregation() {
  const [data, setData] = useState([
    { date: "2024-04-01", bio: 5, rec: 3, res: 2 },
  ]);

  const [form, setForm] = useState({
    date: "",
    bio: "",
    rec: "",
    res: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      ...form,
      bio: Number(form.bio),
      rec: Number(form.rec),
      res: Number(form.res),
    };

    setData([...data, newData]);
    setForm({ date: "", bio: "", rec: "", res: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Segregation</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <input type="date" required
          value={form.date}
          onChange={(e)=>setForm({...form, date:e.target.value})}
          className="border p-2 rounded"
        />

        <input type="number" placeholder="Biodegradable"
          value={form.bio}
          onChange={(e)=>setForm({...form, bio:e.target.value})}
          className="border p-2 rounded"
        />

        <input type="number" placeholder="Recyclable"
          value={form.rec}
          onChange={(e)=>setForm({...form, rec:e.target.value})}
          className="border p-2 rounded"
        />

        <input type="number" placeholder="Residual"
          value={form.res}
          onChange={(e)=>setForm({...form, res:e.target.value})}
          className="border p-2 rounded"
        />

        <button className="col-span-4 bg-green-600 text-white py-2 rounded">
          Add Record
        </button>
      </form>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Date</th>
            <th>Bio</th>
            <th>Rec</th>
            <th>Res</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            const total = item.bio + item.rec + item.res;
            return (
              <tr key={i} className="text-center">
                <td>{item.date}</td>
                <td>{item.bio}</td>
                <td>{item.rec}</td>
                <td>{item.res}</td>
                <td>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
