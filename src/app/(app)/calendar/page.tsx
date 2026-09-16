import { Suspense } from "react";
import PageLoader from "@/components/shared/page-loader";
import DayView from "@/components/calendar/day-view";
import WeekView from "@/components/calendar/week-view";
import { Event } from "@/types/calendar";
import { getTimeTable } from "@/app/actions/school-year";
import { transformTimetableToEvents } from "@/app/actions/calendar";

function getWeekStartDate() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // 计算距离本周一相差的天数
  // 如果今天是周日(0)，则往前推6天；否则往前推 dayOfWeek - 1 天
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToSubtract);
  monday.setHours(0, 0, 0, 0);
  
  return monday;
}

function getWeekDates(startDate: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CalendarPageContent />
    </Suspense>
  );
}

async function CalendarPageContent() {
  const events: Event[] = []; // TODO: Fetch events from DB
  const timetable = await getTimeTable();

  // Get current week's timetable events
  const weekStart = getWeekStartDate();
  const weekDates = getWeekDates(weekStart);
  const weekEvents = await Promise.all(
    weekDates.map((date) => transformTimetableToEvents(date, timetable)),
  );

  // Get today's timetable events
  const today = new Date();
  const todayEvents = await transformTimetableToEvents(today, timetable);

  return (
    <main>
      <div className="hidden sm:block">
        <WeekView
          events={events}
          timetableEvents={weekEvents.flat()}
          initialDate={weekStart}
          timetable={timetable}
        />
      </div>
      <div className="sm:hidden">
        <DayView
          events={events}
          timetableEvents={todayEvents}
          initialDate={today}
          timetable={timetable}
        />
      </div>
    </main>
  );
}
