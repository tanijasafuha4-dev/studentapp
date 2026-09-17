"use client";

import React, { useState, useMemo } from "react";
import {
  CalendarDays,
  FolderClosed,
  FolderOpen,
  House,
  ListChecks,
  PanelLeftClose,
  ChevronDown,
  Plus,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import * as lucideIcons from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Subject } from "@/types/subjects";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/use-translation";
import { useSidebar } from "@/contexts/sidebar-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toggleSubjectFavorite } from "@/app/actions/subjects";

type SortedSubjects = {
  initialSubjects: Subject[];
  remainingSubjects: Subject[];
  hasMore: boolean;
};

export function SidebarContent({ subjects }: { subjects: Subject[] }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { isOpen: isSidebarOpen, toggleSidebar } = useSidebar();
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  const navItems = [
    { name: t("home"), icon: House, href: "/home" },
    { name: t("calendar"), icon: CalendarDays, href: "/calendar" },
    { name: t("subjects"), icon: FolderOpen, href: "/subjects" },
    { name: t("homeworks"), icon: ListChecks, href: "/homework" },
    { name: t("Profile"), href: "/profile", icon: User },
  ];

  const sortedAndFilteredSubjects = useMemo((): SortedSubjects => {
    const sorted = [...subjects].sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return a.name.localeCompare(b.name);
    });

    const hasFavorites = sorted.some((subject) => subject.favorite);

    if (hasFavorites) {
      const favorites = sorted.filter((subject) => subject.favorite);
      const nonFavorites = sorted.filter((subject) => !subject.favorite);

      return {
        initialSubjects: favorites,
        remainingSubjects: showAllSubjects ? nonFavorites : [],
        hasMore: nonFavorites.length > 0,
      };
    } else {
      return {
        initialSubjects: sorted.slice(0, 5),
        remainingSubjects: showAllSubjects ? sorted.slice(5) : [],
        hasMore: sorted.length > 5,
      };
    }
  }, [subjects, showAllSubjects]);

  return (
    <div
      className={`transition-width hidden overflow-hidden duration-300 ease-in-out sm:flex ${
        isSidebarOpen ? "w-64" : "w-0"
      }`}
      style={{ willChange: "width" }}
    >
      <section
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-neutral-50 px-4 py-4 transition-transform duration-300 ease-in-out dark:bg-neutral-900 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <ScrollArea className="h-full w-full">
          <div className="fixed left-0 top-0 mb-4 flex w-full items-center justify-between bg-neutral-50 p-4 dark:bg-neutral-900">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={toggleSidebar}
                    variant="ghost"
                    size="icon"
                    className="rounded-[1rem] text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    aria-label={
                      isSidebarOpen ? t("close_sidebar") : t("open_sidebar")
                    }
                  >
                    <PanelLeftClose />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("sidebar.close")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mb-4 mt-16">
            <nav aria-label={t("main_navigation")}>
              {navItems.map((item) => (
                <NavItem key={item.name} item={item} pathname={pathname} />
              ))}
            </nav>
          </div>

          <Separator />

          <div className="my-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                {t("subjects")}
              </h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/subjects/new">
                      <Button
                        variant="ghost"
                        className="rounded-[1rem] text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        size="icon"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("subjects.add")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {subjects.length > 0 ? (
              <>
                <motion.div
                  initial={false}
                  animate={{ height: "auto" }}
                  className="overflow-hidden"
                >
                  <ul className="relative mt-2 space-y-1">
                    {sortedAndFilteredSubjects.initialSubjects.map(
                      (subject) => (
                        <motion.li
                          key={subject.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            layout: {
                              type: "spring",
                              bounce: 0.15,
                              duration: 0.4,
                            },
                            opacity: { duration: 0.15 },
                            scale: { duration: 0.15 },
                          }}
                        >
                          <SubjectListItem
                            subject={subject}
                            pathname={pathname}
                          />
                        </motion.li>
                      ),
                    )}

                    <AnimatePresence initial={false}>
                      {sortedAndFilteredSubjects.remainingSubjects.map(
                        (subject: Subject) => (
                          <motion.li
                            key={subject.id}
                            layout="position"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              type: "spring",
                              bounce: 0.15,
                              duration: 0.4,
                            }}
                          >
                            <SubjectListItem
                              subject={subject}
                              pathname={pathname}
                            />
                          </motion.li>
                        ),
                      )}
                    </AnimatePresence>
                  </ul>
                </motion.div>
                {sortedAndFilteredSubjects.hasMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Button
                      variant="ghost"
                      className="mt-2 w-full justify-between rounded-[1rem] text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                      onClick={() => setShowAllSubjects(!showAllSubjects)}
                    >
                      <span>
                        {showAllSubjects
                          ? t("subjects.show_less")
                          : t("subjects.show_all_subjects")}
                      </span>
                      <motion.div
                        initial={false}
                        animate={{ rotate: showAllSubjects ? 180 : 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">
                {t("no_subjects")}
              </p>
            )}
          </div>
        </ScrollArea>
      </section>
    </div>
  );
}

type NavItemProps = {
  item: {
    name: string;
    icon: LucideIcon;
    href: string;
  };
  pathname: string;
};

function NavItem({ item, pathname }: NavItemProps) {
  const Icon = item.icon;
  const isActive = pathname === item.href;

  return (
    <Link href={item.href} passHref>
      <span
        className={`mb-2 flex w-full items-center rounded-[1rem] px-4 py-2 transition-all duration-200 ease-in-out ${
          isActive
            ? "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
            : "text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-700"
        }`}
      >
        <Icon className="mr-2.5 h-5 w-5" aria-hidden="true" />
        {item.name}
      </span>
    </Link>
  );
}

function SubjectListItem({
  subject,
  pathname,
}: {
  subject: Subject;
  pathname: string;
}) {
  const [isFavorite, setIsFavorite] = useState(subject.favorite);
  const [isHovered, setIsHovered] = useState(false);
  const SubjectIcon: LucideIcon =
    (subject.icon &&
      (lucideIcons[subject.icon as keyof typeof lucideIcons] as LucideIcon)) ||
    FolderClosed;
  const isActive = pathname === `/subjects/${subject.id}`;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await toggleSubjectFavorite(subject.id, !isFavorite);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <motion.div layout>
      <Link href={`/subjects/${subject.id}`} passHref>
        <span
          className={`relative flex items-center rounded-[1rem] px-4 py-2 text-neutral-700 transition-all duration-200 ease-in-out hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-700 ${
            isActive ? "bg-neutral-200 dark:bg-neutral-700" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={clsx(
              "mr-2.5 rounded-xl p-2",
              `bg-${subject.color}-100`,
              `text-${subject.color}-500`,
            )}
          >
            <SubjectIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="flex-1">{subject.name}</span>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "ml-2 h-6 w-6 transition-colors duration-200",
              // Show on touch devices (tablets)
              "sm:pointer-events-none sm:opacity-0",
              // Show on hover or if favorite
              (isHovered || isFavorite) &&
                "sm:pointer-events-auto sm:opacity-100",
              // Color states
              isFavorite ? "text-yellow-500" : "text-muted-foreground",
              // Always show on touch devices
              "@media (hover: none) { } pointer-events-auto opacity-100",
            )}
            onClick={handleToggleFavorite}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isFavorite ? "star-filled" : "star-empty"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Star className="h-4 w-4" aria-hidden="true" />
              </motion.div>
            </AnimatePresence>
          </Button>
        </span>
      </Link>
    </motion.div>
  );
}
