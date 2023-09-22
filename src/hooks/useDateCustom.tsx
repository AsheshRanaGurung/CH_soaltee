function useDateFormatter() {
  const formatDateToCustomFormat = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12;

      return `Today ${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleString("en-US", options);
    }
  };

  return { formatDateToCustomFormat };
}

export default useDateFormatter;
