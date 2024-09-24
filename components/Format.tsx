export class Format {
  static dateAndTime(snd: string | number | Date) {
    const dateAndTime = new Date(snd).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return dateAndTime;
  }

  static date(snd: string | number | Date) {
    const date = new Date(snd).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    return date;
  }

  static time(snd: string | number | Date) {
    const time = new Date(snd).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  }

  static longDateAndTime(snd: string | number | Date) {
    const date = new Date(snd).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return date;
  }
}
