import SideNavigation from "@/app/_components/SideNavigation";
import type { ReactNode, FC } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <aside role="complementary" aria-label="Account navigation">
        <SideNavigation />
      </aside>
      <div className="py-1" role="main">
        {children}
      </div>
    </div>
  );
};

export default Layout;
