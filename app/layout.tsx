import type { ReactNode } from "react";
import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { Banner } from "nextra/components";
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
            <Navbar logo={<span className="wwa-logo">World Without Answers</span>} />
          }
          banner={
            <Banner dismissible={false}>
              <span className="wwa-banner">
                An engine measured every step of the way. Every claim on this
                site is bound to its measurement; failures stay visible.
              </span>
            </Banner>
          }
          docsRepositoryBase="https://github.com/BenMohStem/documentation-starter-kit/tree/main"
          nextThemes={{ defaultTheme: "dark" }}
          footer={
            <Footer>
              <div className="wwa-footer">
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
            </Footer>
          }
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
