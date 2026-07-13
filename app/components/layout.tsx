import SidebarNav from "./SidebarNav";
import PageTransition from "../_components/PageTransition";
import s from "./docs.module.css";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={s.shell}>
      <aside className={s.aside}>
        <div className={s.asideInner}>
          <SidebarNav />
        </div>
      </aside>
      <div className={s.content}><PageTransition keyBy="full">{children}</PageTransition></div>
    </div>
  );
}
