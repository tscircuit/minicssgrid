/* ────────────────────────────────────────────────────────
      The class skeleton
      ──────────────────────────────────────────────────────── */
export class CssGrid {
	private readonly opts: CssGridOptions;

	constructor(opts: CssGridOptions) {
		this.opts = opts;
		// 1. normalise templates → list of track sizes
		// 2. compute cell positions & final matrix
	}

	/** Returns the computed layout matrix, ready for rendering elsewhere */
	public layout(): /* your own matrix type */ {
		// …
	};
}
