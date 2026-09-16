"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as lucideIcons from "lucide-react";
import { Event } from "@/types/calendar";
import { TimeTable } from "@/types/school-year";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { getWeekTimetableEvents } from "@/app/actions/calendar";
import { isHoliday } from "@/constants/holidays";
import { cn } from "@/lib/utils";
import { transformTimetableToEvents } from "@/app/actions/calendar";
import { useTranslation } from "@/hooks/use-translation";

const hours = Array.from({ length: 14 }, (_, i) => i + 7);

interface WeekViewProps {
  events: Event[];
  timetableEvents: Event[];
  initialDate: Date;
  timetable: TimeTable;
}

export default function WeekView({
  events,
  timetableEvents,
  initialDate,
  timetable,
}: WeekViewProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(initialDate);
  const [currentTimetableEvents, setCurrentTimetableEvents] =
    useState(timetableEvents);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    async function fetchWeekEvents() {
      setIsLoadingEvents(true);
      try {
        const newEvents = await getWeekTimetableEvents(
          currentWeekStart.toISOString(),
        );
        setCurrentTimetableEvents(newEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoadingEvents(false);
      }
    }

    if (currentWeekStart.getTime() !== initialDate.getTime()) {
      fetchWeekEvents();
    }
  }, [currentWeekStart, initialDate]);

  if (isLoadingEvents) {
    console.log("Loading events...");
  }

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];

  const getWeekDates = (startDate: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(currentWeekStart);

  const changeWeek = (increment: number) => {
    setCurrentWeekStart((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7 * increment);
      return newDate;
    });
  };

  const getEventsForDate = (date: Date, allDay: boolean) => {
    return [...events, ...currentTimetableEvents].filter(
      (event) =>
        event.start.getDate() === date.getDate() &&
        event.start.getMonth() === date.getMonth() &&
        event.start.getFullYear() === date.getFullYear() &&
        event.isAllDay === allDay,
    );
  };

  const getEventPosition = (event: Event) => {
    const startHour =
      event.start.getUTCHours() + event.start.getUTCMinutes() / 60;
    const endHour = event.end.getUTCHours() + event.end.getUTCMinutes() / 60;
    const top = (startHour - 7) * 100;
    const height = (endHour - startHour) * 100;
    return { top, height };
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  useEffect(() => {
    async function updateTimetableEvents() {
      const weekDates = getWeekDates(currentWeekStart);
      const newEvents = await Promise.all(
        weekDates.map((date) => transformTimetableToEvents(date, timetable)),
      );
      setCurrentTimetableEvents(newEvents.flat());
    }

    if (currentWeekStart.getTime() !== initialDate.getTime()) {
      updateTimetableEvents();
    }
  }, [currentWeekStart, initialDate, timetable]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h1 className="text-2xl font-bold">
          {t("calendar.week")} {getWeekNumber(currentWeekStart)},{" "}
          {currentWeekStart.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <div className="flex space-x-2">
          <Link href="/calendar/timetable">
            <Button className="mr-4" variant="outline">
              <CalendarDays className="mr-2 h-4 w-4" />
              {t("calendar.edit_timetable")}
            </Button>
          </Link>
          <Button variant="outline" size="icon" onClick={() => changeWeek(-1)}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">{t("calendar.previous_week")}</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => changeWeek(1)}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">{t("calendar.next_week")}</span>
          </Button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-[min-content,repeat(7,1fr)] gap-2">
          <div className="col-span-1 w-14"></div>
          {weekDates.map((date, index) => (
            <div key={index} className="p-2 text-center font-semibold">
              {daysOfWeek[index]}
              <br />
              {date.getDate()}
            </div>
          ))}

          {/* All-day events section */}
          <div className="col-span-1 w-14 text-center text-sm font-semibold">
            {t("calendar.all_day")}
          </div>
          {weekDates.map((date, dateIndex) => (
            <div key={dateIndex} className="min-h-[100px] p-1">
              {getEventsForDate(date, true).map((event) => (
                <TooltipProvider key={event.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`bg-${event.color}-100 text-${event.color}-500 mb-1 truncate rounded p-1 text-xs`}
                      >
                        <div className="flex items-center font-semibold">
                          <Calendar className="mr-1 h-4 w-4" />
                          {event.title}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm">{event.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          ))}

          {/* Timetable events section */}
          <div className="col-span-8 grid grid-cols-[min-content,repeat(7,1fr)] gap-2">
            <div className="col-span-1 w-14">
              {hours.map((hour) => (
                <div key={hour} className="h-[100px] text-center text-sm">
                  {hour}:00
                </div>
              ))}
            </div>
            {weekDates.map((date, dateIndex) => {
              const holiday = isHoliday(date);

              return (
                <div key={dateIndex} className="relative col-span-1">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="h-[100px] border-t border-gray-200"
                    ></div>
                  ))}
                  {holiday ? (
                    <div
                      className={cn(
                        "justify-top absolute inset-0 flex flex-col items-center rounded-xl pt-32",
                        `bg-${holiday.color}-100 text-${holiday.color}-500`,
                      )}
                    >
                      {(() => {
                        const Icon = lucideIcons[
                          holiday.icon as keyof typeof lucideIcons
                        ] as LucideIcon;
                        return (
                          <>
                            <Icon className={`h-8 w-8`} />
                            <span
                              className={`mt-2 text-sm font-semibold text-${holiday.color}-700`}
                            >
                              {holiday.name}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    getEventsForDate(date, false).map((event) => {
                      const { top, height } = getEventPosition(event);

                      const SubjectIcon: LucideIcon | undefined = event.icon
                        ? (lucideIcons[
                            event.icon as keyof typeof lucideIcons
                          ] as LucideIcon)
                        : undefined;

                      if (!SubjectIcon) {
                        console.error(
                          `Icon "${event.icon}" not found in Lucide icons.`,
                        );
                        return null; // Skip rendering if icon not found
                      }

                      return (
                        <TooltipProvider key={event.title}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={`absolute left-0 right-0 bg-${event.color}-100 text-${event.color}-500 overflow-hidden truncate rounded p-1 text-xs ${height < 40 && "flex items-center space-x-2 px-1 py-0"}`}
                                style={{
                                  top: `${top}px`,
                                  height: `${height}px`,
                                }}
                              >
                                <div className="flex items-center font-semibold">
                                  <SubjectIcon className="mr-1 h-4 w-4" />
                                  {event.title}
                                </div>
                                <div className="text-xs">
                                  {`${String(event.start.getUTCHours()).padStart(2, "0")}:${String(event.start.getUTCMinutes()).padStart(2, "0")}`}{" "}
                                  -{" "}
                                  {`${String(event.end.getUTCHours()).padStart(2, "0")}:${String(event.end.getUTCMinutes()).padStart(2, "0")}`}
                                </div>
                                {event.room && (
                                  <div className="text-xs">
                                    Raum: {event.room}
                                  </div>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-semibold">{event.title}</p>
                              <p className="text-sm">{event.description}</p>
                              <p className="text-sm">
                                {`${String(event.start.getUTCHours()).padStart(2, "0")}:${String(event.start.getUTCMinutes()).padStart(2, "0")}`}{" "}
                                -{" "}
                                {`${String(event.end.getUTCHours()).padStart(2, "0")}:${String(event.end.getUTCMinutes()).padStart(2, "0")}`}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
