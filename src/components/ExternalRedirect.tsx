import { useEffect } from "react";

type ExternalRedirectProps = {
  to: string;
};

function ExternalRedirect({ to }: ExternalRedirectProps) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <p className="mb-2 text-xs tracking-[0.18em] uppercase text-[#68563b]">
        Redirecting...
      </p>
      <p className="text-[#262117]">
        If you are not redirected automatically,{" "}
        <a
          href={to}
          target="_self"
          rel="noreferrer"
          className="border-b border-current text-[#141008]"
        >
          open Cortex Mail
        </a>
        .
      </p>
    </main>
  );
}

export default ExternalRedirect;
