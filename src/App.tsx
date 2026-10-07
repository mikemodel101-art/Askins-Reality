import { useEffect, useState } from "react";
import { RouterProvider, useRouter } from "@/lib/router";
import { LeadProvider } from "@/components/LeadForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import NewHomes from "@/pages/NewHomes";
import ListingDetail from "@/pages/ListingDetail";
import Rebates from "@/pages/Rebates";
import Communities from "@/pages/Communities";
import BuyerGuide from "@/pages/BuyerGuide";
import About from "@/pages/About";
import { Blog, BlogPost } from "@/pages/Blog";
import Contact from "@/pages/Contact";
import { Button } from "@/components/ui";

function Routes() {
  const { route } = useRouter();
  const path = route.path;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);

  let page: React.ReactNode;
  if (path === "/") page = <Home />;
  else if (path === "/new-homes") page = <NewHomes />;
  else if (path.startsWith("/listing/")) page = <ListingDetail slug={path.replace("/listing/", "")} />;
  else if (path === "/rebates") page = <Rebates />;
  else if (path === "/communities") page = <Communities />;
  else if (path === "/buyer-guide") page = <BuyerGuide />;
  else if (path === "/about") page = <About />;
  else if (path === "/blog") page = <Blog />;
  else if (path.startsWith("/blog/")) page = <BlogPost slug={path.replace("/blog/", "")} />;
  else if (path === "/contact") page = <Contact />;
  else page = <NotFound />;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main key={path} className={path === "/" ? "flex-1" : "animate-pop flex-1"}>
        {page}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed right-4 bottom-20 z-[85] grid h-11 w-11 place-items-center rounded-full bg-ink-900/90 text-gold-300 shadow-lg ring-1 ring-white/20 backdrop-blur transition-all duration-500 hover:bg-ink-900 lg:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="m6 11 6-6 6 6" />
      </svg>
    </button>
  );
}

function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-40 pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-1/3 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
      </div>
      <div className="container-x relative text-center">
        <p className="font-display text-[6rem] leading-none font-semibold text-gold-400/30 sm:text-[9rem]">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">This page went under contract</h1>
        <p className="mx-auto mt-4 max-w-lg text-[15.5px] text-ink-300">
          The link may be from our old VOW-IDX site. Everything moved — try the map search or talk to an advisor.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/new-homes" size="lg" icon="search">Search new homes</Button>
          <Button to="/" variant="light" size="lg">Back home</Button>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <LeadProvider>
        <Routes />
      </LeadProvider>
    </RouterProvider>
  );
}
