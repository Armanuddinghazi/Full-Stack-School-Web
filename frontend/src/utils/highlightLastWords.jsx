export const highlightLastWords = (text, count = 2) => {
  if (!text) return null;

  const words = text.trim().split(" ");
  if (words.length <= count) {
    return <span className="theme-highlight">{text}</span>;
  }

  const lastWords = words.splice(-count).join(" ");
  const firstPart = words.join(" ");

  return (
    <>
      {firstPart} <span className="theme-highlight">{lastWords}</span>
    </>
  );
};
