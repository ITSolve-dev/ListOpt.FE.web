export const AXE_RULES = [
	// Consider http://go/prcpg for expert review of the aXe rules.
	{
		id: "accesskeys",
		enabled: true,
	},
	{
		id: "area-alt",
		enabled: false,
	},
	{
		id: "aria-allowed-role",
		enabled: true,
	},
	{
		id: "aria-braille-equivalent",
		enabled: false,
	},
	{
		id: "aria-conditional-attr",
		enabled: true,
	},
	{
		id: "aria-deprecated-role",
		enabled: true,
	},
	{
		id: "aria-dialog-name",
		enabled: true,
	},
	{
		id: "aria-prohibited-attr",
		enabled: true,
	},
	{
		id: "aria-roledescription",
		enabled: false,
	},
	{
		id: "aria-treeitem-name",
		enabled: true,
	},
	{
		id: "aria-text",
		enabled: true,
	},
	{
		id: "audio-caption",
		enabled: false,
	},
	{
		id: "blink",
		enabled: false,
	},
	{
		id: "duplicate-id",
		enabled: false,
	},
	{
		id: "empty-heading",
		enabled: false,
	},
	{
		id: "frame-focusable-content",
		enabled: false,
	},
	{
		id: "frame-title-unique",
		enabled: false,
	},
	{
		id: "heading-order",
		enabled: true,
	},
	{
		id: "html-xml-lang-mismatch",
		enabled: true,
	},
	{
		id: "identical-links-same-purpose",
		enabled: true,
	},
	{
		id: "image-redundant-alt",
		enabled: true,
	},
	{
		id: "input-button-name",
		enabled: true,
	},
	{
		id: "label-content-name-mismatch",
		enabled: false,
	},
	{
		id: "landmark-one-main",
		enabled: true,
	},
	{
		id: "link-in-text-block",
		enabled: true,
	},
	{
		id: "marquee",
		enabled: false,
	},
	{
		id: "meta-viewport",
		enabled: true,
	},
	// https://github.com/dequelabs/axe-core/issues/2958
	{
		id: "nested-interactive",
		enabled: false,
	},
	{
		id: "no-autoplay-audio",
		enabled: false,
	},
	{
		id: "role-img-alt",
		enabled: false,
	},
	{
		id: "scrollable-region-focusable",
		enabled: false,
	},
	{
		id: "select-name",
		enabled: true,
	},
	{
		id: "server-side-image-map",
		enabled: false,
	},
	{
		id: "skip-link",
		enabled: true,
	},
	// https://github.com/GoogleChrome/lighthouse/issues/16163
	{
		id: "summary-name",
		enabled: false,
	},
	{
		id: "svg-img-alt",
		enabled: false,
	},
	{
		id: "tabindex",
		enabled: true,
	},
	{
		id: "table-duplicate-name",
		enabled: true,
	},
	{
		id: "table-fake-caption",
		enabled: true,
	},
	{
		id: "target-size",
		enabled: true,
	},
	{
		id: "td-has-header",
		enabled: true,
	},
];

export const AXE_OUTPUT_DIR_PATH = ".";
export const AXE_OUTPUT_DIR = "accessibility-report";
export const AXE_OUTPUT_NAME_POSTFIX = "-accessibility.html";
