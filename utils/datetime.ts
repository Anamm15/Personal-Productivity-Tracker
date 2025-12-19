export function timeToDate(time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export function timeStringToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

// Mendapatkan array 7 hari dimulai dari hari Minggu minggu ini (atau sekitar tanggal terpilih)
export function getWeekDays(baseDate: Date) {
  const days = [];
  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - baseDate.getDay()); // Mundur ke hari Minggu

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    days.push(d);
  }
  return days;
}

// Mendapatkan semua hari dalam bulan tertentu untuk Grid Kalender
export function getDaysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayObj = new Date(year, month, 1);
  const startDay = firstDayObj.getDay();

  const res = [];
  // Padding kosong di awal bulan
  for (let i = 0; i < startDay; i++) res.push(null);
  // Tanggal asli
  for (let i = 1; i <= daysInMonth; i++) res.push(new Date(year, month, i));
  return res;
}

export const isSameDate = (d1: Date, d2: Date) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const isToday = (d: Date) => isSameDate(d, new Date());
