# BOT Chain Developer Documentation Audit

**Prepared for:** BOT Chain Builder Challenge — Documentation / PR track  
**Documentation reviewed:** [BOT Chain developer documentation](https://dev-docs.botchain.ai/docs/Developers/)  
**Date verified:** July 8, 2026  
**Submission status:** Submitted; bounty results have not yet been announced.

## Executive summary

The bounty required participants to submit one documentation bug. I expanded
the assignment into a broader developer-journey audit and documented 11
findings across five areas of the BOT Chain documentation.

The review identified broken navigation, incomplete content, contradictory
onboarding instructions, and technical examples that could cause an
integration to fail. The most consequential findings affect the EOA
Paymaster flow, testnet onboarding, and access to mainnet event logs.

| Severity | Findings | Developer impact |
|---|---:|---|
| Medium | 6 | Can block onboarding or cause integrations to fail |
| Low-medium | 2 | Creates ambiguity or incomplete product guidance |
| Low | 2 | Reduces documentation accuracy and trust |
| Needs confirmation | 1 | Potential data inconsistency requiring team validation |

## Key findings

- The Paymaster workflow names a non-existent RPC method instead of
  `pm_isSponsorable`.
- The primary `pm_isSponsorable` request example is not valid JSON.
- Two official pages provide conflicting instructions for acquiring testnet
  tokens.
- The Node Types page sends developers to non-existent documentation pages.

## Audit approach

- Followed core developer journeys for network setup, node operation,
  testnet funding, RPC usage, and gasless transactions.
- Tested internal navigation and verified the destination of referenced URLs.
- Compared related pages for terminology, endpoint, and workflow consistency.
- Inspected code and JSON examples for copy-paste usability and correctness.
- Separated confirmed documentation defects from observations that require
  confirmation by the BOT Chain team.

All findings were reproduced through direct inspection of the live site on
the verification date above. The audit assesses documentation quality and
does not evaluate the underlying BOT Chain protocol.

---

## Medium — Broken internal navigation links on the Node Types page

**Issue title:** Node Types page links to non-existent `ctc-*` pages (404)

**Description:**
The sidebar and previous/next navigation on the Node Types page point to
non-existent `ctc-*` URL slugs instead of the available BOT Chain pages.

**Steps to reproduce:**
1. Visit [https://dev-docs.botchain.ai/docs/Developers/node-types/](https://dev-docs.botchain.ai/docs/Developers/node-types/)
2. Note the sidebar/navigation links to:
   - `claim-test-tctc-tokens`
   - `ctc-chain-node-configuration-best-practices`
3. Visit [https://dev-docs.botchain.ai/docs/Developers/claim-test-tctc-tokens/](https://dev-docs.botchain.ai/docs/Developers/claim-test-tctc-tokens/)
   directly — the page does not exist; the site falls back to a bare shell
   with no content.

**Scope of impact:** Medium severity, high visibility — every visitor to the
Node Types page sees at least one dead link. Confusing for new developers
trying to navigate the docs sequentially.

**Evidence:**
- Broken link source: [https://dev-docs.botchain.ai/docs/Developers/node-types/](https://dev-docs.botchain.ai/docs/Developers/node-types/)
- Confirmed 404 target: [https://dev-docs.botchain.ai/docs/Developers/claim-test-tctc-tokens/](https://dev-docs.botchain.ai/docs/Developers/claim-test-tctc-tokens/)
- Correct target should be: [https://dev-docs.botchain.ai/docs/Developers/claim-test-tbot-tokens/](https://dev-docs.botchain.ai/docs/Developers/claim-test-tbot-tokens/)
- Correct target for the second broken link should be:
  [https://dev-docs.botchain.ai/docs/Developers/bot-chain-node-configuration-best-practices/](https://dev-docs.botchain.ai/docs/Developers/bot-chain-node-configuration-best-practices/)

**Proposed solution:** Update the two navigation links on the Node Types
page from `claim-test-tctc-tokens` → `claim-test-tbot-tokens` and
`ctc-chain-node-configuration-best-practices` →
`bot-chain-node-configuration-best-practices`.

---

## Low — Unfilled editorial placeholder on the Node Configuration page

**Issue title:** Literal "(An external link to our repository is required
here.)" placeholder shipped in published docs

**Description:**
The Archive Node section of the Node Configuration Best Practices page
contains an internal editorial note that was never replaced with the
actual link it's asking for.

**Steps to reproduce:**
1. Visit [https://dev-docs.botchain.ai/docs/Developers/bot-chain-node-configuration-best-practices/](https://dev-docs.botchain.ai/docs/Developers/bot-chain-node-configuration-best-practices/)
2. Find the Archive Node section
3. Read: *"Detailed instructions are available at BOT Chain GitHub
   repository.（An external link to our repository is required here.）"*

**Scope of impact:** Low severity, but it's a visible authoring artifact
that undermines trust in the docs and leaves node operators without the
"detailed instructions" the sentence promises.

**Evidence:**
- Source: [https://dev-docs.botchain.ai/docs/Developers/bot-chain-node-configuration-best-practices/](https://dev-docs.botchain.ai/docs/Developers/bot-chain-node-configuration-best-practices/), Archive Node section.

**Proposed solution:** Replace the placeholder parenthetical with the real
link to the relevant GitHub repository/instructions.

---

## Medium — Unverified disk-size guidance on the Node Types page

**Issue title:** Prune State disk size given as an admitted placeholder
("the latest number needs to be updated")

**Description:**
The Prune State section on the Node Types page gives a figure for pruned
node disk usage but explicitly flags itself as outdated in the same
sentence, i.e. the note-to-self was published instead of the actual
current number.

**Steps to reproduce:**
1. Visit [https://dev-docs.botchain.ai/docs/Developers/node-types/](https://dev-docs.botchain.ai/docs/Developers/node-types/)
2. Find the Prune State section
3. Read: *"...previously it was 1.5TB, which is an experimental value, the
   latest number needs to be updated"*

**Scope of impact:** Medium — node operators sizing storage for a pruned
node are working from a number the docs themselves say is wrong/stale.

**Evidence:**
- Source: [https://dev-docs.botchain.ai/docs/Developers/node-types/](https://dev-docs.botchain.ai/docs/Developers/node-types/), Prune State section.

**Proposed solution:** Replace with a current, verified disk-size figure
for a pruned node, or remove the specific number until one is confirmed.

---

## Medium — Missing mainnet `eth_getLogs` provider guidance

**Issue title:** `eth_getLogs` mainnet workaround points to a "here" that
isn't a link

**Description:**
The JSON-RPC Endpoint page tells developers that `eth_getLogs` is disabled
on the public mainnet endpoints and to use a third-party endpoint
"here" — but "here" is rendered as bold plain text, not a hyperlink, and no
third-party RPC provider is named anywhere else in the docs.

**Steps to reproduce:**
1. Visit [https://dev-docs.botchain.ai/docs/Developers/json-rpc-endpoint/](https://dev-docs.botchain.ai/docs/Developers/json-rpc-endpoint/)
2. Find: *"`eth_getLogs` is disabled on below Mainnet endpoints. Please use
   3(rd) party endpoints from **here**."*
3. Attempt to click "here" — it does not navigate anywhere.

**Scope of impact:** Medium — any developer or agent needing event logs on
mainnet hits a documented dead end with no actual path forward.

**Evidence:**
- Source: [https://dev-docs.botchain.ai/docs/Developers/json-rpc-endpoint/](https://dev-docs.botchain.ai/docs/Developers/json-rpc-endpoint/)

**Proposed solution:** Either link "here" to an actual list of supported
third-party RPC providers, or replace the sentence with concrete guidance
(e.g. named providers, or instructions for running a local archive/full
node to serve logs).

---

## Low-medium — Empty “Other BOT Chain API” section

**Issue title:** "Other BOT Chain API" section header has no content

**Description:**
The bottom of the JSON-RPC Endpoint page has a section header promising
information on other BOT Chain–specific APIs, followed only by a single
generic sentence and nothing else.

**Steps to reproduce:**
1. Visit [https://dev-docs.botchain.ai/docs/Developers/json-rpc-endpoint/](https://dev-docs.botchain.ai/docs/Developers/json-rpc-endpoint/)
2. Scroll to the bottom
3. Read: *"#### Other BOT Chain API — BOT Chain implements some other
   APIs"* — followed by no further content.

**Scope of impact:** Low-medium — signals missing documentation for
BOT-Chain-specific RPC methods (e.g. paymaster methods documented
elsewhere are not cross-linked from here).

**Evidence:**
- Source: [https://dev-docs.botchain.ai/docs/Developers/json-rpc-endpoint/](https://dev-docs.botchain.ai/docs/Developers/json-rpc-endpoint/), final section.

**Proposed solution:** Either fill in the section with the actual list of
BOT-Chain-specific methods (at minimum, cross-link the EOA Paymaster page's
`pm_isSponsorable` method), or remove the stub header until content exists.

---

## Medium — Incorrect RPC method in the Paymaster integration workflow

**Issue title:** EOA Paymaster page calls the sponsorship check
`gm_sponsorable` in one place, `pm_isSponsorable` everywhere else

**Description:**
The EOA Paymaster page's API Spec section correctly documents the method
as `pm_isSponsorable`. In the "Wallet Integration → Interaction Workflow"
section, step 1 instead tells integrators to call `gm_sponsorable` — a
method that doesn't exist anywhere else in the spec. This is a
copy/typo error that would break an integration built by following the
workflow steps literally.

**Steps to reproduce:**
1. Visit [https://dev-docs.botchain.ai/docs/Developers/eoa-paymaster/](https://dev-docs.botchain.ai/docs/Developers/eoa-paymaster/)
2. Compare the "API Spec" section (method: `pm_isSponsorable`) against the
   "Wallet Integration" → "Interaction Workflow" section, step 1
   (method referenced: `gm_sponsorable`)

**Scope of impact:** Medium — a developer implementing gasless
transactions by following the workflow steps verbatim will call a
non-existent RPC method and get a confusing error instead of a clear
"method not found."

**Evidence:**
- Source: [https://dev-docs.botchain.ai/docs/Developers/eoa-paymaster/](https://dev-docs.botchain.ai/docs/Developers/eoa-paymaster/), both sections named above.

**Proposed solution:** Change `gm_sponsorable` to `pm_isSponsorable` in the
Interaction Workflow step so it matches the API Spec section.

---

## Medium — Invalid JSON example for `pm_isSponsorable`

**Issue title:** `pm_isSponsorable` example request body is invalid JSON
with a duplicate `value` key

**Description:**
The example request body shown for `pm_isSponsorable` on the EOA Paymaster
page contains a broken inline comment that runs into the next key
(`// an address"value": "0xa1",`) and defines `"value"` twice with two
different values in the same object. As written, it cannot be copy-pasted
and parsed as JSON.

**Steps to reproduce:**
1. Visit [https://dev-docs.botchain.ai/docs/Developers/eoa-paymaster/](https://dev-docs.botchain.ai/docs/Developers/eoa-paymaster/)
2. Find the `pm_isSponsorable` example request body
3. Copy it into any JSON parser / `JSON.parse()` — it fails, and manual
   inspection shows `"value"` appearing twice (`"0xa1"` and `"0x1b4"`).

**Scope of impact:** Medium — this is the primary code example for BOT
Chain's flagship gasless-transaction feature; a broken example undermines
the one section of the docs meant to showcase a differentiated feature.

**Evidence:**
- Source: [https://dev-docs.botchain.ai/docs/Developers/eoa-paymaster/](https://dev-docs.botchain.ai/docs/Developers/eoa-paymaster/), `pm_isSponsorable` example block.

**Proposed solution:** Rewrite the example as valid JSON with a single
`value` field and a proper (or removed) comment, e.g.:
```json
{
  "to": "0x...",
  "from": "0x...",
  "data": "0x",
  "value": "0x1b4",
  "gas": "0x101b4"
}
```

---

## Medium — Contradictory faucet instructions across two pages

**Issue title:** Quick Guide and "Claim test tBOT Tokens" page describe two
different, inconsistent faucet flows

**Description:**
The Quick Guide links a self-serve faucet UI. The dedicated "Claim test
tBOT Tokens" page instead describes a manual "contact us" / Discord bot
flow, references a "textbox" UI that isn't shown or linked on that page,
and gives no Discord invite link anywhere on the page or site footer.
It's unclear which flow is current.

**Steps to reproduce:**
1. Visit `https://dev-docs.botchain.ai/docs/Developers/quick-guide/` —
   note the self-serve faucet link (`faucet.botchain.ai/basic`).
2. Visit `https://dev-docs.botchain.ai/docs/Developers/claim-test-tbot-tokens/` —
   note it instead says *"you can contact us to obtain your tokens"* via a
   *"Discord bot faucet"*, references pasting an address into "the
   textbox" with no textbox/UI shown, and gives no Discord link.

**Scope of impact:** Medium — this directly blocks the first thing any new
developer needs to do (get testnet funds), and the two official pages
disagree with each other about how.

**Evidence:**
- Source A: `https://dev-docs.botchain.ai/docs/Developers/quick-guide/`
- Source B: `https://dev-docs.botchain.ai/docs/Developers/claim-test-tbot-tokens/`

**Proposed solution:** Confirm which faucet flow is current, remove or
clearly deprecate the other, and if the Discord bot flow is current, add
the actual Discord invite link and describe the textbox/UI it refers to
(or link to where it lives).

---

## Low-medium — B DEX linked under two different domains

**Issue title:** DEX product linked as both `dex.botchain.ai` and
`dex.bohr.life` in different parts of the same docs site

**Description:**
The Quick Guide's inline mainnet DEX link points to
`https://dex.botchain.ai/#/swap`, while the "B DEX" link in the footer
navigation present on every docs page points to `https://dex.bohr.life/`.
The documentation does not identify which domain is canonical, so developers
may follow different destinations for the same product.

**Steps to reproduce:**
1. Visit `https://dev-docs.botchain.ai/docs/Developers/quick-guide/`,
   note the inline DEX link.
2. Compare against the "B DEX" link in the site-wide footer on any page.

**Scope of impact:** Low-medium — mostly a trust/consistency issue rather
than a blocker, but worth resolving before more docs pages are added that
might pick up whichever domain the author had open at the time.

**Evidence:**
- Source A: `https://dev-docs.botchain.ai/docs/Developers/quick-guide/`
- Source B: site footer, present on all `dev-docs.botchain.ai` pages.

**Proposed solution:** Pick one canonical domain for the DEX and update
all references to match (redirecting the other if both must keep working).

---

## Low — CLI flag typo in prose

**Issue title:** Node Types page misspells `--pruneancient` as
`--prunceancient` in prose

**Description:**
The Node Types page's prose refers to *"the `--prunceancient` flag"*, but
the actual example command two lines below correctly uses
`--pruneancient=true`. The prose spelling doesn't match the flag a reader
would actually need to run.

**Steps to reproduce:**
1. Visit `https://dev-docs.botchain.ai/docs/Developers/node-types/`
2. Find the sentence referencing `--prunceancient`
3. Compare against the command example immediately below it, which uses
   `--pruneancient=true`.

**Scope of impact:** Low — a careful reader will still find the correct
flag in the code block, but it's a clear typo worth a one-line fix.

**Evidence:**
- Source: `https://dev-docs.botchain.ai/docs/Developers/node-types/`

**Proposed solution:** Fix the prose spelling to `--pruneancient`.

---

## Needs confirmation — Identical supply figures for testnet and mainnet

**Issue title:** Quick Guide lists "Total Supply: 150 Million" identically
for both BOT Chain Testnet and Mainnet

**Description:**
The network info tables for testnet and mainnet on the Quick Guide page
show the exact same "Total Supply: 150 Million" figure. This may be
intentional (testnet mirrors mainnet supply) or may be a copy-paste
artifact from creating one table from the other — worth confirming with
the team rather than assuming either way.

**Steps to reproduce:**
1. Visit `https://dev-docs.botchain.ai/docs/Developers/quick-guide/`
2. Compare the "Total Supply" field in the Testnet info table against the
   Mainnet info table.

**Scope of impact:** Low — informational only, but worth a sanity check
since it's the kind of number people quote elsewhere.

**Evidence:**
- Source: `https://dev-docs.botchain.ai/docs/Developers/quick-guide/`

**Proposed solution:** Confirm with the BOT Chain team whether this figure
is intentionally identical across both networks; correct if not.

---

## Summary table

| # | Page | Type | Severity |
|---|---|---|---|
| 1 | node-types | Broken links (404) | Medium, high visibility |
| 2 | node-configuration-best-practices | Unfilled placeholder | Low |
| 3 | node-types | Stale placeholder figure | Medium |
| 4 | json-rpc-endpoint | Non-functional link | Medium |
| 5 | json-rpc-endpoint | Empty stub section | Low-medium |
| 6 | eoa-paymaster | Wrong method name | Medium |
| 7 | eoa-paymaster | Invalid JSON example | Medium |
| 8 | quick-guide / claim-test-tbot-tokens | Contradictory instructions | Medium |
| 9 | quick-guide / site footer | Inconsistent domain | Low-medium |
| 10 | node-types | Typo | Low |
| 11 | quick-guide | Data to confirm | Needs confirmation |

## Submission note

This audit was submitted to the BOT Chain Builder Challenge Documentation / PR
track. Although the bounty requirement was a single documented bug, I reviewed
the wider developer journey to show how isolated documentation defects combine
into onboarding and integration friction. The bounty verdict is pending.

## Author

**Abdulganiy Adeleke**  
[X / Twitter](https://x.com/0xDezman) ·
[Email](mailto:adelekeabdulganiy@gmail.com)
