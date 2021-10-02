export default (json) => {
     let output = "";

     // A
     if (json.alignContent) output += `\t\talign-content:${json.alignContent};\n`;
     if (json.alignItems) output += `\t\talign-items:${json.alignItems};\n`;
     if (json.alignSelf) output += `\t\talign-self:${json.alignSelf};\n`;

     if (json.all) outpt += `\t\tall: ${json.all};\n`;

     if (json.animation) output += `\t\tanimation:${json.animation};\n`;
     if (json.animationDelay) output += `\t\tanimation-delay:${json.animationDelay};\n`;
     if (json.animationDuration) output += `\t\tanimation-duration:${json.animationDuration};\n`;
     if (json.animationFillMode) output += `\t\tanimation-fill-mode${json.animationFillMode};\n`;
     if (json.animationIterationCount)
          output += `\t\tanimation-iteration-count:${json.animationIterationCount};\n`;
     if (json.animationName) output += `\t\tanimation-name:${json.animationName};\n`;
     if (json.animationPlayState)
          output += `\t\tanimation-play-state:${json.animationPlayState};\n`;
     if (json.animationTimingFunction)
          output += `\t\tanimation-timing-function:${json.animationTimingFunction};\n`;

     // B
     if (json.backfaceVisibility) output += `\t\tbackface-visibility:${json.backfaceVisibility};\n`;

     if (json.background) output += `\t\tbackground:${json.background};\n`;
     if (json.backgroundAttachment)
          output += `\t\tbackground-attachment:${json.backgroundAttachment};\n`;
     if (json.backgroundBlendMode)
          output += `\t\tbackground-blend-mode:${json.backgroundBlendMode};\n`;
     if (json.backgroundClip) output += `\t\tbackground-clip:${json.backgroundClip};\n`;
     if (json.backgroundColor) output += `\t\tbackground-color:${json.backgroundColor};\n`;
     if (json.backgroundImage) output += `\t\tbackground-image:${json.backgroundImage};\n`;
     if (json.backgroundOrigin) output += `\t\tbackground-origin:${json.backgroundOrigin};\n`;
     if (json.backgroundPosition) output += `\t\tbackground-position:${json.backgroundPosition};\n`;
     if (json.backgroundRepeat) output += `\t\tbackground-repeat:${json.backgroundRepeat};\n`;
     if (json.backgroundSize) output += `\t\tbackground-size:${json.backgroundSize};\n`;

     if (json.border) output += `\t\tborder:${json.border};\n`;
     if (json.borderCollapse) output += `\t\tborder-collapse:${json.borderCollapse};\n`;
     if (json.borderImage) output += `\t\tborder-image:${json.borderImage};\n`;
     if (json.borderImageOutset) output += `\t\tborder-image-outset:${json.borderImageOutset};\n`;
     if (json.borderImageRepeat) output += `\t\tborder-image-repeat:${json.borderImageRepeat};\n`;
     if (json.borderImageSlice) output += `\t\tborder-image-slice:${json.borderImageSlice};\n`;
     if (json.borderImageSource) output += `\t\tborder-image-source:${json.borderImageSource};\n`;
     if (json.borderImageWidth) output += `\t\tborder-image-width:${json.borderImageWidth};\n`;
     if (json.borderColor) output += `\t\tborder-color:${json.borderColor};\n`;
     if (json.borderStyle) output += `\t\tborder-style:${json.borderStyle};\n`;
     if (json.borderWidth) output += `\t\tborder-width:${json.borderWidth};\n`;
     if (json.borderBottom) output += `\t\tborder-bottom:${json.borderBottom};\n`;
     if (json.borderBottomColor) output += `\t\tborder-bottom-color:${json.borderBottomColor};\n`;
     if (json.borderBottomStyle) output += `\t\tborder-bottom-style:${json.borderBottomStyle};\n`;
     if (json.borderBottomWidth) output += `\t\tborder-bottom-width:${json.borderBottomWidth};\n`;
     if (json.borderLeft) output += `\t\tborder-left:${json.borderLeft};\n`;

     if (json.borderLeftColor) output += `\t\tborder-left-color:${json.borderLeftColor};\n`;
     if (json.borderLeftStyle) output += `\t\tborder-left-style:${json.borderLeftStyle};\n`;
     if (json.borderLeftWidth) output += `\t\tborder-left-width:${json.borderLeftWidth};\n`;
     if (json.borderRight) output += `\t\tborder-right:${json.borderRight};\n`;
     if (json.borderRightColor) output += `\t\tborder-right-color:${json.borderRightColor};\n`;
     if (json.borderRightStyle) output += `\t\tborder-right-style:${json.borderRightStyle};\n`;
     if (json.borderRightWidth) output += `\t\tborder-right-width:${json.borderRightWidth};\n`;
     if (json.borderTop) output += `\t\tborder-top:${json.borderTop};\n`;
     if (json.borderTopColor) output += `\t\tborder-top-color:${json.borderTopColor};\n`;
     if (json.borderTopStyle) output += `\t\tborder-top-style:${json.borderTopStyle};\n`;
     if (json.borderTopWidth) output += `\t\tborder-top-width:${json.borderTopWidth};\n`;
     if (json.borderRadius) output += `\t\tborder-radius:${json.borderRadius};\n`;
     if (json.borderBottomLeftRadius)
          output += `\t\tborder-bottom-left-radius:${json.borderBottomLeftRadius};\n`;
     if (json.borderBottomRightRadius)
          output += `\t\tborder-bottom-right-radius:${json.borderBottomRightRadius};\n`;
     if (json.borderTopLeftRadius)
          output += `\t\tborder-top-left-radius:${json.borderTopLeftRadius};\n`;
     if (json.borderTopRightRadius)
          output += `\t\tborder-top-right-radius:${json.borderTopRightRadius};\n`;
     if (json.borderSpacing) output += `\t\tborder-spacing:${json.borderSpacing};\n`;

     if (json.bottom) output += `\t\tbottom:${json.bottom};\n`;
     if (json.boxDecorationBreak)
          output += `\t\tbox-decoration-break:${json.boxDecorationBreak};\n`;
     if (json.boxShadow) output += `\t\tbox-shadow:${json.boxShadow};\n`;
     if (json.boxSizing) output += `\t\tbox-sizing:${json.boxSizing};\n`;
     if (json.breakAfter) output += `\t\tbreak-after:${json.breakAfter};\n`;
     if (json.breakBefore) output += `\t\tbreak-before:${json.breakBefore};\n`;
     if (json.breakInside) breakInside = `\t\tbreak-inside:${json.breakInside};\n`;

     // C
     if (json.captionSide) output += `\t\tcaption-side:${json.captionSide};\n`;
     if (json.caretColor) ouput += `\t\tcaret-color:${json.caretColor};\n`;
     if (json.clear) output += `\t\tclear:${json.clear};\n`;
     if (json.clip) output += `\t\tclip:${json.clip};\n`;
     if (json.color) output += `\t\tcolor:${json.color};\n`;

     if (json.columnRule) output += `\t\tcolumn-rule:${json.columnRule};\n`;
     if (json.columnRuleColor) output += `\t\tcolumn-rule-color:${json.columnRuleColor};\n`;
     if (json.columnRuleStyle) output += `\t\tcolumn-rule-style:${json.columnRuleStyle};\n`;
     if (json.columnRuleWidth) output += `\t\tcolumn-rule-width:${json.columnRuleWidth};\n`;
     if (json.columnSpan) output += `\t\tcolumn-span:${json.columnSpan};\n`;

     if (json.columns) output += `\t\tcolumns:${json.columns};\n`;
     if (json.columnCount) output += `\t\tcolumn-count:${json.columnCount};\n`;
     if (json.columnWidth) output += `\t\tcolumn-width:${json.columnWidth};\n`;

     if (json.content) output += `\t\tcontent:${json.content};\n`;

     if (json.counterIncrement) output += `\t\tcounter-increment:${json.counterIncrement};\n`;
     if (json.counterReset) output += `\t\tcounter-reset:${json.counterReset};\n`;

     if (json.cursor) output += `\t\tcursor:${json.cursor};\n`;

     // D
     if (json.direction) output += `\t\tdirection:${json.direction};\n`;
     if (json.display) output += `\t\tdisplay:${json.display};\n`;

     // E
     if (json.emptyCells) output += `\t\tempty-cells:${json.emptyCells};\n`;

     // F
     if (json.filter) output += `\t\tfilter:${json.filter};\n`;
     if (json.flex) output += `\t\tflex:${json.flex};\n`;
     if (json.flexGrow) output += `\t\tflex-grow:${json.flexGrow};\n`;
     if (json.flexShrink) output += `\t\tflex-shrink:${json.flexShrink};\n`;
     if (json.flexBasis) output += `\t\tflex-basis:${json.flexBasis};\n`;
     if (json.flexFlow) output += `\t\tflex-flow:${json.flexFlow};\n`;
     if (json.flexDirection) output += `\t\tflex-direction:${json.flexDirection};\n`;
     if (json.flexWrap) output += `\t\tflex-wrap:${json.flexWrap};\n`;

     if (json.float) output += `\t\tfloat:${json.float};\n`;
     if (json.font) output += `\t\tfont:${json.font};\n`;
     if (json.fontFamily) output += `\t\tfont-family:${json.fontFamily};\n`;
     if (json.fontFeatureSettings)
          output += `\t\tfont-feature-settings:${json.fontFeatureSettings};\n`;
     if (json.fontKerning) output += `\t\tfont-kerning:${json.fontKerning};\n`;
     if (json.fontSize) output += `\t\tfont-size:${json.fontSize};\n`;
     if (json.fontSizeAdjust) output += `\t\tfont-size-adjust:${json.fontSizeAdjust};\n`;
     if (json.fontStretch) output += `\t\tfont-stretch:${json.fontStretch};\n`;
     if (json.fontStyle) output += `\t\tfont-style:${json.fontStyle};\n`;
     if (json.fontVariant) output += `\t\tfont-variant:${json.fontVariant};\n`;
     if (json.fontVariantCaps) output += `\t\tfont-variant-caps:${json.fontVariantCaps};\n`;
     if (json.fontWeight) output += `\t\tfont-weight:${json.fontWeight};\n`;

     // G
     if (json.gap) output += `\t\tgap:${json.gap};\n`;
     if (json.columnGap) output += `\t\tcolumn-gap:${json.columnGap};\n`;
     if (json.rowGap) output += `\t\trow-gap:${json.rowGap};\n`;

     if (json.grid) output += `\t\tgrid:${json.grid};\n`;

     if (json.gridArea) output += `\t\tgrid-area:${json.gridArea};\n`;
     if (json.gridAutoColumns) output += `\t\tgrid-auto-columns:${json.gridAutoColumns};\n`;
     if (json.gridAutoFlow) output += `\t\tgrid-auto-flow:${json.gridAutoFlow};\n`;
     if (json.gridAutoRows) output += `\t\tgrid-auto-rows:${json.gridAutoRows};\n`;

     if (json.gridColumn) output += `\t\tgrid-column:${json.gridColumn};\n`;
     if (json.gridColumnEnd) output += `\t\tgrid-column-end:${json.gridColumnEnd};\n`;
     if (json.gridColumnStart) output += `\t\tgrid-column-start:${json.gridColumnStart};\n`;

     if (json.gridGap) output += `\t\tgrid-gap:${json.gridGap};\n`;
     if (json.gridRowGap) output += `\t\tgrid-row-gap:${json.gridRowGap};\n`;
     if (json.gridColumnGap) output += `\t\tgrid-column-gap:${json.gridColumnGap};\n`;

     if (json.gridRow) output += `\t\tgrid-row:${json.gridRow};\n`;
     if (json.gridRowEnd) output += `\t\tgrid-row-end:${json.gridRowEnd};\n`;
     if (json.gridRowStart) output += `\t\tgrid-row-start:${json.gridRowStart};\n`;

     if (json.gridTemplate) output += `\t\tgrid-template:${json.gridTemplate};\n`;
     if (json.gridTemplateAreas) output += `\t\tgrid-template-areas:${json.gridTemplateAreas};\n`;
     if (json.gridTemplateColumns)
          output += `\t\tgrid-template-columns:${json.gridTemplateColumns}:\n`;
     if (json.gridTemplateRows) output += `\t\tgrid-template-rows:${json.gridTemplateRows};\n`;

     // H
     if (json.hangingPunctuation) output += `\t\thanging-punctuation:${json.hangingPunctuation};\n`;
     if (json.height) output += `\t\theight:${json.height};\n`;
     if (json.hyphens) output += `\t\thyphens:${json.hyphens};\n`;

     // I
     if (json.isolation) output += `\t\tisolation:${json.isolation};\n`;

     // J
     if (json.justifyContent) output += `\t\tjustify-content:${json.justifyContent};\n`;

     // K

     // L
     if (json.left) output += `\t\tleft:${json.left};\n`;
     if (json.letterSpacing) output += `\t\tletter-spacing:${json.letterSpacing};\n`;
     if (json.lineHeight) output += `\t\tline-height:${json.lineHeight};\n`;
     if (json.listStyle) output += `\t\tlist-style:${json.listStyle}\n`;
     if (json.listStyleImage) output += `\t\tlist-style-image:${json.listStyleImage};\n`;
     if (json.listStylePosition) output += `\t\tlist-style-position:${json.listStylePosition};\n`;
     if (json.listStyleType) output = `\t\tlist-style-type:${json.listStyleType};\n`;

     // M
     if (json.margin) output += `\t\tmargin:${json.margin};\n`;
     if (json.marginBottom) output += `\t\tmargin-bottom:${json.marginBottom};\n`;
     if (json.marginLeft) output += `\t\tmargin-left:${json.marginLeft};\n`;
     if (json.marginRight) output += `\t\tmargin-right:${json.marginRight};\n`;
     if (json.marginTop) output += `\t\tmargin-top:${json.marginTop};\n`;
     if (json.maxHeight) output += `\t\tmax-height:${json.maxHeight};\n`;
     if (json.maxWidth) output += `\t\tmax-width:${json.maxWidth};\n`;
     if (json.minHeight) output += `\t\tmin-height:${json.minHeight};\n`;
     if (json.minWidth) output += `\t\tmin-width:${json.minWidth};\n`;
     if (json.mixBlendMode) output = `\t\tmix-blend-mode:${json.mixBlendMode};\n`;

     // O
     if (json.objectFit) output += `\t\tobject-fit:${json.objectFit};\n`;
     if (json.objectPosition) output += `\t\tobject-position:${json.objectPosition};\n`;
     if (json.opacity) output += `\t\topacity:${json.opacity};\n`;
     if (json.order) output += `\t\torder:${json.order};\n`;
     if (json.outline) output += `\t\toutline:${json.outline};\n`;
     if (json.outlineColor) output += `\t\toutline-color:${json.outlineColor};\n`;
     if (json.outlineStyle) output += `\t\toutline-style:${json.outlineStyle};\n`;
     if (json.outlineWidth) output += `outline-width:${json.outlineWidth};\n`;
     if (json.overflow) output += `overflow:${json.overflow};\n`;
     if (json.overflowX) output += `overflow-x:${json.overflowX};\n`;
     if (json.overflowY) output += `overflow-y:${json.overflowY};\n`;

     // P
     if (json.padding) output += `\t\tpadding:${json.padding};\n`;
     if (json.paddingBottom) output += `\t\tpadding-bottom:${json.paddingBottom};\n`;
     if (json.paddingLeft) output += `\t\tpadding-left:${json.paddingLeft};\n`;
     if (json.paddingRight) output += `\t\tpadding-right:${json.paddingRight};\n`;
     if (json.paddingTop) output += `\t\tpadding-top:${json.paddingTop};\n`;
     if (json.pageBreakAfter) output += `\t\tpage-break-after:${json.pageBreakAfter};\n`;
     if (json.pageBreakBefore) output += `\t\tpage-break-before:${json.pageBreakBefore};\n`;
     if (json.pageBreakInside) output += `\t\tpage-break-inside:${json.pageBreakInside};\n`;
     if (json.perspective) output += `\t\tperspective:${json.perspective};\n`;
     if (json.perspectiveOrigin) output += `\t\tperspective-origin:${json.perspectiveOrigin};\n`;
     if (json.pointerEvents) output += `\t\tpointer-events:${json.pointerEvents};\n`;
     if (json.position) output += `\t\tposition:${json.position};\n`;

     // Q
     if (json.quotes) output += `\t\tquotes:${json.quotes};\n`;

     // R
     if (json.resize) output += `\t\tresize:${json.resize};\n`;
     if (json.right) output += `\t\tright:${json.right};\n`;

     // S
     if (json.scrollBehavior) output += `\t\tscroll-behavior:${json.scrollBehavior};\n`;

     // T
     if (json.tabSize) output += `\t\ttab-size:${json.tabSize};\n`;
     if (json.tableLayout) output += `\t\ttable-layout:${json.tableLayout};\n`;
     if (json.textAlign) output += `\t\ttext-align:${json.textAlign};\n`;
     if (json.textAlignLast) output += `\t\ttext-align-last:${json.textAlignLast};\n`;
     if (json.textDecoration) output += `\t\ttext-decoration:${json.textDecoration};\n`;
     if (json.textDecorationColor) output += `\t\ttext-decoration:${json.textDecorationColor};\n`;
     if (json.textDecorationLine)
          output += `\t\ttext-decoration-line:${json.textDecorationLine};\n`;
     if (json.textDecorationStyle)
          output += `\t\ttext-decoration-style:${json.textDecorationStyle};\n`;
     if (json.textIndent) output += `\t\ttext-indent:${json.textIndent};\n`;
     if (json.textJustify) output += `\t\ttext-justify:${json.textJustify};\n`;
     if (json.textOverflow) output += `\t\ttext-overflow:${json.textOverflow};\n`;
     if (json.textShadow) output += `\t\ttext-shadow:${json.textShadow};\n`;
     if (json.textTransform) output += `\t\ttext-transform:${json.textTransform};\n`;
     if (json.top) output += `\t\ttop:${json.top};\n`;
     if (json.transform) output += `\t\ttransform:${json.transform};\n`;
     if (json.transformOrigin) output += `\t\ttransform-origin:${json.transformOrigin};\n`;
     if (json.transformStyle) output += `\t\ttransform-style:${json.transformStyle};\n`;
     if (json.transition) output += `\t\ttransition:${json.transition};\n`;
     if (json.transitionDelay) output += `\t\ttransition-delay:${json.transitionDelay};\n`;
     if (json.transitionDuration) output += `\t\ttransition-duration:${json.transitionDuration};\n`;
     if (json.transitionProperty) output += `\t\ttransition-property:${json.transitionProperty};\n`;
     if (json.transitionFunction)
          output += `\t\ttransition-timing-function:${json.transitionTimingFunction};\n`;

     // U
     if (json.unicodeBidi) output += `\t\tunicode-bidi:${json.unicodeBidi};\n`;
     if (json.userSelect) output += `\t\tuser-select:${json.userSelect};\n`;

     // V
     if (json.verticalAlign) output += `\t\tvertical-align:${json.verticalAlign};\n`;
     if (json.visibility) output += `\t\tvisibility:${json.visibility};\n`;

     // W
     if (json.whiteSpace) output += `\t\twhite-space:${json.whiteSpace};\n`;
     if (json.width) output += `\t\twidth:${json.width};\n`;
     if (json.wordBreak) output += `\t\tword-break:${json.wordBreak};\n`;
     if (json.wordSpacing) output += `\t\tword-spacing:${json.wordSpacing};\n`;
     if (json.wordWrap) output += `\t\tword-wrap:${json.wordWrap};\n`;
     if (json.writingMode) output += `\t\twriting-mode:${json.writingMode};\n`;

     // Z
     if (json.zIndex) output += `\t\tz-index:${json.zIndex};\n`;

     return output;
};
