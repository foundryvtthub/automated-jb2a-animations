<script>
    import * as settings    from "../Components";
    import * as options     from "../Components/options"

    export let animation;
    export let idx = 0;
    export let category;
    export let fromMenu = 'autorec';

    $: show3d = false;

    let title =
        game.i18n.localize("autoanimations.menus.primary") +
        " " +
        game.i18n.localize("autoanimations.menus.animation");

    $: soundOnly = $animation.soundOnly.sound.enable;
    $: macroEnabled = $animation.macro.enable;
    $: macroPlay = $animation.macro.playWhen;
</script>

<svelte:component this={settings.SectionButtons01} bind:show3d {animation} {category} {idx} type={fromMenu}/>
{#if show3d && !soundOnly}
    <svelte:component this={settings.Canvas3D} {animation}  {category} {idx} />
{:else}
    <div hidden={!soundOnly}>
        <svelte:component this={settings.SoundOnly} {animation} {category} {idx}/>
    </div>
    <div hidden={!macroEnabled}>
        <svelte:component this={settings.Macro} {animation} {category}/>
    </div>
    <div hidden={soundOnly || (macroEnabled && macroPlay === "2")}>
        <svelte:component this={settings.Source} {animation} {category} {idx}/>
        <div class="aa-primary-border">
            <svelte:component this={settings.Video} {animation} {category} {idx} {title} section="primary"/>
            <svelte:component this={options.OnToken} {animation}/>
            <svelte:component this={settings.Sound} {animation} {category} {idx} section="primary" />
        </div>
        <svelte:component this={settings.Secondary} {animation} {category} {idx}/>
        <div class={$animation.primary.options.playOn === "source" ? "aa-disableOpacity" : ""}>
            <svelte:component this={settings.Target} {animation} {category} {idx}/>
        </div>
</div>
{/if}

<style lang="scss">
</style>
