"use client";

import { Button } from "@/components/ui/button";
import {
  SkipForward,
  ArrowRight,
  BookOpen,
  BookCheck,
  Calendar,
  GraduationCap,
  Monitor,
  CalendarClock,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/app/actions/onboarding";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";

export default function OnboardingPage() {
  const { t } = useTranslation();
  const ONBOARDING_STEPS = [
    {
      title: t("onboarding.welcome.title"),
      description: t("onboarding.welcome.description"),
      image:
        "/public/引导-1.jpg",
      icon: BookOpen,
      iconColor: "bg-blue-100 text-blue-500",
    },
    {
      title: t("onboarding.subjects.title"),
      description: t("onboarding.subjects.description"),
      image:
        "/public/引导-2.jpg",
      icon: GraduationCap,
      iconColor: "bg-green-100 text-green-500",
    },
    {
      title: t("onboarding.homework.title"),
      description: t("onboarding.homework.description"),
      image:
        "/public/引导-3.jpg",
      icon: BookCheck,
      iconColor: "bg-purple-100 text-purple-500",
    },
    {
      title: t("onboarding.schedule.title"),
      description: t("onboarding.schedule.description"),
      image:
        "/public/引导-4.jpg",
      icon: Calendar,
      iconColor: "bg-orange-100 text-orange-500",
    },
    {
      title: t("onboarding.exams.title"),
      description: t("onboarding.exams.description"),
      image:
        "/public/引导-5.jpg",
      icon: CalendarClock,
      iconColor: "bg-emerald-100 text-emerald-500",
    },
    {
      title: t("onboarding.devices.title"),
      description: t("onboarding.devices.description"),
      image:
        "/public/引导-6.jpg",
      icon: Monitor,
      iconColor: "bg-indigo-100 text-indigo-500",
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();
  const step = ONBOARDING_STEPS[currentStep];
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleComplete = async () => {
    await completeOnboarding();
    router.push("/home");
  };

  const handleNext = () => {
    if (currentStep === ONBOARDING_STEPS.length - 1) {
      handleComplete();
    } else {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <motion.button
        onClick={handleComplete}
        className="fixed right-4 top-4 z-50 rounded-full bg-background p-2 hover:bg-gray-100 dark:hover:bg-gray-800 sm:right-6 sm:top-6 sm:p-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SkipForward className="h-5 w-5 sm:h-6 sm:w-6" />
      </motion.button>

      <div className="flex min-h-screen flex-col justify-center space-y-6 p-6 sm:hidden">
        <div className="mt-12 text-center">
          <h1 className="text-2xl font-bold">
            {t("onboarding.welcome.title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("onboarding.welcome.description")}
          </p>
        </div>

        <div className="mt-10 flex flex-1 flex-col space-y-6">
          {ONBOARDING_STEPS.slice(1).map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className={`rounded-full p-2 ${step.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-semibold">{step.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Button onClick={handleComplete} className="w-full">
          {t("onboarding.get_started")}
        </Button>
      </div>

      <div className="relative mx-auto hidden w-full max-w-[1400px] flex-1 flex-col justify-center px-4 py-6 sm:flex sm:px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex flex-col"
            onViewportEnter={() => setImageLoaded(false)}
          >
            <div className="mb-6 text-center sm:mb-8">
              <motion.h1
                className="text-2xl font-bold sm:text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {step.title}
              </motion.h1>
              <motion.p
                className="mt-2 text-sm text-muted-foreground sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {step.description}
              </motion.p>
            </div>

            <div className="relative mx-auto w-full px-4 py-2 sm:px-8 sm:py-4">
              <motion.div
                className="relative aspect-[16/9] w-full"
                initial={false}
                animate={
                  imageLoaded
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  priority
                  className="rounded-xl bg-background object-contain"
                  onLoadingComplete={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between gap-2 sm:mt-8 sm:gap-4">
          <div></div>
          <div className="flex gap-1.5 sm:gap-2">
            {ONBOARDING_STEPS.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 ${
                  index === currentStep
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
                initial={false}
                animate={{
                  scale: index === currentStep ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleNext}
              className="flex items-center gap-1 px-3 sm:gap-2 sm:px-4"
              size="sm"
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? (
                t("onboarding.get_started")
              ) : (
                <>
                  <span className="hidden sm:inline">
                    {t("onboarding.next")}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
