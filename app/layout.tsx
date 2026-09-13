import type { ReactNode } from "react";
import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Layout
          pageMap={await getPageMap()}
          navbar={
            <Navbar
              logo={
                <span className="wwa-logo">
                  World Without Answers
                </span>
              }
            />
          }
          docsRepositoryBase="https://github.com/BenMohStem/documentation-starter-kit/tree/main"
          nextThemes={{ defaultTheme: "dark" }}
          footer={
            <Footer>
              <div className="wwa-footer">
                <div className="wwa-footer-map">
                  <div className="wwa-footer-col">
                    <span className="wwa-footer-col-title">The world</span>
                    <a className="wwa-footer-link" href="/docs/world/premise">Premise</a>
                    <a className="wwa-footer-link" href="/docs/world/emergence">Emergence</a>
                    <a className="wwa-footer-link" href="/docs/world/observation">Observation</a>
                    <a className="wwa-footer-link" href="/docs/world/roadmap">Roadmap</a>
                  </div>
                  <div className="wwa-footer-col">
                    <span className="wwa-footer-col-title">The project</span>
                    <a className="wwa-footer-link" href="/docs/idea">The idea</a>
                    <a className="wwa-footer-link" href="/docs/design">The design</a>
                    <a className="wwa-footer-link" href="/docs/plan">The plan</a>
                    <a className="wwa-footer-link" href="/docs/steps">Steps & eras</a>
                    <a className="wwa-footer-link" href="/docs/timeline">Timeline</a>
                    <a className="wwa-footer-link" href="/docs/thoughts">Thoughts</a>
                  </div>
                  <div className="wwa-footer-col">
                    <span className="wwa-footer-col-title">The engine</span>
                    <a className="wwa-footer-link" href="/docs/engine/index">Overview</a>
                    <a className="wwa-footer-link" href="/docs/engine/std">The floor</a>
                    <a className="wwa-footer-link" href="/docs/engine/physics">Physics</a>
                    <a className="wwa-footer-link" href="/docs/engine/renderer">Renderer</a>
                    <a className="wwa-footer-link" href="/docs/demo/index">The demo</a>
                    <a className="wwa-footer-link" href="/docs/demo/gates">How it is tested</a>
                  </div>
                  <div className="wwa-footer-col">
                    <span className="wwa-footer-col-title">The record</span>
                    <a className="wwa-footer-link" href="/research">The library</a>
                    <a className="wwa-footer-link" href="/research/ledger">The ledger</a>
                    <a className="wwa-footer-link" href="/research/doctrine">The doctrine</a>
                  </div>
                </div>
                <div className="wwa-footer-words">
                  <span>
                    A small set of rules, tested carefully, in search of a
                    larger world.
                  </span>
                  <span className="wwa-footer-quiet">
                    The world is large. We understand only part of it. So we
                    observe, we test, we build, we make mistakes, we correct
                    them, and we keep looking.
                  </span>
                </div>
              </div>
            </Footer>
          }
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
