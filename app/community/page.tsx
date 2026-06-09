import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { EditorialMetric, EditorialPageHero, EditorialSectionTitle, EditorialTag } from "@/components/Editorial";
import eventRoomImage from "@/images/community/angelhack-web3-room.jpg";
import eventOnsiteImage from "@/images/community/angelhack-kodespot-onsite.jpg";
import eventSpeakerImage from "@/images/community/kodespot-speaker-proof.png";
import eventTeamImage from "@/images/community/kodespot-angelhack-team.jpg";
import eventFeedbackImage from "@/images/community/techie-soiree-feedback.jpg";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Impact and influence network for Abdulganiy Adeleke, including Kodespot education work and Techie Soiree community proof.",
};

const activityTypes = [
  {
    title: "Speaking & Thought Leadership",
    label: "Early-stage",
    detail: "Future talks, AMAs, panels, and recorded sessions will live here once there is public proof.",
    fields: [
      ["Current status", "Building toward stronger public speaking proof."],
      ["Evidence needed", "Recording, slide deck, event page, or recap thread."],
    ],
  },
  {
    title: "Education & Workshops",
    label: "Active",
    detail:
      "Co-founded Kodespot with friends as an undergraduate community for teaching fellow students fundamentals of DeFi and software development.",
    fields: [
      ["Audience", "Student developers and beginner Web2/Web3 builders."],
      ["Outcome", "Supported community-led onboarding through Kodespot and Techie Soiree."],
    ],
  },
  {
    title: "Ecosystem Building",
    label: "Active",
    detail:
      "Moderated the Kodespot community chat and helped handle the X account for developer-facing communication.",
    fields: [
      ["Role", "Community moderator and social/account support."],
      ["Focus", "Developer communication, event support, and community continuity."],
    ],
  },
];

const communityPresence = ["Kodespot", "AngelHack", "Web3 onboarding", "Developer education"];

const nextEvidence = [
  ["Speaking recordings", "Add recordings, event pages, or recap threads for talks and AMAs."],
  ["Workshop curriculum", "Link agendas, slides, or learning outcomes for education sessions."],
  ["Community outcomes", "Track post-event joins, feedback, follow-up messages, and shipped work."],
  ["Program proof", "Document ambassador, hackathon, or protocol advocacy work as it grows."],
];

const eventImages = [
  {
    alt: "Developers seated at Techie Soiree",
    caption: "Techie Soiree audience proof: developers gathered for a Web3 onboarding session.",
    image: eventRoomImage,
    lead: true,
  },
  {
    alt: "Abdulganiy at Techie Soiree",
    caption: "On-site coordination during Techie Soiree.",
    image: eventOnsiteImage,
    lead: false,
  },
  {
    alt: "Abdulganiy with a speaker at Techie Soiree",
    caption: "Speaker and community proof from the Techie Soiree environment.",
    image: eventSpeakerImage,
    lead: false,
  },
  {
    alt: "Kodespot and AngelHack team photo at Techie Soiree",
    caption: "Kodespot × AngelHack community presence and event coordination proof.",
    image: eventTeamImage,
    lead: false,
  },
];

