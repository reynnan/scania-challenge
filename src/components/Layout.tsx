import cx from "classnames";
import Footer from "./Footer";
import Header from "./Header";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={cx("flex flex-col min-h-screen", inter.className)}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
