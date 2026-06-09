export type ContributionLink = {
  label: string;
  href: string;
  type: "Issue" | "PR";
  status: string;
};

export type ContributionStory = {
  title: string;
  repo: string;
  category: "Issue → PR" | "Merged PR";
  problem: string;
  contribution: string;
  impact: string;
  links: ContributionLink[];
};

export const contributionStories: ContributionStory[] = [
  {
    title: "Modernized form validation guidance",
    repo: "TheOdinProject/curriculum",
    category: "Issue → PR",
    problem:
      "The curriculum taught :valid and :invalid patterns that could show validation styles before a learner interacted with a form.",
    contribution:
      "Opened the issue, then contributed updates that replaced the pattern with :user-valid and :user-invalid guidance across the lesson.",
    impact:
      "Helped learners build more accessible, user-friendly forms and connected documentation accuracy to the student project experience.",
    links: [
      {
        label: "Issue #30786",
        href: "https://github.com/TheOdinProject/curriculum/issues/30786",
        type: "Issue",
        status: "Closed · February 17, 2026",
      },
      {
        label: "PR #30815",
        href: "https://github.com/TheOdinProject/curriculum/pull/30815",
        type: "PR",
        status: "Merged · February 17, 2026",
      },
      {
        label: "PR #30994",
        href: "https://github.com/TheOdinProject/curriculum/pull/30994",
        type: "PR",
        status: "Merged · April 16, 2026",
      },
    ],
  },
  {
    title: "Clarified webpack Node.js version requirements",
    repo: "TheOdinProject/curriculum",
    category: "Issue → PR",
    problem:
      "Running npx webpack failed for learners on older Node.js versions because import.meta.dirname requires Node.js v20.11.0+.",
    contribution:
      "Reported the hidden version dependency and added the missing Node.js version requirement to the webpack documentation.",
    impact:
      "Reduced setup friction by making environment prerequisites explicit before learners hit confusing build errors.",
    links: [
      {
        label: "Issue #30901",
        href: "https://github.com/TheOdinProject/curriculum/issues/30901",
        type: "Issue",
        status: "Closed · March 12, 2026",
      },
      {
        label: "PR #30905",
        href: "https://github.com/TheOdinProject/curriculum/pull/30905",
        type: "PR",
        status: "Merged · March 12, 2026",
      },
    ],
  },
  {
    title: "Fixed Fetch documentation sequencing friction",
    repo: "TheOdinProject/curriculum",
    category: "Issue → PR",
    problem:
      "The Working with APIs lesson linked to MDN Fetch docs that used async/await syntax before learners had reached that lesson.",
    contribution:
      "Opened a sequencing issue and later removed the early documentation reference from the lesson.",
    impact:
      "Kept the learning path coherent so students were not forced to jump ahead into syntax they had not learned yet.",
    links: [
      {
        label: "Issue #31004",
        href: "https://github.com/TheOdinProject/curriculum/issues/31004",
        type: "Issue",
        status: "Closed · May 9, 2026",
      },
      {
        label: "PR #31104",
        href: "https://github.com/TheOdinProject/curriculum/pull/31104",
        type: "PR",
        status: "Merged · May 24, 2026",
      },
    ],
  },
  {
    title: "Maintained technical writing course resources",
    repo: "Technical-writing-mentorship-program/Technicalwritingcourse",
    category: "Issue → PR",
    problem:
      "The course had broken contribution links, an incorrect Google Analytics URL, and an unavailable portfolio resource.",
    contribution:
      "Reported the stale and broken resource issues, then contributed a maintenance PR that updated the tools page.",
    impact:
      "Improved credibility and reduced dead ends in a learning resource for technical writers and contributors.",
    links: [
      {
        label: "Issue #336",
        href: "https://github.com/Technical-writing-mentorship-program/Technicalwritingcourse/issues/336",
        type: "Issue",
        status: "Closed · March 10, 2026",
      },
      {
        label: "Issue #337",
        href: "https://github.com/Technical-writing-mentorship-program/Technicalwritingcourse/issues/337",
        type: "Issue",
        status: "Closed · March 11, 2026",
      },
      {
        label: "Issue #338",
        href: "https://github.com/Technical-writing-mentorship-program/Technicalwritingcourse/issues/338",
        type: "Issue",
        status: "Closed · March 11, 2026",
      },
      {
        label: "PR #339",
        href: "https://github.com/Technical-writing-mentorship-program/Technicalwritingcourse/pull/339",
        type: "PR",
        status: "Merged · March 11, 2026",
      },
    ],
  },
  {
    title: "Added Mermaid architecture diagrams",
    repo: "ritik4ever/stellar-goal-vault",
    category: "Merged PR",
    problem:
      "Developers needed a faster way to understand the project architecture before reading through implementation details.",
    contribution:
      "Added Mermaid architecture diagrams to the project documentation.",
    impact:
      "Reduced onboarding friction by turning system structure into a visual reference for new contributors and users.",
    links: [
      {
        label: "PR #416",
        href: "https://github.com/ritik4ever/stellar-goal-vault/pull/416",
        type: "PR",
        status: "Merged · June 3, 2026",
      },
    ],
  },
  {
    title: "Fixed Lace wallet configuration typo",
    repo: "midnightntwrk/midnight-docs",
    category: "Merged PR",
    problem:
      "A typo in setup documentation could interrupt a developer following Lace wallet configuration instructions.",
    contribution:
      "Contributed a focused documentation typo fix in the Midnight docs.",
    impact:
      "Improved precision in setup docs where small wording errors can block adoption and developer confidence.",
    links: [
      {
        label: "PR #868",
        href: "https://github.com/midnightntwrk/midnight-docs/pull/868",
        type: "PR",
        status: "Merged · April 28, 2026",
      },
    ],
  },
];
