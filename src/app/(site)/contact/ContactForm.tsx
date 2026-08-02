"use client";

import { useActionState } from "react";
import type { Category } from "@/sanity/types";
import { submitEnquiry, type EnquiryState } from "./actions";

const initialState: EnquiryState = { status: "idle", message: "", fieldErrors: {} };

export function ContactForm({ categories }: { categories: Category[] }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-sm border border-line bg-cream-dark p-8">
        <p className="font-serif text-2xl">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <Field label="Company" name="company" error={state.fieldErrors.company}>
        <input
          id="company"
          type="text"
          name="company"
          placeholder="Your brand or company"
          className={inputClass}
        />
      </Field>

      <Field label="Name" name="name" error={state.fieldErrors.name}>
        <input id="name" type="text" name="name" placeholder="Your name" className={inputClass} />
      </Field>

      <Field label="Email" name="email" error={state.fieldErrors.email}>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="name@brand.com"
          className={inputClass}
        />
      </Field>

      <Field label="Country" name="country" error={state.fieldErrors.country}>
        <input
          id="country"
          type="text"
          name="country"
          placeholder="Germany, France, Netherlands…"
          className={inputClass}
        />
      </Field>

      <fieldset>
        <legend className="label text-ink/50">Categories</legend>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {categories.map((c) => (
            <label key={c.name} className="flex items-center gap-2">
              <input type="checkbox" name="categories" value={c.name} className="h-4 w-4" />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Message" name="message" error={state.fieldErrors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Quantities, timeline, fabric notes…"
          className={inputClass}
        />
      </Field>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="label w-full rounded-sm bg-accent px-6 py-4 text-cream transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Enquiry →"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full border-b border-line bg-transparent pb-2 pt-1 text-sm outline-none focus:border-ink";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="label text-ink/50">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-1 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
