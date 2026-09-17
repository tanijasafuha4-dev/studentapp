import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartNoAxesGantt,
  Check,
  Clock,
  GalleryVerticalEnd,
  Goal,
  Smile,
} from "lucide-react";
import { TrendingUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialSection />
        <PricingSection />
        <OpenSourceSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="container">
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-24">
        <div className="space-y-8 text-center">
          <Badge className="bg-indigo-100 text-sm text-indigo-500 hover:bg-indigo-100 hover:text-indigo-500">
            Now Available!
          </Badge>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Your studies, <span className="text-indigo-500">perfectly</span>{" "}
            organized
          </h1>

          <h2 className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Plan your schedule, track your grades, and never forget an exam or assignment again - everything in one app.
          </h2>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/login">Get started for free</Link>
            </Button>
            <Button size="lg" variant="outline" className="hidden">
              {" "}
              {/* HIDDEN UNTIL WE HAVE A DEMO */}
              View demo
            </Button>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/图1.jpg"
              alt="Studentapp on iPhone and iPad"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Subjects",
      description:
        "Organize your subjects clearly so you always have everything important at your fingertips.",
      image:
        "/图2.jpg",
    },
    {
      title: "Exams",
      description:
        "Plan your tests and exams, track your grades, and keep your goals in sight.",
      image:
        "/图3.jpg",
    },
    {
      title: "Assignments",
      description:
        "Enter your homework and never miss a deadline again – simple and stress-free.",
      image:
        "/图4.jpg",
    },
    {
      title: "Schedule",
      description:
        "Create and manage your schedule so you always know what is coming up next.",
      image:
        "/图5.jpg",
    },
  ];

  return (
    <section className="container space-y-24 py-24">
      {features.map((feature, index) => (
        <div key={index} className="space-y-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {feature.title}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {feature.description}
            </p>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: "Better Overview",
      description:
        "Keep track of assignments, exams, and grades at all times.",
      icon: ChartNoAxesGantt,
      color: "sky",
    },
    {
      title: "Less Stress",
      description: "Organize your daily student life without overwhelming yourself.",
      icon: Smile,
      color: "emerald",
    },
    {
      title: "More Time",
      description:
        "Plan everything in one place and save time searching and overthinking.",
      icon: Clock,
      color: "indigo",
    },
    {
      title: "Better Grades",
      description:
        "Never miss deadlines or exams and always be well-prepared.",
      icon: Goal,
      color: "amber",
    },
    {
      title: "Easy to Start",
      description:
        "No complicated features – the app is fast and easy to use.",
      icon: TrendingUp,
      color: "sky",
    },
    {
      title: "Everything Included",
      description:
        "Whether it is your schedule, assignments, or grades – you have everything in one app.",
      icon: GalleryVerticalEnd,
      color: "rose",
    },
  ];

  return (
    <section className="container py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Your Benefits
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-${benefit.color}-100`}
                >
                  <Icon className={`h-6 w-6 text-${benefit.color}-500`} />
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      name: "Jakob G.",
      role: "Student",
      content:
        "I've been an enthusiastic user since the beta and am very excited for what's to come.",
      avatar: "JG",
      color: "orange",
    },
    {
      name: "Johannes S.",
      role: "Developer & Student",
      content:
        "I developed Studentapp to improve my own school organization. I hope other students will benefit from it too.",
      avatar: "JS",
      color: "indigo",
    },
  ];

  return (
    <section className="container relative py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        What other students are saying
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-${testimonial.color}-100 text-lg font-semibold text-${testimonial.color}-500`}
              >
                {testimonial.avatar}
              </div>
              <div>
                <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg italic text-muted-foreground">
                &quot;{testimonial.content}&quot;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Everything included – and it's free
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Use all features of the app without restrictions, completely free of charge.
        </p>
      </div>
      <div className="mx-auto mt-12 flex justify-center">
        <Card className="relative w-full max-w-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <div className="mt-4 text-4xl font-bold">$0</div>
            <p className="text-sm text-muted-foreground">Free forever</p>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="h-6 w-6 text-indigo-500" />
                <span className="text-lg">All app features</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-6 w-6 text-indigo-500" />
                <span className="text-lg">No ads</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-6 w-6 text-indigo-500" />
                <span className="text-lg">Free forever</span>
              </div>
            </div>
            <Button size="lg" className="mt-4 w-full" asChild>
              <Link href="/login">Get started for free</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function OpenSourceSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Open Source & Transparent
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Studentapp is completely open source. The entire codebase is available on GitHub – for maximum transparency and security.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link
              href="https://github.com/johannesschiessl/Studentapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/github.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
              View on GitHub
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          You can view the code, suggest improvements, or even contribute to the development yourself.
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Is the app really free?",
      answer:
        "Yes, the app is completely free and includes all the features you need. There are no hidden costs or subscriptions.",
    },
    {
      question: "Are there ads in the app?",
      answer:
        "No, no annoying ads – at most a small tip about another app that might also be useful to you 😉.",
    },
    {
      question: "Who is Studentapp suitable for?",
      answer:
        "Studentapp is designed for students across all educational levels, including high schools, colleges, and universities.",
    },
    {
      question: "Which grading systems are supported?",
      answer:
        "Currently, we support standard grading systems as well as point-based systems. We are continuously adding support for more regional formats.",
    },
    {
      question: "Are holidays and vacations taken into account?",
      answer:
        "Yes, we support standard academic and holiday calendars to ensure your schedule stays accurate year-round.",
    },
    {
      question: "Can I use the app on multiple devices?",
      answer:
        "Yes, you can log into your account on different devices and access your data from anywhere.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Studentapp is a Progressive Web App (PWA) that you can install and use on your smartphone just like a native app. It works beautifully on all modern smartphones and tablets. To install it, open Studentapp in your browser and tap 'Add to Home Screen' (iOS) or 'Install' (Android).",
    },
  ];

  return (
    <section className="container py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Your student life, simply organized
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Start using Studentapp now and get your assignments, exams, and schedule under control.
        </p>
        <Button size="lg" asChild>
          <Link href="/login">Get started for free</Link>
        </Button>
      </div>
    </section>
  );
}
