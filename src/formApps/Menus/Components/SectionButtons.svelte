<script>
    import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";

    import { currentStore } from "./videoPreview/previewStore.js";

    export let animation;
    export let category;
    export let idx;
    export let type = "autorec";

    export let show3d = false;

    $: currentIDX = category.stores.videoIDX;

    //$: currentCategory = category.stores.currentCategory;

    async function seePreview() {
        if (type === "item") {
            currentIDX.set("item");
        } else {
            currentIDX.set(idx);
        }
        currentStore.set(category);
        category.loadPreviews(category);
    }
</script>

<div class="aa-autorec-headerButton">
    <div style="grid-row:1/2; grid-column:1/2" class="sectionButton" >
        <label for="" on:click={() => seePreview()}
            >{localize("autoanimations.menus.preview")}
            <i class="fas fa-film fa-lg aa-zoom" /></label
        >
    </div>
    <div style="grid-row:1/2; grid-column:2/3" class="sectionButton">
        <label for="" on:click={() => (show3d = !show3d)}
            >{localize("autoanimations.menus.3dcanvas")}
            <i
                class="fas fa-cube fa-lg aa-zoom {show3d ? 'aa-green' : ''}"
            /></label
        >
    </div>
    <div style="grid-row:1/2; grid-column:3/4" class="sectionButton">
        <label for="SoundOnly {animation._data.id}"
            >{localize("autoanimations.menus.sound")}
            {localize("autoanimations.menus.only")}
            <i
                class="fas fa-music fa-lg aa-zoom {$animation.soundOnly.sound
                    .enable
                    ? 'aa-green'
                    : ''}"
            />
        </label>
        <input
            type="checkbox"
            hidden
            id="SoundOnly {animation._data.id}"
            bind:checked={$animation.soundOnly.sound.enable}
        />
    </div>
    <div style="grid-row:1/2; grid-column:4/5" class="sectionButton">
        <label for="Macro {animation._data.id}"
            >{localize("autoanimations.menus.add")}
            {localize("autoanimations.menus.macro")}
            <i
                class="far fa-keyboard fa-lg aa-zoom {$animation.macro.enable
                    ? 'aa-green'
                    : ''}"
            />
        </label>
        <input
            type="checkbox"
            hidden
            id="Macro {animation._data.id}"
            bind:checked={$animation.macro.enable}
        />
    </div>
</div>

<style lang="scss">
    .aa-autorec-headerButton label {
        font-size: small;
    }
    .sectionButton {
        background: rgba(0, 0, 0, 0.17);
        padding: .2em;
        border-radius: 1em;
    }
</style>
