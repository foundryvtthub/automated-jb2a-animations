import { DataSanitizer } from "../aa-classes/DataSanitizer.js";
import { debug } from "../constants/constants.js";

import * as animate from "../animation-functions"

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export async function trafficCop(handler) {
    const autorecDisabled = game.settings.get("autoanimations", "disableAutoRec")

    if (!handler.isEnabled) { return; }
    if (!handler.isCustomized && !handler.autorecObject || (handler.autorecObject && autorecDisabled)) { return; }

    const data = handler.isCustomized ? foundry.utils.deepClone(handler.flags) : foundry.utils.deepClone(handler.autorecObject);
    Hooks.callAll("aa.preDataSanitize", handler, data);

    const sanitizedData = await DataSanitizer._getAnimationData(handler, data);
    Hooks.callAll("aa.preAnimationStart", sanitizedData);

    let globalDelay = game.settings.get("autoanimations", "globaldelay");
    await wait(globalDelay);

    if (sanitizedData.macro && sanitizedData.macro.enable && sanitizedData.macro.playWhen === "2") {
        new Sequence()
            .macro(sanitizedData.macro.name, handler.workflow, handler, sanitizedData.macro.args)
            .play()
        return;
    }

    if (data.soundOnly?.sound?.enable && data.soundOnly?.sound?.file) {
        const sound = {
            file: data.soundOnly?.sound?.file ?? "",
            volume: data.soundOnly?.sound?.volume ?? 0.75,
            delay: data.soundOnly?.sound?.delay ?? 0,
            startTime: data.soundOnly?.sound?.startTime ?? 0,
            repeat: data.soundOnly?.sound?.repeat ?? 1,
            repeatDelay: data.soundOnly?.sound?.repeatDelay ?? 250,
        }
        new Sequence()
            .sound()
                .file(sound.file)
                .volume(sound.volume)
                .delay(sound.delay)
                .startTime(sound.startTime)
                .repeats(sound.repeat, sound.repeatDelay)
            .play()
        return;
    }

    if (data.levels3d?.type && game.Levels3DPreview?._active) {
        animate.particleEffects(handler, data)
        return;
    }

    const animationType = data.menu === "preset" ? data.presetType : data.menu === "aefx" ? data.activeEffectType : data.menu;
    const targets = handler.allTargets?.length;

    if (animationType === "templatefx" || animationType === "proToTemp") {
        if (animationType === "proToTemp" && !handler.sourceToken) { 
            debug("Failed to initialize a Source Token")
            return;
        }
        debug(`${animationType} Animation Start"`, handler, sanitizedData)
        if (handler.templateData && animationType === "templatefx") {
            animate[animationType](handler, sanitizedData);
            return;
        }
        //sections for Template Hooks.once or straight to function
        switch (game.system.id) {
            case "a5e":
            case "pf2e":
            case "sw5e":
            case "tormenta20":
            case "swade":
                aaTemplateHook = Hooks.once("createMeasuredTemplate", (template) => {
                    //Hooks.callAll("aa.preAnimationStart", sanitizedData, data);
                    animate[animationType](handler, sanitizedData, template);
                });
                setTimeout(killHook, 30000)
            default:
                animate[animationType](handler, sanitizedData);
        }
        return;
    } else {
        if (!handler.sourceToken || targets < 1 && (animationType === "melee" || animationType === "range")) {
            Hooks.callAll("aa.animationEnd", handler.sourceToken, "no-target");
            debug(`${animationType} Animation End", "NO TARGETS`)
            return;
        }
        debug(`${animationType} Animation Start"`, sanitizedData)
        //Hooks.callAll("aa.preAnimationStart", sanitizedData, data);
        animate[animationType](handler, sanitizedData);
        return;
    }
    function killHook() {
        Hooks.off("createMeasuredTemplate", aaTemplateHook)
    }
}
