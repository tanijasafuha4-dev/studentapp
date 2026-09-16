import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TermsPage() {
  return (
    <>
      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">
            Last updated: 12.01.2025
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="acceptance">
            <AccordionTrigger>Acceptance of Terms</AccordionTrigger>
            <AccordionContent>
              By accessing or using Studentapp, you agree to
              these Terms of Service. If you do not agree with any part of
              the terms, you may not use the service.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="description">
            <AccordionTrigger>Description of Service</AccordionTrigger>
            <AccordionContent>
              Studentapp is a web application that helps students manage
              their homework, exams, timetables, and related
              information. We reserve the right to modify or discontinue the service
              at any time without prior notice.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="disclaimer">
            <AccordionTrigger>Disclaimer</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                The service is provided &quot;as is&quot; and &quot;as
                available&quot; without warranty of any kind,
                including, but not limited to:
              </p>
              <ul className="list-disc pl-6">
                <li>Accuracy or reliability of information</li>
                <li>Uninterrupted access to the service</li>
                <li>Security of the service</li>
                <li>Fitness for a particular purpose</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="limitation">
            <AccordionTrigger>Limitation of Liability</AccordionTrigger>
            <AccordionContent>
              We shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of your use or inability to
              use the service. This includes loss of data,
              profits, or other intangible losses.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="user-obligations">
            <AccordionTrigger>User Obligations</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">You agree to:</p>
              <ul className="list-disc pl-6">
                <li>Provide accurate information</li>
                <li>Ensure the security of your account</li>
                <li>Not misuse the service</li>
                <li>Not violate any applicable laws</li>
                <li>Not disrupt the operation of the service</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="termination">
            <AccordionTrigger>Termination</AccordionTrigger>
            <AccordionContent>
              We may terminate or suspend your access to the service immediately, without prior
              notice or liability, for any reason whatsoever, including, without limitation, if you breach
              the Terms of Service.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="changes">
            <AccordionTrigger>Changes to Terms</AccordionTrigger>
            <AccordionContent>
              We reserve the right to modify or replace these terms at any time. For material changes, we will
              try to provide at least 30 days&apos; notice prior to any new
              terms taking effect.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact">
            <AccordionTrigger>Contact Information</AccordionTrigger>
            <AccordionContent>
              If you have any questions about these Terms of Service, please contact us
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
