// useDateFormatter.ts

function useDateFormatter() {
  const formatDateToCustomFormat = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    // Check if the date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      // It's today, format it accordingly
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format

      return `Today ${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
    } else {
      // It's not today, return the full date or any other desired format
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
