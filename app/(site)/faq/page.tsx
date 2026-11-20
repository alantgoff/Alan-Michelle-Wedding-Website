import type { Metadata } from "next";
import { PageHero } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { MoreLink } from "@/components/Guide";
import { JumpBar } from "@/components/JumpBar";
import { faqGroups, faqPage } from "@/content/faq";

export const metadata: Metadata = { title: faqPage.tab };

export default function Faq() {
  return (
    <>
      <PageHero
        kicker={faqPage.kicker}
        title={faqPage.title}
        intro={faqPage.intro}
        photo="faq"
        scene="faq"
      />
      <JumpBar items={faqGroups.map((g) => ({ id: g.id, label: g.title }))} label={faqPage.contents} />
      <div className="faq">
        {faqGroups.map((group) => (
          <Reveal key={group.id}>
            <section className="faq-group" id={group.id} aria-labelledby={`faq-${group.id}`}>
              <h2 id={`faq-${group.id}`}>{group.title}</h2>
              <div className="faq-items">
                {group.items.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                    {item.link ? <MoreLink href={item.link.href} label={item.link.label} /> : null}
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
