export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  caption: string;
  href: string;
  relatedLabel: string;
  relatedMeta: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "rushikesh-bobade",
    role: "Owner",
    quote:
      "This is incredibly thorough! Using an OpenAPI generator to build out the API.md was a brilliant approach. It hits every single requirement and looks incredibly professional.",
    caption: "Built API.md from an OpenAPI generator — PR #145 merged into main, 6 checks passed.",
    href: "/portfolio#rushikesh-bobade-empay-hrms",
    relatedLabel: "EmPay HRMS API documentation",
    relatedMeta: "OpenAPI 3.1 specification · Merged",
  },
  {
    name: "mao-sz",
    role: "Contributor",
    quote: "Nice catch.",
    caption: "Caught a CSS pseudo-class bug in the form validation lesson — PR #30994 merged into main, 3 checks passed.",
    href: "/portfolio#theodinproject-curriculum",
    relatedLabel: "The Odin Project curriculum",
    relatedMeta: "Form validation lesson · Merged",
  },
  {
    name: "jonathanprozzi",
    role: "Member",
    quote: "Great updates! Thank you for the fixes. I appreciate your patience!",
    caption:
      "Audited the Intuition docs against the live product and fixed the inconsistencies — PRs merged into main, 4 checks passed.",
    href: "/portfolio#0xintuition-intuition-docs",
    relatedLabel: "Intuition developer docs",
    relatedMeta: "Documentation audit · Merged",
  },
  {
    name: "Nickyshe",
    role: "Collaborator",
    quote: "Good work spotting those issues.",
    caption:
      "Reported broken links and an inaccurate Google Analytics URL in the course tools page — PR #339 merged, March 11, 2026.",
    href: "https://github.com/Technical-writing-mentorship-program/Technicalwritingcourse/pull/339",
    relatedLabel: "Technical Writing Mentorship Program",
    relatedMeta: "Course tools page · Merged",
  },
];
