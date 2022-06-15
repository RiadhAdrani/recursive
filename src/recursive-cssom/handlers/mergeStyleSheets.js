export default function (styleSheets) {
    if (!Array.isArray(styleSheets)) return {};

    const output = {};

    styleSheets.forEach((sheet) => {
        if (!sheet) return;

        for (let key in sheet) {
            switch (key) {
                case "animations":
                    {
                        if (!sheet.animations) break;

                        for (let animation in sheet.animations) {
                            if (!output.animations) output.animations = {};

                            // TODO : solve conflicts

                            output.animations[animation] = sheet.animations[animation];
                        }
                    }
                    break;
                case "mediaQueries":
                    {
                        if (!sheet.mediaQueries) break;

                        for (let query in sheet.mediaQueries) {
                            if (!output.mediaQueries) output.mediaQueries = {};

                            for (let selector in sheet.mediaQueries[query]) {
                                if (!output.mediaQueries[query]) output.mediaQueries[query] = {};

                                // TODO : solve conflicts

                                output.mediaQueries[query][selector] =
                                    sheet.mediaQueries[query][selector];
                            }
                        }
                    }
                    break;
                case "fontFace":
                    {
                        if (!Array.isArray(sheet.fontFace)) break;

                        if (!output.fontFace) output.fontFace = [];

                        output.fontFace.push(sheet.fontFace);
                    }
                    break;
                case "var":
                    {
                        if (!sheet.var) break;

                        for (let v in sheet.var) {
                            if (!output.var) output.var = {};

                            if (!sheet.var[v]) continue;

                            output.var[v] = sheet.var[v];
                        }
                    }
                    break;
                case "imports":
                    {
                        if (!Array.isArray(sheet.imports)) break;

                        if (!output.imports) output.imports = [];

                        // TODO : solve conflicts

                        output.imports.push(...sheet.imports);
                    }
                    break;
                case "selectors":
                    {
                        if (!sheet.selectors) break;

                        for (let selector in sheet.selectors) {
                            if (!sheet.selectors[selector]) continue;

                            if (!output.selectors) output.selectors = {};

                            // TODO : solve conflicts

                            output.selectors[selector] = sheet.selectors[selector];
                        }
                    }
                    break;
            }
        }
    });

    return output;
}
