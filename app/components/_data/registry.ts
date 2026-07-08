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
          { slug: "principles", title: "How to Use", desc: "Where to start, how the system fits together, and the rules that keep it coherent." },
          { slug: "colors", title: "Color System", desc: "A monochrome field with one warm accent. Roles, scales and contrast guarantees." },
          { slug: "typography", title: "Typography", desc: "Inter for reading, Inter Display for headlines, mono for the machine's voice." },
          { slug: "spacing", title: "Spacing", desc: "A 4px base scale and the rhythm rules that keep sections breathing evenly." },
          { slug: "grid", title: "Grid System", desc: "Columns, gutters and the 1320px container every page hangs from." },
          { slug: "elevation", title: "Elevation", desc: "Depth without drama: hairlines first, shadows only where meaning needs them." },
          { slug: "radius", title: "Border Radius", desc: "From sharp panels to rounded chips, and when each is the right call." },
          { slug: "breakpoints", title: "Breakpoints", desc: "The widths where layouts reflow, and how components adapt across them." },
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
          { slug: "sidebar", title: "Side Navigation", desc: "The vertical rail for product areas, with grouping and collapse.", built: true },
          { slug: "topnav", title: "Top Navigation", desc: "The horizontal bar for global wayfinding and primary actions.", built: true },
          { slug: "breadcrumbs", title: "Breadcrumbs", desc: "A trail back up the hierarchy, one hop at a time.", built: true },
          { slug: "tabs", title: "Tabs", desc: "Peer views in one place; one visible, all reachable.", built: true },
          { slug: "pagination", title: "Pagination", desc: "Long lists cut into honest, numbered pages.", built: true },
          { slug: "link", title: "Link", desc: "Inline navigation that reads as text and behaves like a promise.", built: true },
          { slug: "commandmenu", title: "Command Menu", desc: "The keyboard-first jump-anywhere palette.", built: true },
        ],
      },
      {
        label: "Forms",
        entries: [
          { slug: "button", title: "Button", desc: "The unit of intent. Sizes, variants, states and the one warm primary.", built: true },
          { slug: "splitbutton", title: "Split Button", desc: "A primary action with its alternatives folded beside it.", built: true },
          { slug: "input", title: "Input", desc: "Single-line text entry with labels, hints and honest validation.", built: true },
          { slug: "textarea", title: "Textarea", desc: "Room to write. Grows predictably, never traps the scroll.", built: true },
          { slug: "checkbox", title: "Checkbox", desc: "Independent yes-or-no decisions, including the indeterminate middle.", built: true },
          { slug: "radio", title: "Radio", desc: "One choice from a visible set.", built: true },
          { slug: "choicebox", title: "Choicebox", desc: "Radio semantics in a card body, for choices that need explaining.", built: true },
          { slug: "toggle", title: "Toggle", desc: "Instant on-or-off with optimistic feedback.", built: true },
          { slug: "dropdown", title: "Dropdown", desc: "A compact select for known, shortish lists.", built: true },
          { slug: "combobox", title: "Combobox", desc: "Type to filter, pick to commit. For lists too long to scan.", built: true },
          { slug: "datepicker", title: "Date Picker", desc: "Calendar entry without ambiguity, keyboard included.", built: true },
          { slug: "timepicker", title: "Time Picker", desc: "Times entered fast, validated quietly.", built: true },
          { slug: "search", title: "Search", desc: "The input that answers as you type.", built: true },
          { slug: "slider", title: "Slider", desc: "Continuous values chosen by feel, with exact entry as backup.", built: true },
          { slug: "pininput", title: "Pin Input", desc: "Short codes, one cell per character, paste-friendly.", built: true },
          { slug: "upload", title: "Upload", desc: "Files in by drag, drop or browse, with progress you can trust.", built: true },
        ],
      },
      {
        label: "Data Display",
        entries: [
          { slug: "table", title: "Table", desc: "Dense data with sorting, selection and sticky headers." },
          { slug: "list", title: "List", desc: "Vertical collections with leading and trailing slots.", built: true },
          { slug: "avatar", title: "Avatar", desc: "People and teams as compact, stackable identity marks.", built: true },
          { slug: "badge", title: "Badge", desc: "Small counts and statuses pinned to other elements.", built: true },
          { slug: "tags", title: "Tags", desc: "Removable labels for filtering and classification.", built: true },
          { slug: "pills", title: "Pills", desc: "Selectable chips for quick, visible filtering.", built: true },
          { slug: "indicator", title: "Indicator", desc: "A dot's worth of status: live, idle, attention.", built: true },
          { slug: "logo", title: "Logo", desc: "The chip pixel-O, its clear space and its misuse cases.", built: true },
          { slug: "skeleton", title: "Skeleton", desc: "The optimistic loading state: structure first, content on arrival.", built: true },
          { slug: "keyboardinput", title: "Keyboard Input", desc: "Keys and shortcuts rendered as keys, not prose.", built: true },
        ],
      },
      {
        label: "Feedback",
        entries: [
          { slug: "snackbar", title: "Snackbar", desc: "Brief confirmations that never block the work.", built: true },
          { slug: "loader", title: "Loader", desc: "For the moments honesty requires a wait.", built: true },
          { slug: "progress", title: "Progress", desc: "Determinate movement toward a visible end.", built: true },
          { slug: "notification", title: "Notification", desc: "System messages with severity, action and dismissal." },
          { slug: "callout", title: "Callout", desc: "Inline emphasis for things the reader must not miss.", built: true },
          { slug: "stepper", title: "Stepper", desc: "Multi-step flows with the finish line always in view.", built: true },
          { slug: "emptystate", title: "Empty State", desc: "First-run and zero-data moments that point forward.", built: true },
        ],
      },
      {
        label: "Overlays",
        entries: [
          { slug: "modal", title: "Modal", desc: "Focused decisions above the page, escapable by design.", built: true },
          { slug: "drawer", title: "Drawer", desc: "Side-anchored panels for detail without losing place.", built: true },
          { slug: "popover", title: "Popover", desc: "Anchored content that opens near its trigger.", built: true },
          { slug: "tooltip", title: "Tooltip", desc: "A label's whisper on hover and focus.", built: true },
          { slug: "bottomsheet", title: "Bottom Sheet", desc: "Mobile-first overlay rising from the bottom edge.", built: true },
        ],
      },
      {
        label: "Layout",
        entries: [
          { slug: "accordion", title: "Accordion", desc: "Sections that expand one truth at a time.", built: true },
          { slug: "divider", title: "Divider", desc: "The hairline. #1e1e1e, one pixel, everywhere.", built: true },
          { slug: "filter", title: "Filter", desc: "Faceted narrowing with visible, removable criteria.", built: true },
          { slug: "fab", title: "FAB", desc: "The floating action for a screen's one primary verb.", built: true },
          { slug: "menu", title: "Menu", desc: "Contextual actions in a compact, keyboardable list.", built: true },
          { slug: "icon", title: "Icon", desc: "The pixel-glyph family: grid, weights and usage." },
          { slug: "illustration", title: "Illustration", desc: "Dark-glass isometric scenes for empty states and stories." },
          { slug: "gridcomp", title: "Grid", desc: "Layout primitives for composing responsive regions." },
          { slug: "codeblock", title: "Code Block", desc: "Source shown honestly: mono, copyable, highlighted." },
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
          { slug: "sidemenu-with-navbar", title: "Side Menu with Navbar", desc: "The app shell: rail plus top bar, composed from system parts." },
          { slug: "form-layout", title: "Form Layout", desc: "Field rhythm, section grouping and validation placement." },
        ],
      },
    ],
  },
];

export const ALL_ENTRIES: (Entry & { group: string; category: string })[] = GROUPS.flatMap((g) =>
  g.categories.flatMap((c) => c.entries.map((e) => ({ ...e, group: g.label, category: c.label || g.label })))
);

export const findEntry = (slug: string) => ALL_ENTRIES.find((e) => e.slug === slug);
