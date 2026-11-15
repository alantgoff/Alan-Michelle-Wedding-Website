import type { Metadata } from "next";
import { PageHero } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { faqGroups } from "@/content/faq";

export const metadata: Metadata = { title: "Q&A" };

export default function Faq() {
  return (
    <>
      <PageHero
        kicker="Questions"
        title="Q&A"
        intro="The things people ask us most. If your question is not here, just ask — we would rather answer twice than have you guess."
        photo="faq"
        scene="faq"
      />
      <div className="faq">
        {faqGroups.map((group) => (
          <Reveal key={group.id}>
            <section className="faq-group" aria-labelledby={`faq-${group.id}`}>
              <h2 id={`faq-${group.id}`}>{group.title}</h2>
              <div className="faq-items">
                {group.items.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </>
  );
}
