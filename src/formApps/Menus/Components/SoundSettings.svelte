<script>
    import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
    import { TJSSvgFolder } from "@typhonjs-fvtt/svelte-standard/component";

    export let animation;
    export let category;
    export let section;
    export let idx;

    const folder = {
        styles: {
            "--tjs-summary-font-family":
                '"Modesto Condensed", "Palatino Linotype", serif',
            "--tjs-summary-font-size": "1.1em",
            "--tjs-summary-chevron-size": "0.7em",
        },
    };

    $: isValid =
        $animation[section].sound.file && $animation[section].sound.enable;
</script>

<div class="aa-sound-border">
    <TJSSvgFolder {folder} label={localize("autoanimations.menus.sound")}>
        <div slot="summary-end">
            <input
                type="checkbox"
                style="align-self:center"
                title="Toggle Sound On/Off"
                bind:checked={$animation[section].sound.enable}
            />
        </div>
        <div
            class={!$animation[section].sound.enable ? "aa-disableOpacity" : ""}
        >
            <div class="aa-Sound-container">
                <div style="grid-row: 1/2; grid-column: 1/2">
                    <i
                        class="fas fa-music aa-blue {isValid
                            ? ''
                            : 'aa-disableOpacity'}"
                        style="font-size: 1.5em;"
                        title="Play Sound"
                        on:click={() =>
                            category.playSound(animation._data[section].sound)}
                    />
                </div>
                <div style="grid-row: 1/2; grid-column: 2/3">
                    <input
                        type="text"
                        bind:value={$animation[section].sound.file}
                        style="font-weight:normal; font-size:small"
                    />
                </div>
                <div style="grid-row: 1/2; grid-column: 3/4">
                    <i class="fas fa-file-import" 
                    title="File Picker"
                    style="font-size:1.5em"
                    on:click|preventDefault={() => category.selectSound(section, idx)}
                    />
                </div>
            </div>
            <table class="d">
                <tr>
                    <td>
                        <!--Set Start Time-->
                        <div>
                            <label for=""
                                >{localize("autoanimations.menus.start")}
                                {localize("autoanimations.menus.time")} (ms)</label
                            >
                        </div>
                        <div>
                            <input
                                type="number"
                                bind:value={$animation[section].sound.startTime}
                                placeholder="0"
                                step="0.01"
                            />
                        </div>
                    </td>
                    <td>
                        <!--Set Volume-->
                        <div>
                            <label for=""
                                >{localize(
                                    "autoanimations.menus.volume"
                                )}</label
                            >
                        </div>
                        <div>
                            <input
                                type="number"
                                bind:value={$animation[section].sound.volume}
                                placeholder="0.5"
                                step="0.01"
                            />
                        </div>
                    </td>
                    <td>
                        <!--Set Delay-->
                        <div>
                            <label for=""
                                >{localize("autoanimations.menus.delay")}</label
                            >
                        </div>
                        <div>
                            <input
                                type="number"
                                bind:value={$animation[section].sound.delay}
                                placeholder="0"
                                step="0.01"
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <!--Set Repeats-->
                        <div>
                            <label for=""
                                >{localize("autoanimations.menus.repeat")}</label
                            >
                        </div>
                        <div>
                            <input
                                type="number"
                                bind:value={$animation[section].sound.repeat}
                                placeholder="1"
                                step="1"
                            />
                        </div>
                    </td>
                    <td>
                        <!--Set Repeat Delay-->
                        <div>
                            <label for=""
                                >{localize("autoanimations.menus.repeat")} {localize("autoanimations.menus.delay")}</label
                            >
                        </div>
                        <div>
                            <input
                                type="number"
                                bind:value={$animation[section].sound.repeatDelay}
                                placeholder="250"
                                step="1"
                            />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </TJSSvgFolder>
</div>

<style lang="scss">
</style>
