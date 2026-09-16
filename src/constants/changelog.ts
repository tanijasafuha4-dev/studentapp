import { ChangeType } from "@/components/site/changelog/changelog-item";

export interface ChangelogEntry {
  date: string;
  type: ChangeType;
  title: string;
  description: string;
}

export const changelog: ChangelogEntry[] = [
  {
    date: "16 September 2026",
    type: "new",
    title: "Localization, Personalization and Other Fixes by Kevin Shek",
    description:
      "Kevin Shek completed the localization, personalization, and various other bug fixes and improvements.",
  },
  {
    date: "January 12, 2025",
    type: "new",
    title: "The app is now ready for you!",
    description:
      "The app is now faster and more stable than ever! Plus, we have officially ended the public beta — from now on, everything is ready for you.",
  },
  {
    date: "December 28, 2024",
    type: "fix",
    title: "Fixed sidebar bug",
    description:
      "The subjects in the sidebar were no longer displaying properly — this issue has now been fixed.",
  },
  {
    date: "December 24, 2024",
    type: "fix",
    title: "Timetable display corrected",
    description:
      "Lessons in the timetable were displayed incorrectly and were always off by one hour. That is now fixed and working properly again!",
  },
  {
    date: "November 30, 2024",
    type: "new",
    title: "Support for Austria",
    description:
      "You can now select Austria as your country and use the Austrian grading system.",
  },
  {
    date: "November 30, 2024",
    type: "new",
    title: "Share subjects",
    description:
      "Easily share your subjects with friends — allowing you to quickly import and use them.",
  },
  {
    date: "November 24, 2024",
    type: "new",
    title: "Calculate overall average",
    description:
      "Your overall average is now displayed on the home page and the subjects page. With statistics enabled, you get even more insights into your grades.",
  },
  {
    date: "November 24, 2024",
    type: "new",
    title: "Upcoming exams at a glance",
    description:
      "Your upcoming exams are now displayed directly on the home page.",
  },
  {
    date: "November 24, 2024",
    type: "new",
    title: "More everyday convenience",
    description:
      "The subjects in the sidebar are now collapsed by default, showing only your favorites. Additionally, there are templates for common subjects, daily headers for homework, and a menu to share the app with friends.",
  },
  {
    date: "November 22, 2024",
    type: "new",
    title: "Exam statistics added",
    description:
      "You can now enable exam statistics in the settings, showing you grade trends, the number of grade types, and the average per type.",
  },
  {
    date: "November 21, 2024",
    type: "fix",
    title: "A few minor improvements",
    description:
      "An issue when editing the timetable that caused the app to crash has been fixed. Also, the coffee icon is now a tea icon (a highly requested update!). Onboarding has also been revised.",
  },
  {
    date: "November 20, 2024",
    type: "fix",
    title: "Public Beta optimizations",
    description:
      "A bug in grade calculation has been fixed, the calendar page is now in English, and editing exams works again. We also significantly improved the calendar loading time and added mobile settings as well as PWA support.",
  },
  {
    date: "November 18, 2024",
    type: "new",
    title: "Public Beta launched",
    description:
      "Studentapp is now available in public beta! Create school years, add subjects, manage exams and homework, and keep track of your timetable. Your grades are calculated automatically, and your daily schedule is visible right on the home page.",
  },
];
