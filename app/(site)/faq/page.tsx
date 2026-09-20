import { PageHero, Section } from "@/components/Page";
import { faqs } from "@/content/faq";

export default function Faq() {
  return (
    <>
      <PageHero
        kicker="Questions"
        title="Q&A"
        intro="The things people ask us most. If your question is not here, just ask — we would rather answer twice than have you guess."
        photo="faq"
      />
      <Section className="faq">
        {faqs.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </Section>
    </>
  );
}
