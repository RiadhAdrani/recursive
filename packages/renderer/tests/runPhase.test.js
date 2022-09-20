const { RecursiveRenderer } = require("..");
const { RecursiveApp } = require("../../app");
const { RENDERER_PHASE_ON_CREATED } = require("../../constants");

describe("Renderer", () => {
    const app = () => {
        return { elementType: "div" };
    };
    const root = {};

    const BootstrapperApp = new RecursiveApp({
        buildRenderer: () => {
            return new RecursiveRenderer(app, root);
        },
    });
    const Renderer = BootstrapperApp.renderer;

    test("run-phase valid-callbacks test", () => {
        expect(
            (() => {
                let count = 0;

                Renderer.phases[RENDERER_PHASE_ON_CREATED] = [
                    () => (count += 1),
                    () => (count += 2),
                    () => (count += 3),
                    () => (count += 4),
                ];

                Renderer.runPhase(RENDERER_PHASE_ON_CREATED);

                Renderer.phases[RENDERER_PHASE_ON_CREATED] = [];

                return count;
            })()
        ).toBe(10);
    });

    test("delegate-to-renderer invalid-callbacks test", () => {
        expect(
            (() => {
                let count = 0;

                Renderer.phases[RENDERER_PHASE_ON_CREATED] = [
                    () => (count += 1),
                    0,
                    () => (count += 2),
                    [],
                    () => (count += 3),
                    {},
                    () => (count += 4),
                ];

                Renderer.runPhase(RENDERER_PHASE_ON_CREATED);

                Renderer.phases[RENDERER_PHASE_ON_CREATED] = [];

                return count;
            })()
        ).toBe(10);
    });
});
