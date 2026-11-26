// Generates static OG preview cards (1200x675 PNG) with satori + sharp.
// Usage: npm run og
// Cards land in public/og/ and are referenced from page metadata.
// Article cards come from content/blog.json, so a new blog post gets a card
// on the next build without a change in this file.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import satori from "satori";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = path.join(root, "public", "og");

const BG = "#12110f";
const TEXT = "#eee8dd";
const MUTED = "#a39b91";
const GREEN = "#3ddc84";
const ACCENT = "#ff5a36";

const regular = await readFile("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf");
const bold = await readFile("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf");
const fonts = [
  { name: "DejaVu Sans", data: regular, weight: 400, style: "normal" },
  { name: "DejaVu Sans", data: bold, weight: 700, style: "normal" },
];

// Avatar resized once, embedded as data URI (satori has no file access).
const avatarSmall = await sharp(path.join(root, "images", "profile-iamge.jpeg"))
  .resize(360, 360, { fit: "cover" })
  .jpeg({ quality: 82 })
  .toBuffer();
const avatarUri = `data:image/jpeg;base64,${avatarSmall.toString("base64")}`;

const h = React.createElement;

function Shell({ children }) {
  return h(
    "div",
    {
      style: {
        width: 1200,
        height: 675,
        backgroundColor: BG,
        fontFamily: "DejaVu Sans",
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          paddingTop: 72,
          marginRight: 72,
          marginBottom: 64,
          marginLeft: 72,
        },
      },
      children,
    ),
  );
}

function StatusPill({ text }) {
  return h(
    "div",
    { style: { display: "flex", alignItems: "center" } },
    h("div", {
      style: { width: 18, height: 18, borderRadius: 9, backgroundColor: GREEN },
    }),
    h(
      "div",
      {
        style: {
          marginLeft: 16,
          fontSize: 26,
          letterSpacing: 6,
          color: MUTED,
        },
      },
      text,
    ),
  );
}

function Avatar({ size }) {
  return h("img", {
    src: avatarUri,
    width: size,
    height: size,
    style: { borderRadius: 36, border: `3px solid ${MUTED}` },
  });
}

async function render(element, outName) {
  const svg = await satori(element, { width: 1200, height: 675, fonts });
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, outName));
  console.log("wrote", outName);
}

function ProfileCard() {
  return h(
    Shell,
    null,
    h(
      "div",
      { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
      h(StatusPill, { text: "AVAILABLE FOR WORK" }),
      h(Avatar, { size: 200 }),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 72,
        },
      },
      h(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        h("div", { style: { fontSize: 64, fontWeight: 700, color: TEXT, lineHeight: 1.1 } }, "Abdulganiy Adeleke"),
        h("div", { style: { fontSize: 32, color: MUTED, marginTop: 12 } }, "Documentation Engineer"),
      ),
      h("div", { style: { fontSize: 26, color: MUTED } }, "0xdezman.cv"),
    ),
  );
}

function ArticleCard({ kicker, title, meta, titleSize = 56 }) {
  return h(
    Shell,
    null,
    h(
      "div",
      { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
      h(
        "div",
        { style: { display: "flex", alignItems: "center" } },
        h("div", { style: { width: 18, height: 18, borderRadius: 9, backgroundColor: ACCENT } }),
        h(
          "div",
          { style: { marginLeft: 16, fontSize: 26, letterSpacing: 6, color: MUTED } },
          kicker,
        ),
      ),
      h(Avatar, { size: 120 }),
    ),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", marginTop: 104 } },
      h(
        "div",
        { style: { fontSize: titleSize, fontWeight: 700, color: TEXT, lineHeight: 1.15 } },
        title,
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 28,
          },
        },
        h("div", { style: { fontSize: 24, color: MUTED } }, meta),
        h("div", { style: { fontSize: 28, color: MUTED } }, "0xdezman.cv"),
      ),
    ),
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

function slugFromHref(href) {
  return href.replace(/^\/blog\//, "").replace(/\/$/, "");
}

function titleSizeFor(title) {
  if (title.length > 70) {
    return 44;
  }
  if (title.length > 48) {
    return 50;
  }
  return 56;
}

const posts = JSON.parse(await readFile(path.join(root, "content", "blog.json"), "utf8"));
const internalPosts = posts.filter((post) => post.href.startsWith("/blog/"));

await mkdir(OUT, { recursive: true });
await render(h(ProfileCard, null), "profile.png");

for (const post of internalPosts) {
  await render(
    h(ArticleCard, {
      kicker: "BLOG",
      title: post.title,
      meta: `Abdulganiy Adeleke · ${formatDate(post.date)}`,
      titleSize: titleSizeFor(post.title),
    }),
    `${slugFromHref(post.href)}.png`,
  );
}

console.log(`wrote ${internalPosts.length} article cards from content/blog.json`);
