# StudyBuddy Matcher

Interactive mockup for **HW1** of the Web Analytics course (AUEB). The app text is in Greek.

StudyBuddy Matcher helps university students find partners for semester projects and studying. A recommender system
suggests classmates whose skills complement yours ("I know Python, I need someone who knows UI Design"), who take the
same courses, study at the same hours and aim for a similar grade.

This is a mockup. There is no backend and no real AI. All data is hardcoded in `src/data/mockData.js` and every click
only changes React state.

## Run it

```bash
npm install
npm run dev
```

Then open the address that Vite prints, usually http://localhost:5173. The mockup is designed for a laptop screen,
where it shows a phone next to a short guide. It also works full screen on a real phone.

## What you can try

| Tab | What it shows |
| --- | --- |
| Προτάσεις | Recommended students with a match score, search/sort controls, bookmarking, and a per-category breakdown. "Στείλε αίτημα" opens a modal with selectable courses and message templates. |
| Αιτήματα | Incoming requests (with accept, decline, and reset), sent requests (with cancel or simulated acceptance), and accepted partners with an interactive pre-loaded **Chat ("Συνομιλία")**. |
| Προφίλ | Interactive profile where you can adjust skill levels (`−` / `+`), add/remove skills, toggle desired partner skills, toggle courses, and switch study preferences. |
| Αλγόριθμος | How the recommender works: profiles as vectors, cosine similarity on complementary skills, and an interactive worked example where you can tweak the vector values live. |

## Intelligent component

A recommender system based on vector similarity. Each student becomes a vector over four categories: shared courses,
skill levels, study hours and grade goal. For skills, the user's *missing* skills are compared with the other student's
*known* skills, so complementary profiles score high. Cosine similarity is computed per category and the match score is
their average. The **Αλγόριθμος** tab walks through one example step by step.

## Project structure

```
src/
  data/mockData.js        all mock data
  components/             MobileShell, BottomNav, StatusBar, StudentCard, ConnectModal and small UI pieces
  pages/                  Discover, Requests, Profile, MLLogic (one file per tab)
  App.jsx                 active tab and shared state, passed to the pages as props
```

Built with React 19, Vite, Tailwind CSS 4 and lucide-react icons.
