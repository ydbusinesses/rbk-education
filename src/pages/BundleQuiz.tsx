import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { quizToAscension, catalog } from "@/lib/mock-data";
import { useLuauMini } from "@/hooks/useLuauMini";

const quizData: Record<string, { title: string; questions: { q: string; options: string[] }[]; matchedSlug: string }> = {
  "automation-readiness": {
    title: "Automation Readiness Assessment",
    matchedSlug: "ai-automation-rescue",
    questions: [
      { q: "How many hours per week do you spend on repetitive manual tasks?", options: ["Less than 2 hours", "2–5 hours", "5–10 hours", "More than 10 hours"] },
      { q: "How comfortable are you with current AI tools like ChatGPT or Copilot?", options: ["Never used them", "Tried a few times", "Use occasionally", "Use daily"] },
      { q: "Has your organization asked you to implement AI or automation?", options: ["Not yet", "It's been mentioned", "Yes, informally", "Yes, it's a formal goal"] },
      { q: "How urgent is it for you to upskill in AI automation?", options: ["Not urgent", "Within a year", "Within 6 months", "Right now"] },
    ],
  },
  "ai-career-risk": {
    title: "AI Career Risk Assessment",
    matchedSlug: "agentic-ai-career-insurance",
    questions: [
      { q: "How much of your current role involves repetitive, rule-based tasks?", options: ["Almost none", "Less than 25%", "25–50%", "More than 50%"] },
      { q: "Has AI already changed how work is done in your industry?", options: ["Not at all", "Minor changes", "Significant changes", "Major disruption"] },
      { q: "Do you have skills that AI cannot easily replicate?", options: ["Many unique skills", "Some unique skills", "A few", "I'm not sure"] },
      { q: "How prepared do you feel to work alongside AI systems?", options: ["Very prepared", "Somewhat prepared", "Not very prepared", "Not prepared at all"] },
    ],
  },
  "team-burnout-risk": {
    title: "Team Burnout Risk Assessment",
    matchedSlug: "well-being-leadership",
    questions: [
      { q: "How often do team members miss deadlines or seem overwhelmed?", options: ["Rarely", "Occasionally", "Frequently", "Almost always"] },
      { q: "How has team morale been over the last 3 months?", options: ["Great", "Good", "Declining", "Very low"] },
      { q: "How often do you have 1:1s focused on wellbeing (not just tasks)?", options: ["Weekly", "Monthly", "Rarely", "Never"] },
      { q: "Has anyone on your team recently resigned or mentioned leaving?", options: ["No", "One person", "Two people", "Three or more"] },
    ],
  },
  "pay-gap": {
    title: "Pay Gap Reality Check",
    matchedSlug: "negotiation-power",
    questions: [
      { q: "When did you last negotiate your salary or rate?", options: ["Within the last year", "1–3 years ago", "More than 3 years ago", "Never"] },
      { q: "Do you know your market value for your role and experience level?", options: ["Yes, clearly", "Roughly", "Not really", "No idea"] },
      { q: "How confident are you in negotiating compensation?", options: ["Very confident", "Somewhat confident", "Not very confident", "Not confident at all"] },
      { q: "Do you believe you're being paid fairly compared to peers?", options: ["Yes, fairly paid", "Probably close", "Likely underpaid", "Definitely underpaid"] },
    ],
  },
};

const BundleQuiz = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { updateStage } = useLuauMini();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const quiz = slug ? quizData[slug] : null;

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="max-w-2xl mx-auto px-5 py-20 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Assessment not found</h1>
          <Link to="/bundles" className="text-primary hover:underline">← Browse all bundles</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const q = quiz.questions[current];
  const total = quiz.questions.length;
  const progress = ((current) / total) * 100;

  const handleSelect = (idx: number) => setSelected(idx);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (current + 1 < total) {
      setCurrent(current + 1);
      updateStage("quiz_started", { last_quiz_slug: slug });
    } else {
      setDone(true);
      updateStage("quiz_completed", { last_bundle_slug: quiz.matchedSlug });
    }
  };

  const matchedBundle = catalog.find((b) => b.slug === quiz.matchedSlug);
  const score = answers.reduce((a, b) => a + b, 0);
  const severity = score >= answers.length * 2 ? "high" : score >= answers.length ? "moderate" : "low";

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="max-w-2xl mx-auto px-5 py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl text-foreground mb-3">Your results are in</h1>
          <p className="text-muted-foreground mb-2">
            Your risk level: <span className="font-semibold text-foreground capitalize">{severity}</span>
          </p>
          <p className="text-muted-foreground mb-8">
            Based on your answers, we recommend starting with this bundle:
          </p>
          {matchedBundle && (
            <div className="rounded-2xl border border-border bg-card p-6 mb-8 text-left">
              <h2 className="font-serif text-xl text-foreground mb-2">{matchedBundle.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{matchedBundle.careerImpact}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{matchedBundle.price}</span>
                <Link
                  to={`/bundles/${matchedBundle.slug}`}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
                >
                  View Bundle <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
          <Link to="/bundles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Browse all bundles
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-2xl mx-auto px-5 py-10">
        <Link to="/bundles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">{quiz.title}</p>
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-1">
              <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">Question {current + 1} of {total}</p>
          </div>

          <h2 className="font-serif text-2xl text-foreground mb-6">{q.q}</h2>

          <div className="space-y-3 mb-8">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                  selected === idx
                    ? "border-primary bg-sage-soft/50 text-foreground font-medium"
                    : "border-border bg-background text-foreground hover:border-primary/30"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selected === null}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {current + 1 === total ? "See My Results" : "Next Question"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default BundleQuiz;
