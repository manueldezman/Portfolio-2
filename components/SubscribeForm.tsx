"use client";

import { useEffect, useRef } from "react";

const KIT_UID = "bb1e8f9665";
const KIT_SCRIPT_SRC = `https://abdulganiy-adeleke.kit.com/${KIT_UID}/index.js`;

type SubscribeFormProps = {
  className?: string;
  description?: string;
  id?: string;
  title?: string;
};

export function SubscribeForm({
  className,
  description = "Drop your email below to get the next one delivered directly to your inbox.",
  id = "subscribe",
  title = "Get new posts in your inbox",
}: SubscribeFormProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const headingId = `${id}-heading`;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // The Kit embed for this form ships without an email field, so add one
    // before Kit's script initializes the form. Kit reads the form with
    // FormData at submit time and posts it to the same subscriptions endpoint.
    const addEmailField = () => {
      const form = container.querySelector<HTMLFormElement>(
        `form[data-uid="${KIT_UID}"]`,
      );
      if (!form) return false;

      if (!form.querySelector('input[name="email_address"]')) {
        const fields = form.querySelector<HTMLElement>('[data-element="fields"]');
        if (!fields) return false;

        const field = document.createElement("div");
        field.className = "formkit-field";

        const input = document.createElement("input");
        input.autocomplete = "email";
        input.className = "formkit-input";
        input.name = "email_address";
        input.placeholder = "Enter your email";
        input.required = true;
        input.type = "email";
        input.setAttribute("aria-label", "Email address");

        field.appendChild(input);
        fields.insertBefore(field, fields.firstChild);
      }

      return true;
    };

    const observer = new MutationObserver(() => {
      if (addEmailField()) observer.disconnect();
    });
    observer.observe(container, { childList: true, subtree: true });

    // Kit replaces the script tag with its form markup, so mount it inside our
    // container rather than loading it through next/script (which would append
    // it to the end of <body> and break the layout).
    let script: HTMLScriptElement | null = null;

    if (!container.querySelector(`form[data-uid="${KIT_UID}"]`)) {
      script = document.createElement("script");
      script.async = true;
      script.dataset.uid = KIT_UID;
      script.src = KIT_SCRIPT_SRC;
      container.appendChild(script);
    }

    return () => {
      observer.disconnect();
      script?.remove();
      container
        .querySelectorAll(`form[data-uid="${KIT_UID}"]`)
        .forEach((form) => form.remove());
    };
  }, []);

  return (
    <section aria-labelledby={headingId} className={className} id={id}>
      <div className="rounded-2xl bg-[color-mix(in_srgb,var(--rule)_6%,transparent)] p-7 sm:p-9">
        <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
          Newsletter
        </p>
        <h2
          className="mt-3 text-2xl font-semibold leading-8 tracking-[-0.01em] text-[var(--text)]"
          id={headingId}
        >
          {title}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">{description}</p>
        <div className="kit-subscribe mt-6" ref={mountRef} />
        <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
