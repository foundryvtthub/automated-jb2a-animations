import { SvelteApplication }    from "@typhonjs-fvtt/runtime/svelte/application";

import { AutorecAppShell }      from "./components";

import { constants }            from "../../constants.js";

export default class AutorecMenuApp extends SvelteApplication {
    /** @inheritDoc */
    constructor(options)
    {
        super(options);

        try {
            // Attempt to parse session storage item and set application state.
            this.state.set(JSON.parse(sessionStorage.getItem(`${constants.moduleId}-autorec-appstate`)));
        }
        catch (err) { /**/ }
    }

    /**
     *
     */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: `A-A Automatic Recognition Menu New`,
            id: `AA-autorec-settings-New`,
            zIndex: 102,
            resizable: true,
            minimizable: true,
            width: 600,
            height: 750,
            minWidth: 550,

            svelte: {
                class: AutorecAppShell,
                target: document.body
            }
        });
    }

    /**
     * @inheritDoc
     */
    async close(options) {
        Object.values(ui.windows).filter(app => app.id === "Options-Information" ||
         app.id === "AA-Video-Preview" || app.id === "Autorec-Menu-Manager").forEach(app => app.close());

        return super.close(options);
    }
}
