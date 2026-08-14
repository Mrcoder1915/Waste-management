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
import { Panel } from "./panel";
import { Pagination } from "./pagination";
import Topbar from "./Topbar";
import { Table } from "./table";
import { Badge } from "./catalyst/badge";
import { AddUserModal, NewUser } from "./add-user-modal";
import { inviteUser } from "../lib/api";

interface UserManagementProps {
  /** Enables the Super Admin role in the Add User modal (super-admin dashboard only). */
  allowSuperAdmin?: boolean;
}

const UserManagement = ({ allowSuperAdmin = false }: UserManagementProps) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<AppUser[]>(USERS);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo<AppUser[]>(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.includes(query.toLowerCase()),
      ),
    [users, query],
  );

  const handleAddUser = async (user: NewUser) => {
    // Throws on failure so the modal can surface the error and stay open.
    await inviteUser({ name: user.name, email: user.email, role: user.role });
    setUsers((prev) => [
      {
        ...user,
        id: Math.max(0, ...prev.map((u) => u.id)) + 1,
        lastActive: "Invitation sent",
      },
      ...prev,
    ]);
  };

  return (
    <>
      <Topbar
        title="User Management"
        subtitle="Manage and monitor all system users."
      />

      <Panel title="" className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <SearchInput
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="hidden sm:block flex-1" />
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="flex-1 sm:flex-none">
              <SlidersHorizontal className="size-4" />
              Filter
            </Button>
            <Button
              onClick={() => setAddOpen(true)}
              className="flex-1 sm:flex-none"
            >
              <Plus className="size-4" />
              Add User
            </Button>
          </div>
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
                <Badge
                  tone={
                    u.status === "Active"
                      ? "green"
                      : u.status === "Invited"
                        ? "amber"
                        : "red"
                  }
                  dot
                >
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing 1 to {filtered.length} of 156 users
          </p>
          <Pagination page={page} total={32} onChange={setPage} />
        </div>
      </Panel>

      <AddUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAddUser}
        allowSuperAdmin={allowSuperAdmin}
      />
    </>
  );
};

export default UserManagement;
