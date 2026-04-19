import { BookOpen, User } from "lucide-react";
import { Link } from "react-router-dom";
import LuauMiniBanner from "@/components/LuauMiniBanner";

const SiteHeader = () => (
  <>
    <LuauMiniBanner />
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-serif text-xl text-foreground tracking-wide">RBK Education</span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link to="/bundles" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
            Bundles
          </Link>
          <Link to="/calvera-next-step" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden lg:inline">
            Next Step
          </Link>
          <Link to="/account" className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">My Account</span>
            <div className="w-9 h-9 rounded-full bg-sage-soft flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          </Link>
        </nav>
      </div>
    </header>
  </>
);

export default SiteHeader;
