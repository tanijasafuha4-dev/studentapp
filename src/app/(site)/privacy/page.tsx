import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPage() {
  return (
    <>
      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">
            Last updated: 12.01.2025
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="overview">
            <AccordionTrigger>Overview</AccordionTrigger>
            <AccordionContent>
              This Privacy Policy explains how Studentapp
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, and protects your
              personal data. By using our service, you agree to the collection and use
              of information in accordance with this policy.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-collection">
            <AccordionTrigger>Information We Collect</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                We collect and store the following types of information:
              </p>
              <ul className="list-disc pl-6">
                <li>Account information (email, name)</li>
                <li>School year data and academic information</li>
                <li>Timetable and schedule information</li>
                <li>User preferences</li>
                <li>Usage data and analytics</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-storage">
            <AccordionTrigger>
              Data Storage and Processing
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                We use the following services to store and process
                your data:
              </p>
              <ul className="list-disc pl-6">
                <li>Supabase for database hosting and authentication</li>
                <li>Vercel for application hosting and deployment</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cookies">
            <AccordionTrigger>Cookies and Tracking</AccordionTrigger>
            <AccordionContent>
              We use cookies and similar tracking technologies to
              track activity on our service and hold certain
              information. Cookies are files with a small amount of
              data which may include an anonymous unique identifier.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-security">
            <AccordionTrigger>Data Security</AccordionTrigger>
            <AccordionContent>
              We implement reasonable security measures to protect against unauthorized
              access, alteration, disclosure, or destruction of your personal
              data. However, no method of transmission over
              the Internet is 100% secure.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-rights">
            <AccordionTrigger>Your Privacy Rights</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data</li>
                <li>Export your data</li>
                <li>Withdraw your consent</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="analytics">
            <AccordionTrigger>Analytics and Tracking</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                We use Posthog for analytics purposes. This means:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  Anonymized collection of usage statistics (e.g., visited
                  pages, time spent)
                </li>
                <li>Analysis of feature usage to improve the app</li>
                <li>No personal tracking of individual users</li>
                <li>Opting out is only possible by not using the app.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact">
            <AccordionTrigger>Contact Information</AccordionTrigger>
            <AccordionContent>
              If you have any questions about this Privacy Policy, please contact us
              at:{" "}
              <a
                href="mailto:contact.johannes@icloud.com"
                className="text-primary hover:underline"
              >
                contact.johannes@icloud.com
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
