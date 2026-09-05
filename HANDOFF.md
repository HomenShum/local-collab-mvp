# NodeVoice developer and user handoff

Read this first to try the local comparison or continue the reviewed controls repair. A developer comparing voice-agent designs can run the same count with three private transcripts and with one shared room: the scripted private states remain at 1, while the shared reducer advances to 100. The local demo proves that coordination example; it does not certify a real microphone, external model or durable hosted room.

The two UI owners were independently reviewed against base `d225bcaf64008ee522bc66d40aa72eb0381b95a6`. This handoff records the resulting local proof; shared CI and public deployment for the repair remain separate checks. The existing README's hosted demonstrations and model measurements are historical evidence, not a fresh deployment claim here. Use [START_HERE](docs/START_HERE.md) for the code walkthrough after this first run.

Use Node.js 22.12+ (or a supported newer LTS), npm, and a fresh checkout with no private `.env.local` or inherited provider/endpoint configuration. The installed Vite 8.1.3 requires `^20.19.0 || >=22.12.0`. No key is needed for this path.

```powershell
npm ci
npm run doctor
npm run proof
npm run build
$env:SOURCE = 'deterministic'
$env:USE_OLLAMA = '0'
npm run start
```

Open `http://localhost:8787/health` first. Both `live.openai` and `live.elevenlabs` must be false for the keyless observation. If either is true, stop this server and use a clean shell/configuration before testing the missing-key path. Do not paste keys into the browser. The current server listens with no explicit host; the reviewed run observed `::` and `0.0.0.0`, so localhost usage is not proof of loopback-only binding. Stop your own server with Ctrl+C when finished.

1. Open `http://localhost:8787/demo` (the bare root is the room lobby). Keep Source at its scripted setting, N 100 and Turns 100. Click **Run the comparison** once. Wait for the visible 100/100, **complete**, and the bottom **Run** button to become available again. The recorded final run took 125.736 s to show 100 and 126.829 s to finish; the proof budget stayed 300 s. These are observations on one machine, not a latency guarantee or audio-quality certification.
2. On a phone-sized viewport, each complete control now wraps into ordinary rows. Use Tab and Shift+Tab through the controls, then set each numeric field to 99 and use its native up spinner or ArrowUp to return to 100. The selection labels can still shorten with ellipses.
3. Separately open `/` and create a Count 10 room. While it is waiting for the second participant, toggle **Invite** and **State** with pointer or keyboard. Invite's QR visibility still depends on waiting for another participant; this proof does not promise the same QR toggle after all seats fill.
4. In a second local browser context, join the displayed code. Enter `Actually, count from 5 to 10`. The deterministic correction retargets the task, then automatic resume visibly stops on the missing-key error. One explicit **Start** produces one additional error with no completed turn. This is expected failure disclosure, not successful provider execution. Navigating back to `/` restores the lobby while the local server remains alive; durable recovery across restart was not tested.

`npm run doctor` passed all three TypeScript projects and 56 citations. `npm run proof` passed 55 tests in 9 files plus the CLI smoke. The CLI's actual defaults are target 12 / nine turns; that smoke is separate from the real browser 100 proof. Normal build passed. Existing shared CI uses Node 20 and does not run the Convex typecheck or this full browser matrix; this repair has not yet run through shared CI.

The [scoped evidence packet](promotion/evidence/controls-20260905/README.md) contains the current 337-check / 94-capture raw report, selected actual pixels, structured state, ordinary logs, source hashes, and the retained failed scroll approaches. Run its standard-library verifier with `python promotion/evidence/controls-20260905/verify.py`. Optional `--source-root .` checks the historical 177-file reviewed binding and will correctly fail if any of those source bytes change later. It does not require Git or rerun the browser. Exact old browser replay remains operator-local; [the existing count script](scripts/prove-count-to-100.mjs) has a narrower oracle and writes a fixed historical output directory, so it is not a substitute for the retained 337-check proof.

Limits remain open: detailed comparison/room panes and short-height reading, selected-option ellipsis, full visual/accessibility grades, physical devices, native zoom (the evidence doubles computed font sizes), microphone and audible speech quality, real provider/agent execution, hosted Convex and durable restart. The unchanged locked baseline has three high package entries affecting browserslist, nanoid and postcss; see the packet's raw audit. No dependencies, backend policy, state handlers or publication configuration changed in this layout slice.