export default function CommunityPage() {
  return (
    <main className="editorial-shell py-16">
      <EditorialPageHero
        description="Community work rooted in teaching, onboarding, moderation, and helping developers find their footing across Web2 and Web3."
        eyebrow="Impact & Influence Network"
        index="04"
        meta={
          <div className="grid border-2 border-[var(--rule)] md:grid-cols-4">
            <EditorialMetric label="Events" value="1+" />
            <EditorialMetric label="Reach" value="200+" />
            <EditorialMetric label="Communities" value="Kodespot" />
            <EditorialMetric label="Ecosystems" value="Web2/Web3" />
          </div>
        }
        title="Community"
      />

      <section className="mt-14">
        <EditorialSectionTitle index="01" title="Activity Types" />
        <div className="grid border-2 border-[var(--rule)] md:grid-cols-3">
          {activityTypes.map((item) => (
            <article className="border-[var(--rule)] p-8 md:border-l md:first:border-l-0" key={item.title}>
              <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                {item.label}
              </p>
              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[var(--text)]">{item.title}</h2>
              <p className="mt-5 leading-7 text-[var(--muted)]">{item.detail}</p>
              <dl className="mt-8 grid gap-4 border-t-2 border-[var(--rule)] pt-5">
                {item.fields.map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm font-bold leading-6 text-[var(--text)]">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t-[3px] border-[var(--rule)] pt-12">
        <EditorialSectionTitle index="02" title="Featured Moment" />
        <div className="grid border-2 border-[var(--rule)] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-[var(--rule)] p-8 lg:border-r-2">
            <EditorialTag>Kodespot × AngelHack</EditorialTag>
            <h2 className="mt-6 text-3xl font-black tracking-[-0.05em] text-[var(--text)]">
              Techie Soiree
            </h2>
            <dl className="mt-7 grid gap-5 border-y-2 border-[var(--rule)] py-6">
              {[
                ["Role", "Co-organizer"],
                ["Date", "July 2024"],
                ["Audience", "Beginner developers entering Web3"],
                [
                  "Taught / Goal",
                  "Onboarded new developers into the Web3 ecosystem through community-led education and event support.",
                ],
                ["Outcome", "200+ individuals in attendance"],
                [
                  "What happened after",
                  "Attendee feedback described the event as an amazing experience and praised the team for the execution.",
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-bold leading-6 text-[var(--text)]">{value}</dd>
                </div>
              ))}
            </dl>
            <a
              className="link-ring mt-8 inline-flex items-center gap-2 font-mono text-xs font-black text-[var(--accent)]"
              href="https://x.com/kodespot/status/1809987698209206438?s=20"
              rel="noreferrer"
              target="_blank"
            >
              View Kodespot proof <ArrowUpRight size={14} />
            </a>
            <a
              className="link-ring ml-0 mt-4 inline-flex items-center gap-2 font-mono text-xs font-black text-[var(--accent)] sm:ml-4 sm:mt-8"
              href="https://x.com/kodespot/status/1809991403457404983?s=20"
              rel="noreferrer"
              target="_blank"
            >
              View feedback posts <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="grid md:grid-cols-2">
            {eventImages.map((item) => (
              <figure
                className={`border-[var(--rule)] md:border-l md:first:border-l-0 ${
                  item.lead ? "md:col-span-2" : ""
                }`}
                key={item.caption}
              >
                <div className={`relative border-b-2 border-[var(--rule)] ${item.lead ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image
                    alt={item.alt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    src={item.image}
                  />
                </div>
                <figcaption className="p-5 font-mono text-[0.65rem] font-black uppercase leading-5 tracking-[0.14em] text-[var(--muted)]">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 grid border-2 border-[var(--rule)] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-[var(--rule)] p-8 lg:border-r-2">
            <EditorialTag>Attendee feedback</EditorialTag>
            <h3 className="mt-6 text-2xl font-black tracking-[-0.04em] text-[var(--text)]">
              The event created visible attendee enthusiasm.
            </h3>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Feedback proof helps show the community work moved beyond attendance into a positive
              participant experience.
            </p>
          </div>
          <figure>
            <div className="relative aspect-[1170/484] border-b-2 border-[var(--rule)] lg:border-b-0">
              <Image
                alt="Attendee feedback after Techie Soiree"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                src={eventFeedbackImage}
              />
            </div>
            <figcaption className="border-t-2 border-[var(--rule)] p-5 font-mono text-[0.65rem] font-black uppercase leading-5 tracking-[0.14em] text-[var(--muted)] lg:border-t-0">
              Screenshot of attendee feedback after Techie Soiree.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mt-16 border-t-[3px] border-[var(--rule)] pt-12">
        <EditorialSectionTitle index="03" title="Community Presence" />
        <div className="grid border-2 border-[var(--rule)] md:grid-cols-4">
          {communityPresence.map((item) => (
            <div className="border-[var(--rule)] p-6 md:border-l md:first:border-l-0" key={item}>
              <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--text)]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t-[3px] border-[var(--rule)] pt-12">
        <EditorialSectionTitle index="04" title="Next Evidence To Add" />
        <div className="grid border-2 border-[var(--rule)] md:grid-cols-4">
          {nextEvidence.map(([title, description]) => (
            <article className="border-[var(--rule)] p-6 md:border-l md:first:border-l-0" key={title}>
              <h2 className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--text)]">{title}</h2>
              <p className="mt-5 text-sm leading-6 text-[var(--muted)]">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
