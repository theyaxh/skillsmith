# Mapping: modern pattern to retro part

Use this in step 2. Each row says what to build and the one thing people get wrong. Markup for every part is in `assets/demo.html`.

## Shell and layout

| Modern | Retro | Notes |
|---|---|---|
| Page background | `--retro-desktop` blue on `body.retro` | Flat colour. No gradients or photos unless the user supplies an original wallpaper. |
| App shell with sidebar + content | Two or more `r-window`s side by side, same grid as before | Keep the original grid widths and gaps. |
| Sidebar nav | Window (or bare pane) holding `ul.r-list.r-pane` | Current item: `aria-current="page"` gets navy selection. Icons 16px left of the label. |
| List of rows with their own buttons (files, uploads, people) | `ul.r-pane` with plain flex rows, buttons as `r-btn r-square` | `r-list` is for rows that are one link or button each. |
| Top nav bar / header with links | `r-menubar` inside the main window, or `r-toolbar` | Links stay links. If it is the product's global nav and the user wants desktop dressing, a `r-taskbar` can carry it. |
| Page title (`h1`) | The main window's `r-title-text`, as the same heading element | `<h1 class="r-title-text">`. Don't duplicate the title in the body. |
| Card, panel, section with heading | `r-window` + `r-title` + `r-body` | Title = the card's heading. Subtitle moves into the body as `r-hint`. |
| Card without heading | `r-window` without title bar, or `r-raised` panel | Never invent a title. |
| Nested card / settings group / fieldset | `fieldset.r-group` with `legend` | One level of windows is plenty; inside windows, use group boxes. |
| Stat / KPI tile | Small `r-window` (title = label) with value in `r-num` at 32 to 40px | Delta pill becomes `r-tag r-good` / `r-bad`. |
| Divider | `hr.r-hr` (etched: grey line over white line) | |
| Footer / status line | `r-statusbar` with sunken cells | Only if the original has one. |
| Hero / empty state | `r-hero` (big pixel heading in navy with soft blue drop) or `r-drop` (white sunken well) | |

## Controls

| Modern | Retro | Notes |
|---|---|---|
| Primary button | `r-btn r-default` | Bold label, grey face. No brand fill. |
| Secondary / ghost / outline button | `r-btn` | All buttons are the same grey bevel. |
| Destructive button | `r-btn` | Danger lives in the confirm dialog (`warning` icon), not in a red button. |
| Icon-only button | `r-btn r-square` with a 16px icon | Keep `aria-label`. |
| Toggle button / segmented control | `r-btn` with `aria-pressed="true"` for the on state, side by side | Pressed = inverted bevel + light face. |
| Link | `r-link` (blue, underlined) in running text | Nav links inside `r-list` stay plain. |
| Text input, search | `r-input` (white sunken well) | A leading search icon sits absolutely inside, with left padding. Pill shapes become square. |
| Textarea | `r-textarea` | |
| Select / combobox trigger | `r-select` (native) | Custom select components: style the trigger as `r-select` look-alike and its list as `r-menu`. |
| Switch / toggle | `label.r-check` checkbox | Same `checked` state and handler. There are no switches in this world. |
| Checkbox | `label.r-check > input + span` | |
| Radio | `label.r-radio > input + span` | Radios are the one round thing. |
| Slider | `input.r-slider` | Bevelled thumb on a sunken track. |
| Date / colour pickers | Native input with `r-input`; popover as `r-window` | |
| Form label | `r-label`; helper text `r-hint` | |

## Overlays and feedback

| Modern | Retro | Notes |
|---|---|---|
| Dropdown menu / popover menu | `r-menu` under the trigger, trigger gets `aria-expanded` | Hover and focus = navy row, white text. Separators: `hr`. Shortcuts: `r-shortcut`. |
| Context menu | `r-menu` at pointer | |
| Modal / dialog | `r-window r-dialog` inside `r-backdrop` (dithered dim), or `<dialog class="r-window">` | Title bar with a working `×` that calls the existing close. Actions in `r-dialog-actions` (centred), in their original order; the primary one gets `r-default`. |
| Alert / confirm | Dialog with a 32px `warning`, `error`, `info` or `help` icon left of the text | |
| Drawer / sheet | A `r-window` docked to the edge | Same open/close state. |
| Toast / snackbar | `r-balloon r-tray-balloon` (pale yellow, black outline; fixed bottom-right, above modals) | Bold first line with a 16px status icon, close as small `r-tb`. Add `r-no-tail` when there is no taskbar to point at. |
| Tooltip | `r-balloon r-no-tail` small, or native `title` | |
| Inline alert / banner | `r-balloon r-no-tail` full width, or a `r-group` with an icon | |
| Loading spinner | `r-progress` (indeterminate crawl) | Spinners don't exist here. |
| Upload drop zone | `r-drop` (white sunken well) with the 32px `upload` icon | Dashed borders go; the well says "drop here". |
| Progress bar | `r-meter` blocks (count = round(pct / 5), out of 20) or `r-progress r-determinate` | Keep `role="progressbar"` and `aria-value*`. |
| Skeleton loader | `r-well` blocks, no shimmer | |
| Badge / pill / chip | `r-tag` (`r-good`, `r-bad`, `r-plain`) | Square, small, bold. |
| Avatar | Initials in a `r-btn`-like square, or image in `r-frame` with `image-rendering: pixelated` | No circles. |

## Data

| Modern | Retro | Notes |
|---|---|---|
| Table | `r-table` inside `r-table-wrap` | Headers are raised buttons. Numbers right-aligned in `r-num-cell` (VT323). Selected row navy. Uppercase tracked headers become plain case. |
| List of items | `r-list` in `r-pane` | |
| File / tree view | `r-list` with `r-indent` levels and folder/file icons | |
| Tabs | `r-tabs` + `r-tab` + `r-tabpanel` | Selected tab rises and joins the panel. Underline-style tabs become this. |
| Accordion | `r-group` per section with a `r-btn r-square` toggle (`+` / `-`) in the legend row | |
| Charts | Keep the chart, restyle: flat fills from the token palette, 1px black axes, VT323 labels, no gradients or rounded bars, chart sits in a `r-well` | |
| Code / terminal | Black `r-well` with VT323, green or white text | |
| Number readouts (sizes, durations, counts) | `r-readout` (white sunken) or `r-lcd` (black, green digits) | |
| Images, video | Inside `r-frame` (sunken border) | |
