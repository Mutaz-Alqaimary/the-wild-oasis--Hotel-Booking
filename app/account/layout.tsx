import SideNavigation from "@/app/_components/SideNavigation";
import type { ReactNode, FC } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-0 motion-safe:animate-[content-fade-up_500ms_ease-out_both] sm:gap-8 lg:grid-cols-[minmax(13rem,16rem)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
      <aside
        role="complementary"
        aria-label="Account navigation"
        className="min-w-0 lg:sticky lg:top-24 lg:min-h-0 lg:self-start"
      >
        <SideNavigation />
      </aside>
      <div
        className="min-w-0 overflow-hidden rounded-md border border-primary-800/70 bg-primary-950/40 p-4 text-sm shadow-2xl shadow-primary-950/20 transition-colors duration-300 sm:p-6 sm:text-base lg:p-8"
        role="main"
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
