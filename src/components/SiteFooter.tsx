import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="border-t border-border py-8 mt-16">
    <div className="max-w-6xl mx-auto px-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>RBK Education · AI Mini-Learner Bundles for adults 40+ ready to grow</p>
        <div className="flex gap-4">
          <Link to="/bundles" className="hover:text-foreground transition-colors">All Bundles</Link>
          <Link to="/account" className="hover:text-foreground transition-colors">My Account</Link>
          <a href="mailto:support@calvera.com" className="text-primary hover:underline">Support</a>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
