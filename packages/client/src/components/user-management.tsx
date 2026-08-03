import {
  SlidersHorizontal,
  Plus,
  Pencil,
  Ban,
  CheckCircle2,
} from "lucide-react";
import { useState, useMemo } from "react";
import { USERS } from "../lib/mock-data";
import { AppUser } from "../types/user";
import { Button } from "./catalyst/button";
import { IconAction } from "./catalyst/icon";
import { SearchInput } from "./catalyst/input";
import { Panel } from "./catalyst/panel";
import { Pagination } from "./pagination";
import Topbar from "./Topbar";
import { Table } from "./catalyst/table";
import { Badge } from "./catalyst/badge";

const UserManagement = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo<AppUser[]>(
    () =>
      USERS.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <Topbar
        title="User Management"
        subtitle="Manage and monitor all system users."
      />

      <Panel title="" className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <SearchInput
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex-1" />
          <Button variant="secondary">
            <SlidersHorizontal className="size-4" />
            Filter
          </Button>
          <Button>
            <Plus className="size-4" />
            Add User
          </Button>
        </div>

        <Table
          columns={[
            "ID",
            "Full Name",
            "Email",
            "Role",
            "Status",
            "Last Active",
            "Actions",
          ]}
        >
          {filtered.map((u) => (
            <tr
              key={u.id}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
            >
              <td className="py-3 px-5 text-slate-400">{u.id}</td>
              <td className="py-3 px-5 font-medium text-slate-800">{u.name}</td>
              <td className="py-3 px-5 text-slate-500">{u.email}</td>
              <td className="py-3 px-5">
                <Badge tone={u.roleTone}>{u.role}</Badge>
              </td>
              <td className="py-3 px-5">
                <Badge tone={u.status === "Active" ? "green" : "red"} dot>
                  {u.status}
                </Badge>
              </td>
              <td className="py-3 px-5 text-slate-400">{u.lastActive}</td>
              <td className="py-3 px-5">
                <div className="flex items-center gap-2">
                  <IconAction>
                    <Pencil className="size-3.5" />
                  </IconAction>
                  {u.status === "Active" ? (
                    <IconAction tone="red">
                      <Ban className="size-3.5" />
                    </IconAction>
                  ) : (
                    <IconAction tone="green">
                      <CheckCircle2 className="size-3.5" />
                    </IconAction>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing 1 to {filtered.length} of 156 users
          </p>
          <Pagination page={page} total={32} onChange={setPage} />
        </div>
      </Panel>
    </>
  );
};

export default UserManagement;
