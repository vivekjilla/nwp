import { CSSProperties, useEffect, useState } from "react";
import distanceToNow from '../../lib/dateRelative'

export default function TimeDisplay({ time }: { time: number }) {
  const [currentTime, setCurrentTime] = useState(() => {
    const hour = ("0" + new Date(time * 1000).getUTCHours()).slice(-2);
    const minutes = ("0" + new Date(time * 1000).getUTCMinutes()).slice(-2);

    return `${hour}:${minutes} UTC`;
  });

  useEffect(() => {
    setCurrentTime(() => {
      return distanceToNow(time)
    });
  }, [time]);

  // optionally make this content take space, but remain invisible, to avoid layout shifts
  // it's better to use a CSS class instead
  const style: CSSProperties = {
    visibility: currentTime.includes("UTC") ? "hidden" : "visible",
  };

  return (
      <p style={style}>{currentTime}</p>
  );
};