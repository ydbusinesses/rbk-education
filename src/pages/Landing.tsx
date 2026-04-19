import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { categories } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-20">
        <motion.div initial="hidden" animate="visible" className="text-center">
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm font-medium text-primary bg-sage-soft inline-block px-4 py-1.5 rounded-full mb-6"
          >
            AI-powered career acceleration for professionals 40+
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6 max-w-3xl mx-auto"
          >
            Stop guessing. Start growing.
            <br />
            <span className="text-primary">Beyond intelligent agents.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            RBK Education places you inside a proprietary methodology that goes further than automation — mapping your
            exact skill gaps, learning style, and career trajectory so every bundle you take compounds into real,
            measurable momentum.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quiz/automation-readiness"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-base px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              Take the Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/bundles"
              className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground font-medium text-base px-8 py-4 rounded-xl hover:bg-muted transition-colors"
            >
              Browse Bundles
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Mini-quiz teaser */}
      <section className="max-w-3xl mx-auto px-5 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border bg-card p-8 sm:p-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-peach-soft flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">Quick Diagnostic</p>
              <h2 className="font-serif text-xl text-foreground">Which skill gap is costing you the most?</h2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "AI Automation is passing me by", quiz: "automation-readiness" },
              { label: "AI might replace my role", quiz: "ai-career-risk" },
              { label: "My team is burning out", quiz: "team-burnout-risk" },
              { label: "I'm underpaid for my skills", quiz: "pay-gap" },
            ].map((item) => (
              <Link
                key={item.quiz}
                to={`/quiz/${item.quiz}`}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-4 text-sm text-foreground hover:border-primary/40 hover:bg-sage-soft/20 transition-all group"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Categories strip */}
      <section className="max-w-5xl mx-auto px-5 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl text-foreground mb-2">RBK Methodology</h2>
          <p className="text-muted-foreground mb-8">Agents are just one layer of a deeper architecture.</p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.key}
                to={`/bundles?category=${cat.key}`}
                className="text-xs font-medium px-4 py-2 rounded-full border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
              >
                {cat.label.split("&")[0].trim()}
              </Link>
            ))}
          </div>
          <Link
            to="/bundles"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            Browse All Bundles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Lumi bubble */}
      <Link
        to="/resume"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        title="Resume where you left off"
      >
        <Compass className="w-6 h-6" />
      </Link>

      <SiteFooter />
    </div>
  );
};

export default Landing;
