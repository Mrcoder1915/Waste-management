import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../../components/catalyst/button";
import { SearchInput } from "../../components/catalyst/input";
import { Panel } from "../../components/panel";
import { Pagination } from "../../components/pagination";
import { Table } from "../../components/table";
import { Badge } from "../../components/catalyst/badge";
import { LOGS, ACTION_TONE } from "../../lib/mock-data";
import { LogEntry } from "../../types/logs";
import Topbar from "../../components/Topbar";

export default function Logs() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo<LogEntry[]>(
    () =>
      LOGS.filter(
        (l) =>
          l.user.toLowerCase().includes(query.toLowerCase()) ||
          l.action.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <Topbar
        title="Activity Logs"
        subtitle="View all system activities and changes."
      />

      <Panel title="" className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <SearchInput
            placeholder="Search logs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex-1" />
          <Button variant="secondary">
            <SlidersHorizontal className="size-4" />
            Filter
          </Button>
        </div>

        <Table
          columns={["ID", "Time", "User", "Action", "Details", "IP Address"]}
        >
          {filtered.map((l) => (
            <tr
              key={l.id}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
            >
              <td className="py-3 px-5 text-slate-400">{l.id}</td>
              <td className="py-3 px-5 text-slate-500">{l.time}</td>
              <td className="py-3 px-5 font-medium text-slate-800">{l.user}</td>
              <td className="py-3 px-5">
                <Badge tone={ACTION_TONE[l.action] ?? "slate"}>{l.action}</Badge>
              </td>
              <td className="py-3 px-5 text-slate-500">{l.details}</td>
              <td className="py-3 px-5 text-slate-400">{l.ip}</td>
            </tr>
          ))}
        </Table>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing 1 to {filtered.length} of 1,250 logs
          </p>
          <Pagination page={page} total={157} onChange={setPage} />
        </div>
      </Panel>
    </>
  );
}
