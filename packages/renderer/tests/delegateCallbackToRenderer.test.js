const { RecursiveRenderer } = require("..");
const {
    RENDERER_PHASE_BEFORE_DESTROYED,
    RENDERER_PHASE_CHANGES,
    RENDERER_PHASE_ON_CREATED,
    RENDERER_PHASE_ON_DESTROYED,
    RENDERER_PHASE_ON_UPDATED,
} = require("../../constants");

describe("Renderer", () => {
    const app = () => {
        return { elementType: "div" };
    };
    const root = {};

    const Renderer = new RecursiveRenderer(app, root);

    test("delegate-to-renderer invalid-phase-name test", () => {
        expect(
            (() => {
                Renderer.delegateToRenderer("custom-phase-name", () => {});
                return Renderer.phases["custom-phase-name"];
            })()
        ).toBe(undefined);
    });

    test("delegate-to-renderer invalid-callback test", () => {
        expect(
            (() => {
                Renderer.delegateToRenderer(RENDERER_PHASE_ON_UPDATED, []);
                return Renderer.phases[RENDERER_PHASE_ON_UPDATED].length;
            })()
        ).toBe(0);
    });

    test("delegate-to-renderer valid-phase-before-destroyed test", () => {
        expect(
            (() => {
                Renderer.delegateToRenderer(RENDERER_PHASE_BEFORE_DESTROYED, () => {});
                return Renderer.phases[RENDERER_PHASE_BEFORE_DESTROYED].length;
            })()
        ).toBe(1);
    });

    test("delegate-to-renderer valid-phase-on-destroyed test", () => {
        expect(
            (() => {
                Renderer.delegateToRenderer(RENDERER_PHASE_ON_DESTROYED, () => {});
                return Renderer.phases[RENDERER_PHASE_ON_DESTROYED].length;
            })()
        ).toBe(1);
    });

    test("delegate-to-renderer valid-phase-on-created test", () => {
        expect(
            (() => {
                Renderer.delegateToRenderer(RENDERER_PHASE_ON_CREATED, () => {});
                return Renderer.phases[RENDERER_PHASE_ON_CREATED].length;
            })()
        ).toBe(1);
    });

    test("delegate-to-renderer valid-phase-changes test", () => {
        expect(
            (() => {
                Renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {});
                return Renderer.phases[RENDERER_PHASE_CHANGES].length;
            })()
        ).toBe(1);
    });

    test("delegate-to-renderer valid-phase-changes test", () => {
        expect(
            (() => {
                Renderer.delegateToRenderer(RENDERER_PHASE_ON_UPDATED, () => {});
                return Renderer.phases[RENDERER_PHASE_ON_UPDATED].length;
            })()
        ).toBe(1);
    });
});
