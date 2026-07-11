/*
   The component registry — single source of truth for the docs area.
   Mirrors the reference system's structure 1:1 (same groups, same
   categories, same slugs), restyled for Optimistic.
*/

export type Entry = {
  slug: string;
  title: string;
  desc: string;
  /** built = full doc page exists; otherwise the scaffold renders */
  built?: boolean;
  /** semver for the component; bump on any change */
  version?: string;
  /** ISO timestamp of the last change (maintained per component) */
  updated?: string;
};

export type Category = { label: string; entries: Entry[] };
export type Group = { label: string; numbered?: boolean; categories: Category[] };

export const GROUPS: Group[] = [
  {
    label: "Foundations",
    numbered: true,
    categories: [
      {
        label: "",
        entries: [
          { slug: "introduction", title: "Introduction", desc: "What Optimistic is, why it exists, and what's inside.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "principles", title: "How to Use", desc: "Where to start, how the system fits together, and the rules that keep it coherent.", built: true, version: "1.0.0", updated: "2026-07-09T12:00:00Z" },
          { slug: "colors", title: "Color System", desc: "A monochrome field with one warm accent. Roles, scales and contrast guarantees.", built: true, version: "1.0.0", updated: "2026-07-09T12:00:00Z" },
          { slug: "typography", title: "Typography", desc: "Inter for reading, Inter Display for headlines, mono for the machine's voice.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "spacing", title: "Spacing", desc: "A 4px base scale and the rhythm rules that keep sections breathing evenly.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "grid", title: "Grid System", desc: "Columns, gutters and the 1320px container every page hangs from.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "elevation", title: "Elevation", desc: "Depth without drama: hairlines first, shadows only where meaning needs them.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "radius", title: "Border Radius", desc: "From sharp panels to rounded chips, and when each is the right call.", built: true, version: "1.0.0", updated: "2026-07-09T12:00:00Z" },
          { slug: "breakpoints", title: "Breakpoints", desc: "The widths where layouts reflow, and how components adapt across them.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
        ],
      },
    ],
  },
  {
    label: "Components",
    categories: [
      {
        label: "Navigation",
        entries: [
          { slug: "sidebar", title: "Side Navigation", desc: "The vertical rail for product areas, with grouping and collapse.", built: true, version: "1.0.0", updated: "2026-07-09T12:00:00Z" },
          { slug: "topnav", title: "Top Navigation", desc: "The horizontal bar for global wayfinding and primary actions.", built: true, version: "1.0.0", updated: "2026-07-09T12:00:00Z" },
          { slug: "breadcrumbs", title: "Breadcrumbs", desc: "A trail back up the hierarchy, one hop at a time.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "tabs", title: "Tabs", desc: "Peer views in one place; one visible, all reachable.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "pagination", title: "Pagination", desc: "Long lists cut into honest, numbered pages.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "link", title: "Link", desc: "Inline navigation that reads as text and behaves like a promise.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "commandmenu", title: "Command Menu", desc: "The keyboard-first jump-anywhere palette.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
        ],
      },
      {
        label: "Forms",
        entries: [
          { slug: "button", title: "Button", desc: "The unit of intent. Sizes, variants, states and the one warm primary.", built: true, version: "1.0.0", updated: "2026-07-09T12:00:00Z" },
          { slug: "splitbutton", title: "Split Button", desc: "A primary action with its alternatives folded beside it.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "input", title: "Input", desc: "Single-line text entry with labels, hints and honest validation.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "textarea", title: "Textarea", desc: "Room to write. Grows predictably, never traps the scroll.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "checkbox", title: "Checkbox", desc: "Independent yes-or-no decisions, including the indeterminate middle.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "radio", title: "Radio", desc: "One choice from a visible set.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "choicebox", title: "Choicebox", desc: "Radio semantics in a card body, for choices that need explaining.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "toggle", title: "Toggle", desc: "Instant on-or-off with optimistic feedback.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "dropdown", title: "Dropdown", desc: "A compact select for known, shortish lists.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "combobox", title: "Combobox", desc: "Type to filter, pick to commit. For lists too long to scan.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "datepicker", title: "Date Picker", desc: "Calendar entry without ambiguity, keyboard included.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "timepicker", title: "Time Picker", desc: "Times entered fast, validated quietly.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "search", title: "Search", desc: "The input that answers as you type.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "slider", title: "Slider", desc: "Continuous values chosen by feel, with exact entry as backup.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "pininput", title: "Pin Input", desc: "Short codes, one cell per character, paste-friendly.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "upload", title: "Upload", desc: "Files in by drag, drop or browse, with progress you can trust.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
        ],
      },
      {
        label: "Data Display",
        entries: [
          { slug: "table", title: "Table", desc: "A theme-aware data grid: sort, filter, search, select, edit, expand, paginate, pin, resize and more.", built: true, version: "2.13.0", updated: "2026-07-11T22:00:00Z" },
          { slug: "chart", title: "Chart", desc: "Bar, line, area, donut and sparkline. Pure SVG, token-coloured, theme-aware, no dependencies.", built: true, version: "1.0.0", updated: "2026-07-11T15:00:00Z" },
          { slug: "list", title: "List", desc: "Vertical collections with leading and trailing slots.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "card", title: "Card", desc: "A bordered surface for content and actions, with media, interactive and background-motion variants.", built: true, version: "1.1.1", updated: "2026-07-11T14:00:00Z" },
          { slug: "avatar", title: "Avatar", desc: "People and teams as compact, stackable identity marks.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "badge", title: "Badge", desc: "Small counts and statuses pinned to other elements.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "tags", title: "Tags", desc: "Removable labels for filtering and classification.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "pills", title: "Pills", desc: "Selectable chips for quick, visible filtering.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "indicator", title: "Indicator", desc: "A dot's worth of status: live, idle, attention.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "logo", title: "Logo", desc: "The chip pixel-O, its clear space and its misuse cases.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "skeleton", title: "Skeleton", desc: "The optimistic loading state: structure first, content on arrival.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "keyboardinput", title: "Keyboard Input", desc: "Keys and shortcuts rendered as keys, not prose.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
        ],
      },
      {
        label: "Feedback",
        entries: [
          { slug: "snackbar", title: "Snackbar", desc: "Brief confirmations that never block the work.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "loader", title: "Loader", desc: "For the moments honesty requires a wait.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "progress", title: "Progress", desc: "Determinate movement toward a visible end.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "notification", title: "Notification", desc: "System messages with severity, action and dismissal.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "callout", title: "Callout", desc: "Inline emphasis for things the reader must not miss.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "stepper", title: "Stepper", desc: "Multi-step flows with the finish line always in view.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "emptystate", title: "Empty State", desc: "First-run and zero-data moments that point forward.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
        ],
      },
      {
        label: "Overlays",
        entries: [
          { slug: "modal", title: "Modal", desc: "Focused decisions above the page, escapable by design.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "drawer", title: "Drawer", desc: "Side-anchored panels for detail without losing place.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "popover", title: "Popover", desc: "Anchored content that opens near its trigger.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "tooltip", title: "Tooltip", desc: "A label's whisper on hover and focus.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "bottomsheet", title: "Bottom Sheet", desc: "Mobile-first overlay rising from the bottom edge.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
        ],
      },
      {
        label: "Layout",
        entries: [
          { slug: "accordion", title: "Accordion", desc: "Sections that expand one truth at a time.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "divider", title: "Divider", desc: "The hairline. #1e1e1e, one pixel, everywhere.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "filter", title: "Filter", desc: "Faceted narrowing with visible, removable criteria.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "fab", title: "FAB", desc: "The floating action for a screen's one primary verb.", built: true, version: "1.0.0", updated: "2026-07-09T12:00:00Z" },
          { slug: "menu", title: "Menu", desc: "Contextual actions in a compact, keyboardable list.", built: true, version: "1.0.0", updated: "2026-07-08T10:45:44+05:30" },
          { slug: "icon", title: "Icon", desc: "~2,000 single-colour line icons from Lucide, searchable.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "illustration", title: "Illustration", desc: "20 single-colour line scenes for empty, error and success states.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "gridcomp", title: "Grid", desc: "Layout primitives for composing responsive regions.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
          { slug: "codeblock", title: "Code Block", desc: "Source shown honestly: mono, copyable, highlighted.", built: true, version: "1.0.0", updated: "2026-07-10T23:00:12+05:30" },
        ],
      },
    ],
  },
  {
    label: "Layouts",
    categories: [
      {
        label: "",
        entries: [
          { slug: "sidemenu-with-navbar", title: "Side Menu with Navbar", desc: "The app shell: six arrangements of top menu, left menu, header and content.", built: true, version: "1.0.0", updated: "2026-07-11T12:00:00Z" },
          { slug: "form-layout", title: "Form Layout", desc: "Field rhythm, section grouping and validation placement.", version: "1.0.0", updated: "2026-07-09T12:00:00Z" },
        ],
      },
    ],
  },
];

export const ALL_ENTRIES: (Entry & { group: string; category: string })[] = GROUPS.flatMap((g) =>
  g.categories.flatMap((c) => c.entries.map((e) => ({ ...e, group: g.label, category: c.label || g.label })))
);

export const findEntry = (slug: string) => ALL_ENTRIES.find((e) => e.slug === slug);
