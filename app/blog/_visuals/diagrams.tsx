import v from "./visuals.module.css";

/* primitive → semantic → component, the three-layer token architecture */
export function TokenLayers() {
  return (
    <div className={v.bviz}>
      <div className={v.layers}>
        <div className={`${v.layer} ${v["layer--prim"]}`}>
          <span className={v.layerTag}>Primitive</span>
          <div><div className={v.layerName}>What values exist</div><div className={v.layerDesc}>carbon-900 = #0E0F12, ember-500 = #FF7A00, space-4 = 16px. Raw, named, opinion-free.</div></div>
        </div>
        <div className={v.layerArrow}>↓ referenced by</div>
        <div className={`${v.layer} ${v["layer--sem"]}`}>
          <span className={v.layerTag}>Semantic</span>
          <div><div className={v.layerName}>What they mean</div><div className={v.layerDesc}>--surface = carbon-900, --accent = ember-500, --danger = scarlet-500. Intent, not hex.</div></div>
        </div>
        <div className={v.layerArrow}>↓ referenced by</div>
        <div className={`${v.layer} ${v["layer--comp"]}`}>
          <span className={v.layerTag}>Component</span>
          <div><div className={v.layerName}>Where they apply</div><div className={v.layerDesc}>button-bg = --accent, card-surface = --surface. Each layer only points at the one below it.</div></div>
        </div>
      </div>
    </div>
  );
}
