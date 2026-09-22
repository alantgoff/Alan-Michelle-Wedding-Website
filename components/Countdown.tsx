"use client";

import { useEffect, useState } from "react";

const DAY_MS = 86_400_000;

/**
 * Days until the wedding, computed in the browser so the server's clock is
 * never baked into the page. Knows what to say on the day and afterwards.
 */
export function Countdown({ target }: { target: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setDays(Math.ceil((new Date(target).getTime() - Date.now()) / DAY_MS));
    update();
    const id = setInterval(update, 3_600_000);
    return () => clearInterval(id);
  }, [target]);

  if (days === null) {
    return (
      <div className="countdown">
        <strong>—</strong>
        <span>days until we celebrate</span>
      </div>
    );
  }
  if (days < 0) {
    return (
      <div className="countdown">
        <strong className="countdown-word">Married</strong>
        <span>and so glad you were there</span>
      </div>
    );
  }
  if (days === 0) {
    return (
      <div className="countdown">
        <strong className="countdown-word">Today</strong>
        <span>see you on the lawn</span>
      </div>
    );
  }
  return (
    <div className="countdown">
      <strong>{days}</strong>
      <span>{days === 1 ? "day until we celebrate" : "days until we celebrate"}</span>
    </div>
  );
}
