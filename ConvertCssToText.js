export default (json) => {
     let output = "";

     // A
     if (json.alignContent) output += `\talign-content:${json.alignContent};\n`;
     if (json.alignItems) output += `\talign-items:${json.alignItems};\n`;
     if (json.alignSelf) output += `\talign-self:${json.alignSelf};\n`;

     if (json.all) outpt += `\tall: ${json.all};\n`;

     if (json.animation) output += `\tanimation:${json.animation};\n`;
     if (json.animationDelay) output += `\tanimation-delay:${json.animationDelay};\n`;
     if (json.animationDuration) output += `\tanimation-duration:${json.animationDuration};\n`;
     if (json.animationFillMode) output += `\tanimation-fill-mode${json.animationFillMode};\n`;
     if (json.animationIterationCount)
          output += `\tanimation-iteration-count:${json.animationIterationCount};\n`;
     if (json.animationName) output += `\tanimation-name:${json.animationName};\n`;
     if (json.animationPlayState) output += `\tanimation-play-state:${json.animationPlayState};\n`;
     if (json.animationTimingFunction)
          output += `\tanimation-timing-function:${json.animationTimingFunction};\n`;

     // B
     if (json.backfaceVisibility) output += `\tbackface-visibility:${json.backfaceVisibility};\n`;

     if (json.background) output += `\tbackground:${json.background};\n`;
     if (json.backgroundAttachment)
          output += `\tbackground-attachment:${json.backgroundAttachment};\n`;
     if (json.backgroundBlendMode)
          output += `\tbackground-blend-mode:${json.backgroundBlendMode};\n`;
     if (json.backgroundClip) output += `\tbackground-clip:${json.backgroundClip};\n`;
     if (json.backgroundImage) output += `\tbackground-image:${json.backgroundImage};\n`;
     if (json.backgroundOrigin) output += `\tbackground-origin:${json.backgroundOrigin};\n`;
     if (json.backgroundPosition) output += `\tbackground-position:${json.backgroundPosition};\n`;
     if (json.backgroundRepeat) output += `\tbackground-repeat:${json.backgroundRepeat};\n`;
     if (json.backgroundSize) output += `\tbackground-size:${json.backgroundSize};\n`;

     if (json.border) output += `\tborder:${json.border};\n`;
     if (json.borderCollapse) output += `\tborder-collapse:${json.borderCollapse};\n`;
     if (json.borderImage) output += `\tborder-image:${json.borderImage};\n`;
     if (json.borderImageOutset) output += `\tborder-image-outset:${json.borderImageOutset};\n`;
     if (json.borderImageRepeat) output += `\tborder-image-repeat:${json.borderImageRepeat};\n`;
     if (json.borderImageSlice) output += `\tborder-image-slice:${json.borderImageSlice};\n`;
     if (json.borderImageSource) output += `\tborder-image-source:${json.borderImageSource};\n`;
     if (json.borderImageWidth) output += `\tborder-image-width:${json.borderImageWidth};\n`;
     if (json.borderColor) output += `\tborder-color:${json.borderColor};\n`;
     if (json.borderStyle) output += `\tborder-style:${json.borderStyle};\n`;
     if (json.borderWidth) output += `\tborder-width:${json.borderWidth};\n`;
     if (json.borderBottom) output += `\tborder-bottom:${json.borderBottom};\n`;
     if (json.borderBottomColor) output += `\tborder-bottom-color:${json.borderBottomColor};\n`;
     if (json.borderBottomStyle) output += `\tborder-bottom-style:${json.borderBottomStyle};\n`;
     if (json.borderBottomWidth) output += `\tborder-bottom-width:${json.borderBottomWidth};\n`;
     if (json.borderLeft) output += `\tborder-left:${json.borderLeft};\n`;

     if (json.borderLeftColor) output += `\tborder-left-color:${json.borderLeftColor};\n`;
     if (json.borderLeftStyle) output += `\tborder-left-style:${json.borderLeftStyle};\n`;
     if (json.borderLeftWidth) output += `\tborder-left-width:${json.borderLeftWidth};\n`;
     if (json.borderRight) output += `\tborder-right:${json.borderRight};\n`;
     if (json.borderRightColor) output += `\tborder-right-color:${json.borderRightColor};\n`;
     if (json.borderRightStyle) output += `\tborder-right-style:${json.borderRightStyle};\n`;
     if (json.borderRightWidth) output += `\tborder-right-width:${json.borderRightWidth};\n`;
     if (json.borderTop) output += `\tborder-top:${json.borderTop};\n`;
     if (json.borderTopColor) output += `\tborder-top-color:${json.borderTopColor};\n`;
     if (json.borderTopStyle) output += `\tborder-top-style:${json.borderTopStyle};\n`;
     if (json.borderTopWidth) output += `\tborder-top-width:${json.borderTopWidth};\n`;
     if (json.borderRadius) output += `\tborder-radius:${json.borderRadius};\n`;
     if (json.borderBottomLeftRadius)
          output += `\tborder-bottom-left-radius:${json.borderBottomLeftRadius};\n`;
     if (json.borderBottomRightRadius)
          output += `\tborder-bottom-right-radius:${json.borderBottomRightRadius};\n`;
     if (json.borderTopLeftRadius)
          output += `\tborder-top-left-radius:${json.borderTopLeftRadius};\n`;
     if (json.borderTopRightRadius)
          output += `\tborder-top-right-radius:${json.borderTopRightRadius};\n`;
     if (json.borderSpacing) output += `\tborder-spacing:${json.borderSpacing};\n`;

     if (json.bottom) output += `\tbottom:${json.bottom};\n`;
     if (json.boxDecorationBreak) output += `\tbox-decoration-break:${json.boxDecorationBreak};\n`;
     if (json.boxShadow) output += `\tbox-shadow:${json.boxShadow};\n`;
     if (json.boxSizing) output += `\tbox-sizing:${json.boxSizing};\n`;
     if (json.breakAfter) output += `\tbreak-after:${json.breakAfter};\n`;
     if (json.breakBefore) output += `\tbreak-before:${json.breakBefore};\n`;
     if (json.breakInside) breakInside = `\tbreak-inside:${json.breakInside};\n`;

     // C
     if (json.captionSide) output += `\tcaption-side:${json.captionSide};\n`;
     if (json.caretColor) ouput += `\tcaret-color:${json.caretColor};\n`;
     if (json.clear) output += `\tclear:${json.clear};\n`;
     if (json.clip) output += `\tclip:${json.clip};\n`;
     if (json.color) output += `\tcolor:${json.color};\n`;

     if (json.columnRule) output += `\tcolumn-rule:${json.columnRule};\n`;
     if (json.columnRuleColor) output += `\tcolumn-rule-color:${json.columnRuleColor};\n`;
     if (json.columnRuleStyle) output += `\tcolumn-rule-style:${json.columnRuleStyle};\n`;
     if (json.columnRuleWidth) output += `\tcolumn-rule-width:${json.columnRuleWidth};\n`;
     if (json.columnSpan) output += `\tcolumn-span:${json.columnSpan};\n`;

     if (json.columns) output += `\tcolumns:${json.columns};\n`;
     if (json.columnCount) output += `\tcolumn-count:${json.columnCount};\n`;
     if (json.columnWidth) output += `\tcolumn-width:${json.columnWidth};\n`;

     if (json.content) output += `\tcontent:${json.content};\n`;

     if (json.counterIncrement) output += `\tcounter-increment:${json.counterIncrement};\n`;
     if (json.counterReset) output += `\tcounter-reset:${json.counterReset};\n`;

     if (json.cursor) output += `\tcursor:${json.cursor};\n`;

     // D
     if (json.direction) output += `\tdirection:${json.direction};\n`;
     if (json.display) output += `\tdisplay:${json.display};\n`;

     // E
     if (json.emptyCells) output += `\tempty-cells:${json.emptyCells};\n`;

     // F
     if (json.filter) output += `\tfilter:${json.filter};\n`;
     if (json.flex) output += `\tflex:${json.flex};\n`;
     if (json.flexGrow) output += `\tflex-grow:${json.flexGrow};\n`;
     if (json.flexShrink) output += `\tflex-shrink:${json.flexShrink};\n`;
     if (json.flexBasis) output += `\tflex-basis:${json.flexBasis};\n`;
     if (json.flexFlow) output += `\tflex-flow:${json.flexFlow};\n`;
     if (json.flexDirection) output += `\tflex-direction:${json.flexDirection};\n`;
     if (json.flexWrap) output += `\tflex-wrap:${json.flexWrap};\n`;

     if (json.float) output += `\tfloat:${json.float};\n`;
     if (json.font) output += `\tfont:${json.font};\n`;
     if (json.fontFamily) output += `\tfont-family:${json.fontFamily};\n`;
     if (json.fontFeatureSettings)
          output += `\tfont-feature-settings:${json.fontFeatureSettings};\n`;
     if (json.fontKerning) output += `\tfont-kerning:${json.fontKerning};\n`;
     if (json.fontSize) output += `\tfont-size:${json.fontSize};\n`;
     if (json.fontSizeAdjust) output += `\tfont-size-adjust:${json.fontSizeAdjust};\n`;
     if (json.fontStretch) output += `\tfont-stretch:${json.fontStretch};\n`;
     if (json.fontStyle) output += `\tfont-style:${json.fontStyle};\n`;
     if (json.fontVariant) output += `\tfont-variant:${json.fontVariant};\n`;
     if (json.fontVariantCaps) output += `\tfont-variant-caps:${json.fontVariantCaps};\n`;
     if (json.fontWeight) output += `\tfont-weight:${json.fontWeight};\n`;

     // G
     if (json.gap) output += `\tgap:${json.gap};\n`;
     if (json.columnGap) output += `\tcolumn-gap:${json.columnGap};\n`;
     if (json.rowGap) output += `\trow-gap:${json.rowGap};\n`;

     if (json.grid) output += `\tgrid:${json.grid};\n`;

     if (json.gridArea) output += `\tgrid-area:${json.gridArea};\n`;
     if (json.gridAutoColumns) output += `\tgrid-auto-columns:${json.gridAutoColumns};\n`;
     if (json.gridAutoFlow) output += `\tgrid-auto-flow:${json.gridAutoFlow};\n`;
     if (json.gridAutoRows) output += `\tgrid-auto-rows:${json.gridAutoRows};\n`;

     if (json.gridColumn) output += `\tgrid-column:${json.gridColumn};\n`;
     if (json.gridColumnEnd) output += `\tgrid-column-end:${json.gridColumnEnd};\n`;
     if (json.gridColumnStart) output += `\tgrid-column-start:${json.gridColumnStart};\n`;

     if (json.gridGap) output += `\tgrid-gap:${json.gridGap};\n`;
     if (json.gridRowGap) output += `\tgrid-row-gap:${json.gridRowGap};\n`;
     if (json.gridColumnGap) output += `\tgrid-column-gap:${json.gridColumnGap};\n`;

     if (json.gridRow) output += `\tgrid-row:${json.gridRow};\n`;
     if (json.gridRowEnd) output += `\tgrid-row-end:${json.gridRowEnd};\n`;
     if (json.gridRowStart) output += `\tgrid-row-start:${json.gridRowStart};\n`;

     if (json.gridTemplate) output += `\tgrid-template:${json.gridTemplate};\n`;
     if (json.gridTemplateAreas) output += `\tgrid-template-areas:${json.gridTemplateAreas};\n`;
     if (json.gridTemplateColumns)
          output += `\tgrid-template-columns:${json.gridTemplateColumns}:\n`;
     if (json.gridTemplateRows) output += `\tgrid-template-rows:${json.gridTemplateRows};\n`;

     // H
     if (json.hangingPunctuation) output += `\thanging-punctuation:${json.hangingPunctuation};\n`;
     if (json.height) output += `\theight:${json.height};\n`;
     if (json.hyphens) output += `\thyphens:${json.hyphens};\n`;

     // I
     if (json.isolation) output += `\tisolation:${json.isolation};\n`;

     // J
     if (json.justifyContent) output += `\tjustify-content:${json.justifyContent};\n`;

     // K

     // L
     if (json.left) output += `\tleft:${json.left};\n`;
     if (json.letterSpacing) output += `\tletter-spacing:${json.letterSpacing};\n`;
     if (json.lineHeight) output += `\tline-height:${json.lineHeight};\n`;
     if (json.listStyle) output += `\tlist-style:${json.listStyle}\n`;
     if (json.listStyleImage) output += `\tlist-style-image:${json.listStyleImage};\n`;
     if (json.listStylePosition) output += `\tlist-style-position:${json.listStylePosition};\n`;
     if (json.listStyleType) output = `\tlist-style-type:${json.listStyleType};\n`;

     // M
     if (json.margin) output += `\tmargin:${json.margin};\n`;
     if (json.marginBottom) output += `\tmargin-bottom:${json.marginBottom};\n`;
     if (json.marginLeft) output += `\tmargin-left:${json.marginLeft};\n`;
     if (json.marginRight) output += `\tmargin-right:${json.marginRight};\n`;
     if (json.marginTop) output += `\tmargin-top:${json.marginTop};\n`;
     if (json.maxHeight) output += `\tmax-height:${json.maxHeight};\n`;
     if (json.maxWidth) output += `\tmax-width:${json.maxWidth};\n`;
     if (json.minHeight) output += `\tmin-height:${json.minHeight};\n`;
     if (json.minWidth) output += `\tmin-width:${json.minWidth};\n`;
     if (json.mixBlendMode) output = `\tmix-blend-mode:${json.mixBlendMode};\n`;

     // O
     if (json.objectFit) output += `\tobject-fit:${json.objectFit};\n`;
     if (json.objectPosition) output += `\tobject-position:${json.objectPosition};\n`;
     if (json.opacity) output += `\topacity:${json.opacity};\n`;
     if (json.order) output += `\torder:${json.order};\n`;
     if (json.outline) output += `\toutline:${json.outline};\n`;
     if (json.outlineColor) output += `\toutline-color:${json.outlineColor};\n`;
     if (json.outlineStyle) output += `\toutline-style:${json.outlineStyle};\n`;
     if (json.outlineWidth) output += `outline-width:${json.outlineWidth};\n`;
     if (json.overflow) output += `overflow:${json.overflow};\n`;
     if (json.overflowX) output += `overflow-x:${json.overflowX};\n`;
     if (json.overflowY) output += `overflow-y:${json.overflowY};\n`;

     // P
     if (json.padding) output += `\tpadding:${json.padding};\n`;
     if (json.paddingBottom) output += `\tpadding-bottom:${json.paddingBottom};\n`;
     if (json.paddingLeft) output += `\tpadding-left:${json.paddingLeft};\n`;
     if (json.paddingRight) output += `\tpadding-right:${json.paddingRight};\n`;
     if (json.paddingTop) output += `\tpadding-top:${json.paddingTop};\n`;
     if (json.pageBreakAfter) output += `\tpage-break-after:${json.pageBreakAfter};\n`;
     if (json.pageBreakBefore) output += `\tpage-break-before:${json.pageBreakBefore};\n`;
     if (json.pageBreakInside) output += `\tpage-break-inside:${json.pageBreakInside};\n`;
     if (json.perspective) output += `\tperspective:${json.perspective};\n`;
     if (json.perspectiveOrigin) output += `\tperspective-origin:${json.perspectiveOrigin};\n`;
     if (json.pointerEvents) output += `\tpointer-events:${json.pointerEvents};\n`;
     if (json.position) output += `\tposition:${json.position};\n`;

     // Q
     if (json.quotes) output += `\tquotes:${json.quotes};\n`;

     // R
     if (json.resize) output += `\tresize:${json.resize};\n`;
     if (json.right) output += `\tright:${json.right};\n`;

     // S
     if (json.scrollBehavior) output += `\tscroll-behavior:${json.scrollBehavior};\n`;

     // T
     if (json.tabSize) output += `\ttab-size:${json.tabSize};\n`;
     if (json.tableLayout) output += `\ttable-layout:${json.tableLayout};\n`;
     if (json.textAlign) output += `\ttext-align:${json.textAlign};\n`;
     if (json.textAlignLast) output += `\ttext-align-last:${json.textAlignLast};\n`;
     if (json.textDecoration) output += `\ttext-decoration:${json.textDecoration};\n`;
     if (json.textDecorationColor) output += `\ttext-decoration:${json.textDecorationColor};\n`;
     if (json.textDecorationLine) output += `\ttext-decoration-line:${json.textDecorationLine};\n`;
     if (json.textDecorationStyle)
          output += `\ttext-decoration-style:${json.textDecorationStyle};\n`;
     if (json.textIndent) output += `\ttext-indent:${json.textIndent};\n`;
     if (json.textJustify) output += `\ttext-justify:${json.textJustify};\n`;
     if (json.textOverflow) output += `\ttext-overflow:${json.textOverflow};\n`;
     if (json.textShadow) output += `\ttext-shadow:${json.textShadow};\n`;
     if (json.textTransform) output += `\ttext-transform:${json.textTransform};\n`;
     if (json.top) output += `\ttop:${json.top};\n`;
     if (json.transform) output += `\ttransform:${json.transform};\n`;
     if (json.transformOrigin) output += `\ttransform-origin:${json.transformOrigin};\n`;
     if (json.transformStyle) output += `\ttransform-style:${json.transformStyle};\n`;
     if (json.transition) output += `\ttransition:${json.transition};\n`;
     if (json.transitionDelay) output += `\ttransition-delay:${json.transitionDelay};\n`;
     if (json.transitionDuration) output += `\ttransition-duration:${json.transitionDuration};\n`;
     if (json.transitionProperty) output += `\ttransition-property:${json.transitionProperty};\n`;
     if (json.transitionFunction)
          output += `\ttransition-timing-function:${json.transitionTimingFunction};\n`;

     // U
     if (json.unicodeBidi) output += `\tunicode-bidi:${json.unicodeBidi};\n`;
     if (json.userSelect) output += `\tuser-select:${json.userSelect};\n`;

     // V
     if (json.verticalAlign) output += `\tvertical-align:${json.verticalAlign};\n`;
     if (json.visibility) output += `\tvisibility:${json.visibility};\n`;

     // W
     if (json.whiteSpace) output += `\twhite-space:${json.whiteSpace};\n`;
     if (json.width) output += `\twidth:${json.width};\n`;
     if (json.wordBreak) output += `\tword-break:${json.wordBreak};\n`;
     if (json.wordSpacing) output += `\tword-spacing:${json.wordSpacing};\n`;
     if (json.wordWrap) output += `\tword-wrap:${json.wordWrap};\n`;
     if (json.writingMode) output += `\twriting-mode:${json.writingMode};\n`;

     // Z
     if (json.zIndex) output += `\tz-index:${json.zIndex};\n`;

     return output;
};
