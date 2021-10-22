export default (attrs) => {
     const output = {};

     // A
     if (attrs.alignContent) output.alignContent = attrs.alignContent;
     if (attrs.alignItems) output.alignItems = attrs.alignItems;
     if (attrs.alignSelf) output.alignSelf = attrs.alignSelf;

     if (attrs.all) output.all = attrs.all;

     if (attrs.animation) output.animation = attrs.animation;
     if (attrs.animationDelay) output.animationDelay = attrs.animationDelay;
     if (attrs.animationDuration) output.animationDuration = attrs.animationDuration;
     if (attrs.animationFillMode) output.animationFillMode = attrs.animationFillMode;
     if (attrs.animationIterationCount)
          output.animationIterationCount = attrs.animationIterationCount;
     if (attrs.animationName) output.animationName = attrs.animationName;
     if (attrs.animationPlayState) output.animationPlayState = attrs.animationPlayState;
     if (attrs.animationTimingFunction)
          output.animationTimingFunction = attrs.animationTimingFunction;

     // B
     if (attrs.backfaceVisibility) output.backfaceVisibility = attrs.backfaceVisibility;

     if (attrs.background) output.background = attrs.background;
     if (attrs.backgroundAttachment) output.backgroundAttachment = attrs.backgroundAttachment;
     if (attrs.backgroundBlendMode) output.backgroundBlendMode = attrs.backgroundBlendMode;
     if (attrs.backgroundClip) output.backgroundClip = attrs.backgroundClip;
     if (attrs.backgroundColor) output.backgroundColor = attrs.backgroundColor;
     if (attrs.backgroundImage) output.backgroundImage = attrs.backgroundImage;
     if (attrs.backgroundOrigin) output.backgroundOrigin = attrs.backgroundOrigin;
     if (attrs.backgroundPosition) output.backgroundPosition = attrs.backgroundPosition;
     if (attrs.backgroundRepeat) output.backgroundRepeat = attrs.backgroundRepeat;
     if (attrs.backgroundSize) output.backgroundSize = attrs.backgroundSize;

     if (attrs.border) output.border = attrs.border;
     if (attrs.borderCollapse) output.borderCollapse = attrs.borderCollapse;
     if (attrs.borderImage) output.borderImage = attrs.borderImage;
     if (attrs.borderImageOutset) output.borderImageOutset = attrs.borderImageOutset;
     if (attrs.borderImageRepeat) output.borderImageRepeat = attrs.borderImageRepeat;
     if (attrs.borderImageSlice) output.borderImageSlice = attrs.borderImageSlice;
     if (attrs.borderImageSource) output.borderImageSource = attrs.borderImageSource;
     if (attrs.borderImageWidth) output.borderImageWidth = attrs.borderImageWidth;
     if (attrs.borderColor) output.borderColor = attrs.borderColor;
     if (attrs.borderStyle) output.borderStyle = attrs.borderStyle;
     if (attrs.borderWidth) output.borderWidth = attrs.borderWidth;
     if (attrs.borderBottom) output.borderBottom = attrs.borderBottom;
     if (attrs.borderBottomColor) output.borderBottomColor = attrs.borderBottomColor;
     if (attrs.borderBottomStyle) output.borderBottomStyle = attrs.borderBottomStyle;
     if (attrs.borderBottomWidth) output.borderBottomWidth = attrs.borderBottomWidth;
     if (attrs.borderLeft) output.borderLeft = attrs.borderLeft;
     if (attrs.borderLeftColor) output.borderLeftColor = attrs.borderLeftColor;
     if (attrs.borderLeftStyle) output.borderLeftStyle = attrs.borderLeftStyle;
     if (attrs.borderLeftWidth) output.borderLeftWidth = attrs.borderLeftWidth;
     if (attrs.borderRight) output.borderRight = attrs.borderRight;
     if (attrs.borderRightColor) output.borderRightColor = attrs.borderRightColor;
     if (attrs.borderRightStyle) output.borderRightStyle = attrs.borderRightStyle;
     if (attrs.borderRightWidth) output.borderRightWidth = attrs.borderRightWidth;
     if (attrs.borderTop) output.borderTop = attrs.borderTop;
     if (attrs.borderTopColor) output.borderTopColor = attrs.borderTopColor;
     if (attrs.borderTopStyle) output.borderTopStyle = attrs.borderTopStyle;
     if (attrs.borderTopWidth) output.borderTopWidth = attrs.borderTopWidth;
     if (attrs.borderRadius) output.borderRadius = attrs.borderRadius;
     if (attrs.borderBottomLeftRadius) output.borderBottomLeftRadius = attrs.borderBottomLeftRadius;
     if (attrs.borderBottomRightRadius)
          output.borderBottomRightRadius = attrs.borderBottomRightRadius;
     if (attrs.borderTopLeftRadius) output.borderTopLeftRadius = attrs.borderTopLeftRadius;
     if (attrs.borderTopRightRadius) output.borderTopRightRadius = attrs.borderTopRightRadius;
     if (attrs.borderSpacing) output.borderSpacing = attrs.borderSpacing;

     if (attrs.bottom) output.bottom = attrs.bottom;
     if (attrs.boxDecorationBreak) output.boxDecorationBreak = attrs.boxDecorationBreak;
     if (attrs.boxShadow) output.boxShadow = attrs.boxShadow;
     if (attrs.boxSizing) output.boxSizing = attrs.boxSizing;
     if (attrs.breakAfter) output.breakAfter = attrs.breakAfter;
     if (attrs.breakBefore) output.breakBefore = attrs.breakBefore;
     if (attrs.breakInside) output.breakInside = attrs.breakInside;

     // C
     if (attrs.captionSide) output.captionSide = attrs.captionSide;
     if (attrs.caretColor) output.caretColor = attrs.caretColor;
     if (attrs.clear) output.clear = attrs.clear;
     if (attrs.clip) output.clip = attrs.clip;
     if (attrs.color) output.color = attrs.color;

     if (attrs.columnRule) output.columnRule = attrs.columnRule;
     if (attrs.columnRuleColor) output.columnRuleColor = attrs.columnRuleColor;
     if (attrs.columnRuleStyle) output.columnRuleStyle = attrs.columnRuleStyle;
     if (attrs.columnRuleWidth) output.columnRuleWidth = attrs.columnRuleWidth;
     if (attrs.columnSpan) output.columnSpan = attrs.columnSpan;

     if (attrs.columns) output.columns = attrs.columns;
     if (attrs.columnCount) output.columnCount = attrs.columnCount;
     if (attrs.columnWidth) output.columnWidth = attrs.columnWidth;

     if (attrs.content) output.content = attrs.content;

     if (attrs.counterIncrement) output.counterIncrement = attrs.counterIncrement;
     if (attrs.counterReset) output.counterReset = attrs.counterReset;

     if (attrs.cursor) output.cursor = attrs.cursor;

     // D
     if (attrs.direction) output.direction = attrs.direction;
     if (attrs.display) output.display = attrs.display;

     // E
     if (attrs.emptyCells) output.emptyCells = attrs.emptyCells;

     // F
     if (attrs.filter) output.filter = attrs.filter;
     if (attrs.flex) output.flex = attrs.flex;
     if (attrs.flexGrow) output.flexGrow = attrs.flexGrow;
     if (attrs.flexShrink) output.flexShrink = attrs.flexShrink;
     if (attrs.flexBasis) output.flexBasis = attrs.flexBasis;
     if (attrs.flexFlow) output.flexFlow = attrs.flexFlow;
     if (attrs.flexDirection) output.flexDirection = attrs.flexDirection;
     if (attrs.flexWrap) output.flexWrap = attrs.flexWrap;

     if (attrs.float) output.float = attrs.float;
     if (attrs.font) output.font = attrs.font;
     if (attrs.fontFamily) output.fontFamily = attrs.fontFamily;
     if (attrs.fontFeatureSettings) output.fontFeatureSettings = attrs.fontFeatureSettings;
     if (attrs.fontKerning) output.fontKerning = attrs.fontKerning;
     if (attrs.fontSize) output.fontSize = attrs.fontSize;
     if (attrs.fontSizeAdjust) output.fontSizeAdjust = attrs.fontSizeAdjust;
     if (attrs.fontStretch) output.fontStretch = attrs.fontStretch;
     if (attrs.fontStyle) output.fontStyle = attrs.fontStyle;
     if (attrs.fontVariant) output.fontVariant = attrs.fontVariant;
     if (attrs.fontVariantCaps) output.fontVariantCaps = attrs.fontVariantCaps;
     if (attrs.fontWeight) output.fontWeight = attrs.fontWeight;

     // G
     if (attrs.gap) output.gap = attrs.gap;
     if (attrs.columnGap) output.columnGap = attrs.columnGap;
     if (attrs.rowGap) output.rowGap = attrs.rowGap;

     if (attrs.grid) output.grid = attrs.grid;

     if (attrs.gridArea) output.gridArea = attrs.gridArea;
     if (attrs.gridAutoColumns) output.gridAutoColumns = attrs.gridAutoColumns;
     if (attrs.gridAutoFlow) output.gridAutoFlow = attrs.gridAutoFlow;
     if (attrs.gridAutoRows) output.gridAutoRows = attrs.gridAutoRows;

     if (attrs.gridColumn) output.gridColumn = attrs.gridColumn;
     if (attrs.gridColumnEnd) output.gridColumnEnd = attrs.gridColumnEnd;
     if (attrs.gridColumnStart) output.gridColumnStart = attrs.gridColumnStart;

     if (attrs.gridGap) output.gridGap = attrs.gridGap;
     if (attrs.gridRowGap) output.gridRowGap = attrs.gridRowGap;
     if (attrs.gridColumnGap) output.gridColumnGap = attrs.gridColumnGap;

     if (attrs.gridRow) output.gridRow = attrs.gridRow;
     if (attrs.gridRowEnd) output.gridRowEnd = attrs.gridRowEnd;
     if (attrs.gridRowStart) output.gridRowStart = attrs.gridRowStart;

     if (attrs.gridTemplate) output.gridTemplate = attrs.gridTemplate;
     if (attrs.gridTemplateAreas) output.gridTemplateAreas = attrs.gridTemplateAreas;
     if (attrs.gridTemplateColumns) output.gridTemplateColumns = attrs.gridTemplateColumns;
     if (attrs.gridTemplateRows) output.gridTemplateRows = attrs.gridTemplateRows;

     // H
     if (attrs.hangingPunctuation) output.hangingPunctuation = attrs.hangingPunctuation;
     if (attrs.height) output.height = attrs.height;
     if (attrs.hyphens) output.hyphens = attrs.hyphens;

     // I
     if (attrs.isolation) output.isolation = attrs.isolation;

     // J
     if (attrs.justifyContent) output.justifyContent = attrs.justifyContent;

     // K

     // L
     if (attrs.left) output.left = attrs.left;
     if (attrs.letterSpacing) output.letterSpacing = attrs.letterSpacing;
     if (attrs.lineHeight) output.lineHeight = attrs.lineHeight;
     if (attrs.listStyle) output.listStyle = attrs.listStyle;
     if (attrs.listStyleImage) output.listStyleImage = attrs.listStyleImage;
     if (attrs.listStylePosition) output.listStylePosition = attrs.listStylePosition;
     if (attrs.listStyleType) output.listStyleType = attrs.listStyleType;

     // M
     if (attrs.margin) output.margin = attrs.margin;
     if (attrs.marginVertical) {
          output.marginBottom = attrs.marginVertical;
          output.marginTop = attrs.marginVertical;
     }
     if (attrs.marginHorizontal) {
          output.marginRight = attrs.marginHorizontal;
          output.marginLeft = attrs.marginHorizontal;
     }
     if (attrs.marginBottom) output.marginBottom = attrs.marginBottom;
     if (attrs.marginLeft) output.marginLeft = attrs.marginLeft;
     if (attrs.marginRight) output.marginRight = attrs.marginRight;
     if (attrs.marginTop) output.marginTop = attrs.marginTop;
     if (attrs.maxHeight) output.maxHeight = attrs.maxHeight;
     if (attrs.maxWidth) output.maxWidth = attrs.maxWidth;
     if (attrs.minHeight) output.minHeight = attrs.minHeight;
     if (attrs.minWidth) output.minWidth = attrs.minWidth;
     if (attrs.mixBlendMode) output.mixBlendMode = attrs.mixBlendMode;

     // O
     if (attrs.objectFit) output.objectFit = attrs.objectFit;
     if (attrs.objectPosition) output.objectPosition = attrs.objectPosition;
     if (attrs.opacity) output.opacity = attrs.opacity;
     if (attrs.order) output.order = attrs.order;
     if (attrs.outline) output.outline = attrs.outline;
     if (attrs.outlineColor) output.outlineColor = attrs.outlineColor;
     if (attrs.outlineStyle) output.outlineStyle = attrs.outlineStyle;
     if (attrs.outlineWidth) output.outlineWidth = attrs.outlineWidth;
     if (attrs.overflow) output.overflow = attrs.overflow;
     if (attrs.overflowX) output.overflowX = attrs.overflowX;
     if (attrs.overflowY) output.overflowY = attrs.overflowY;

     // P
     if (attrs.padding) output.padding = attrs.padding;
     if (attrs.paddingVertical) {
          output.paddingBottom = attrs.paddingVertical;
          output.paddingTop = attrs.paddingVertical;
     }
     if (attrs.paddingHorizontal) {
          output.paddingRight = attrs.paddingHorizontal;
          output.paddingLeft = attrs.paddingHorizontal;
     }
     if (attrs.paddingBottom) output.paddingBottom = attrs.paddingBottom;
     if (attrs.paddingLeft) output.paddingLeft = attrs.paddingLeft;
     if (attrs.paddingRight) output.paddingRight = attrs.paddingRight;
     if (attrs.paddingTop) output.paddingTop = attrs.paddingTop;
     if (attrs.pageBreakAfter) output.pageBreakAfter = attrs.pageBreakAfter;
     if (attrs.pageBreakBefore) output.pageBreakBefore = attrs.pageBreakBefore;
     if (attrs.pageBreakInside) output.pageBreakInside = attrs.pageBreakInside;
     if (attrs.perspective) output.perspective = attrs.perspective;
     if (attrs.perspectiveOrigin) output.perspectiveOrigin = attrs.perspectiveOrigin;
     if (attrs.pointerEvents) output.pointerEvents = attrs.pointerEvents;
     if (attrs.position) output.position = attrs.position;

     // Q
     if (attrs.quotes) output.quotes = attrs.quotes;

     // R
     if (attrs.resize) output.resize = attrs.resize;
     if (attrs.right) output.right = attrs.right;

     // S
     if (attrs.scrollBehavior) output.scrollBehavior = attrs.scrollBehavior;

     // T
     if (attrs.tabSize) output.tabSize = attrs.tabSize;
     if (attrs.tableLayout) output.tableLayout = attrs.tableLayout;
     if (attrs.textAlign) output.textAlign = attrs.textAlign;
     if (attrs.textAlignLast) output.textAlignLast = attrs.textAlignLast;
     if (attrs.textDecoration) output.textDecoration = attrs.textDecoration;
     if (attrs.textDecorationColor) output.textDecorationColor = attrs.textDecorationColor;
     if (attrs.textDecorationLine) output.textDecorationLine = attrs.textDecorationLine;
     if (attrs.textDecorationStyle) output.textDecorationStyle = attrs.textDecorationStyle;
     if (attrs.textIndent) output.textIndent = attrs.textIndent;
     if (attrs.textJustify) output.textJustify = attrs.textJustify;
     if (attrs.textOverflow) output.textOverflow = attrs.textOverflow;
     if (attrs.textShadow) output.textShadow = attrs.textShadow;
     if (attrs.textTransform) output.textTransform = attrs.textTransform;
     if (attrs.top) output.top = attrs.top;
     if (attrs.transform) output.transform = attrs.transform;
     if (attrs.transformOrigin) output.transformOrigin = attrs.transformOrigin;
     if (attrs.transformStyle) output.transformStyle = attrs.transformStyle;
     if (attrs.transition) output.transition = attrs.transition;
     if (attrs.transitionDelay) output.transitionDelay = attrs.transitionDelay;
     if (attrs.transitionDuration) output.transitionDuration = attrs.transitionDuration;
     if (attrs.transitionProperty) output.transitionProperty = attrs.transitionProperty;
     if (attrs.transitionFunction) output.transitionFunction = attrs.transitionTimingFunction;

     // U
     if (attrs.unicodeBidi) output.unicodeBidi = attrs.unicodeBidi;
     if (attrs.userSelect) output.userSelect = attrs.userSelect;

     // V
     if (attrs.verticalAlign) output.verticalAlign = attrs.verticalAlign;
     if (attrs.visibility) output.visibility = attrs.visibility;

     // W
     if (attrs.whiteSpace) output.whiteSpace = attrs.whiteSpace;
     if (attrs.width) output.width = attrs.width;
     if (attrs.wordBreak) output.wordBreak = attrs.wordBreak;
     if (attrs.wordSpacing) output.wordSpacing = attrs.wordSpacing;
     if (attrs.wordWrap) output.wordWrap = attrs.wordWrap;
     if (attrs.writingMode) output.writingMode = attrs.writingMode;

     // Z
     if (attrs.zIndex) output.zIndex = attrs.zIndex;

     return output;
};
