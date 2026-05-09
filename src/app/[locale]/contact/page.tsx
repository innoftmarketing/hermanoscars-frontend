"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new FormData();
      body.append("your-name", form.name);
      body.append("your-email", form.email);
      body.append("your-phone", form.phone);
      body.append("your-message", form.message);
      const res = await fetch("https://hermanoscars.com/wp-json/contact-form-7/v1/contact-forms/1577/feedback", {
        method: "POST",
        body,
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-xl">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{t("title")}</h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8">{t("subtitle")}</p>

      {status === "success" ? (
        <div className="bg-green-50 text-green-700 border border-green-100 rounded-2xl p-6 text-center">
          <p className="text-2xl mb-2">✓</p>
          <p className="font-medium">{t("success")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "name", label: t("name"), type: "text", required: true },
            { key: "email", label: t("email"), type: "email", required: true },
            { key: "phone", label: t("phone"), type: "tel", required: false },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                {field.label}
              </label>
              <input
                type={field.type}
                required={field.required}
                value={(form as Record<string, string>)[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">{t("message")}</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500">{t("error")}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "..." : t("send")}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-neutral-500 mb-3">{t("orWhatsapp")}</p>
            <a
              href="https://wa.me/212661220832"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              {t("whatsappCta")} — +212 661-220832
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
