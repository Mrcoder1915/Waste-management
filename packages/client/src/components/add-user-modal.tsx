import { useEffect, useMemo, useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { Modal } from "./catalyst/modal";
import { Button } from "./catalyst/button";
import { Input, Label } from "./catalyst/input";
import { cx } from "../lib/cx";
import { Tone } from "../lib/tone-style";
import { AppUser } from "../types/user";

export type NewUser = Pick<
  AppUser,
  "name" | "email" | "role" | "roleTone" | "status"
>;

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: NewUser) => Promise<void> | void;
  /** Allow assigning the Super Admin role (super-admin dashboard only). */
  allowSuperAdmin?: boolean;
}

type Role = { value: string; tone: Tone };

const BASE_ROLES: Role[] = [
  { value: "Admin", tone: "green" },
  { value: "Operator", tone: "blue" },
];

const SUPER_ADMIN_ROLE: Role = { value: "Super Admin", tone: "purple" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  name: "",
  email: "",
  role: "Operator",
};

type Errors = Partial<Record<keyof typeof emptyForm, string>>;

export function AddUserModal({
  open,
  onClose,
  onSubmit,
  allowSuperAdmin = false,
}: AddUserModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const roles = useMemo(
    () => (allowSuperAdmin ? [...BASE_ROLES, SUPER_ADMIN_ROLE] : BASE_ROLES),
    [allowSuperAdmin],
  );

  // Reset the form each time the modal opens.
  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      setErrors({});
      setSubmitError(null);
      setSubmitting(false);
    }
  }, [open]);

  const set = (key: keyof typeof emptyForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email.";
    return next;
  };

  const submit = async () => {
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        role: form.role,
        roleTone: roles.find((r) => r.value === form.role)?.tone ?? "slate",
        status: "Invited",
      });
      onClose();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to send the invite.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const selectClass =
    "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Invite New User"
      subtitle="Send an email invitation to join."
      icon={
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Mail className="size-5" />
        </span>
      }
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" form="add-user-form" disabled={submitting}>
            <UserPlus className="size-4" />
            {submitting ? "Sending..." : "Send Invite"}
          </Button>
        </>
      }
    >
      <form
        id="add-user-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        noValidate
        className="space-y-1"
      >
        {submitError && (
          <div className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {submitError}
          </div>
        )}

        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="e.g. Maria Santos"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={cx(errors.name && "border-red-400 focus:border-red-500")}
          />
          {errors.name && (
            <p className="mb-2 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@wm.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={cx(errors.email && "border-red-400 focus:border-red-500")}
          />
          {errors.email && (
            <p className="mb-2 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            className={selectClass}
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.value}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          The user will receive an email invitation and can sign in with a
          one-time code sent to this address.
        </p>
      </form>
    </Modal>
  );
}
