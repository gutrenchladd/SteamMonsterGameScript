function startAutoClicker(){return autoClicker?void console.log("Autoclicker is already running!"):(autoClicker=setInterval(function(){if(gameRunning()){var e=Math.floor(Math.random()*autoClickerVariance*2)-autoClickerVariance,t=clicksPerSecond+e;g_Minigame.m_CurrentScene.m_nClicks=t,g_msTickRate=1100,debug&&console.log("Clicking "+t+" times this second.")}},autoClickerFreq),void console.log("autoClicker has been started."))}function startAutoRespawner(){return autoRespawner?void console.log("autoRespawner is already running!"):(autoRespawner=setInterval(function(){debug&&console.log("Checking if the player is dead."),g_Minigame.m_CurrentScene.m_bIsDead&&(debug&&console.log("Player is dead. Respawning."),RespawnPlayer())},respawnCheckFreq),void console.log("autoRespawner has been started."))}function startAutoTargetSwapper(){return autoTargetSwapper?void console.log("autoTargetSwapper is already running!"):(updateUserElementMultipliers(),autoTargetSwapperElementUpdate=setInterval(updateUserElementMultipliers,elementUpdateRate),autoTargetSwapper=setInterval(function(){var e=null;g_Minigame.m_CurrentScene.m_rgEnemies.each(function(t){(null==e||compareMobPriority(t,e)>0)&&(e=t)}),null!=e&&e!=g_Minigame.m_CurrentScene.m_rgEnemies[g_Minigame.m_CurrentScene.m_rgPlayerData.target]?(debug&&(console.log("switching targets"),console.log(swapReason)),g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane!=e.m_nLane&&g_Minigame.m_CurrentScene.TryChangeLane(e.m_nLane),g_Minigame.m_CurrentScene.TryChangeTarget(e.m_nID)):null!=e&&e==e&&g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane!=e.m_nLane&&g_Minigame.m_CurrentScene.TryChangeLane(e.m_nLane)},targetSwapperFreq),void console.log("autoTargetSwapper has been started."))}function startAutoAbilityUser(){return autoAbilityUser?void console.log("autoAbilityUser is already running!"):(autoAbilityUser=setInterval(function(){debug&&console.log("Checking if it's useful to use an ability.");var e,t=g_Minigame.CurrentScene().m_rgPlayerData.hp/g_Minigame.CurrentScene().m_rgPlayerTechTree.max_hp*100,n=g_Minigame.m_CurrentScene.m_rgEnemies[g_Minigame.m_CurrentScene.m_rgPlayerData.target];n&&(e=n.m_data.hp/n.m_data.max_hp*100),hasAbility(5),hasAbility(6),useMedicsAtPercent>=t&&!g_Minigame.m_CurrentScene.m_bIsDead&&(debug&&console.log("Health below threshold. Need medics!"),hasAbility(7)?(debug&&console.log("Unleash the medics!"),castAbility(7)):debug&&console.log("No medics to unleash!")),void 0!=n&&2==n.m_data.type&&useMetalDetectorOnBossBelowPercent>=e&&hasAbility(8)&&(debug&&console.log("Using Metal Detector."),castAbility(8)),hasAbility(9)&&!currentLaneHasAbility(9)&&(debug&&console.log("Decreasing cooldowns."),castAbility(9)),void 0!=n&&0==n.m_data.type&&e>=useNukeOnSpawnerAbovePercent&&hasAbility(10)&&(debug&&console.log("Nuclear launch detected."),castAbility(10)),hasAbility(11),hasAbility(12)},abilityUseCheckFreq),void console.log("autoAbilityUser has been started."))}function startAutoItemUser(){return autoItemUser?void console.log("autoItemUser is already running!"):(autoItemUser=setInterval(function(){debug&&console.log("Checking if it's useful to use an item.")},itemUseCheckFreq),void console.log("autoItemUser has been started."))}function startAllAutos(){startAutoClicker(),startAutoRespawner(),startAutoTargetSwapper(),startAutoAbilityUser(),startAutoItemUser()}function stopAutoClicker(){autoClicker?(clearInterval(autoClicker),autoClicker=null,console.log("autoClicker has been stopped.")):console.log("No autoClicker is running to stop.")}function stopAutoRespawner(){autoRespawner?(clearInterval(autoRespawner),autoRespawner=null,console.log("autoRespawner has been stopped.")):console.log("No autoRespawner is running to stop.")}function stopAutoTargetSwapper(){autoTargetSwapper?(clearInterval(autoTargetSwapper),autoTargetSwapper=null,console.log("autoTargetSwapper has been stopped.")):console.log("No autoTargetSwapper is running to stop.")}function stopAutoAbilityUser(){autoAbilityUser?(clearInterval(autoAbilityUser),autoAbilityUser=null,console.log("autoAbilityUser has been stopped.")):console.log("No autoAbilityUser is running to stop.")}function stopAutoItemUser(){autoItemUser?(clearInterval(autoItemUser),autoItemUser=null,console.log("autoItemUser has been stopped.")):console.log("No autoItemUser is running to stop.")}function stopAllAutos(){stopAutoClicker(),stopAutoRespawner(),stopAutoTargetSwapper(),stopAutoAbilityUser(),stopAutoItemUser()}function disableAutoNukes(){useNukeOnSpawnerAbovePercent=200,console.log("Automatic nukes have been disabled")}function castAbility(e){hasAbility(e)&&g_Minigame.CurrentScene().TryAbility(document.getElementById("ability_"+e).childElements()[0])}function currentLaneHasAbility(e){return laneHasAbility(g_Minigame.CurrentScene().m_rgPlayerData.current_lane,e)}function laneHasAbility(e,t){return g_Minigame.m_CurrentScene.m_rgLaneData[e].abilities[t]}function hasAbility(e){return 1<<e&g_Minigame.CurrentScene().m_rgPlayerTechTree.unlocked_abilities_bitfield&&g_Minigame.CurrentScene().GetCooldownForAbility(e)<=0}function updateUserElementMultipliers(){gameRunning()&&(userElementMultipliers[0]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_air,userElementMultipliers[1]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_earth,userElementMultipliers[2]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_fire,userElementMultipliers[3]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_water,userMaxElementMultiiplier=Math.max.apply(null,userElementMultipliers))}function getMobTypePriority(e){switch(mobType=e.m_data.type,mobType){case 0:return 0;case 3:return 1;case 2:return 2;case 4:return 3}return-Number.MAX_VALUE}function compareMobPriority(e,t){var n=g_Minigame.CurrentScene().m_rgPlayerData.hp/g_Minigame.CurrentScene().m_rgPlayerTechTree.max_hp*100,a=laneHasAbility(e.m_nLane,7)||laneHasAbility(e.m_nLane,23),r=laneHasAbility(t.m_nLane,7)||laneHasAbility(t.m_nLane,23),i=laneHasAbility(e.m_nLane,17),o=laneHasAbility(t.m_nLane,17),s=getMobTypePriority(e),l=getMobTypePriority(t),u=userElementMultipliers[g_Minigame.m_CurrentScene.m_rgGameData.lanes[e.m_nLane].element],g=userElementMultipliers[g_Minigame.m_CurrentScene.m_rgGameData.lanes[t.m_nLane].element];laneHasAbility(e.m_nLane,16)&&(u=userMaxElementMultiiplier),laneHasAbility(t.m_nLane,16)&&(g=userMaxElementMultiiplier);var c=e.m_data.hp,m=t.m_data.hp;return seekHealingPercent>=n&&!g_Minigame.m_CurrentScene.m_bIsDead&&a!=r?(swapReason="Swapping to lane with active healing.",a?1:-1):i!=o?(swapReason="Switching to target with Raining Gold.",i?1:-1):s!=l?(swapReason="Switching to higher priority target.",s-l):u!=g?(swapReason="Switching to elementally weaker target.",g-u):c!=m?(swapReason="Switching to lower HP target.",m-c):0}function gameRunning(){return"object"==typeof g_Minigame}function addPointer(){g_Minigame.m_CurrentScene.m_rgFingerTextures=[];for(var e=26,t=49,n=0;4>n;n++)for(var a=0;5>a;a++)g_Minigame.m_CurrentScene.m_rgFingerTextures.push(new PIXI.Texture(g_rgTextureCache.pointer.texture,{x:a*e,y:n*t,width:e,height:t}));g_Minigame.m_CurrentScene.m_nFingerIndex=0,g_Minigame.m_CurrentScene.m_spriteFinger=new PIXI.Sprite(g_Minigame.m_CurrentScene.m_rgFingerTextures[g_Minigame.m_CurrentScene.m_nFingerIndex]),g_Minigame.m_CurrentScene.m_spriteFinger.scale.x=g_Minigame.m_CurrentScene.m_spriteFinger.scale.y=2,g_Minigame.m_CurrentScene.m_containerParticles.addChild(g_Minigame.m_CurrentScene.m_spriteFinger)}var debug=!1,clicksPerSecond=g_TuningData.abilities[1].max_num_clicks,autoClickerVariance=Math.floor(clicksPerSecond/10);clicksPerSecond-=Math.ceil(autoClickerVariance/2);var respawnCheckFreq=5e3,targetSwapperFreq=1e3,abilityUseCheckFreq=2e3,itemUseCheckFreq=5e3,seekHealingPercent=20,useMedicsAtPercent=30,useNukeOnSpawnerAbovePercent=75,useMetalDetectorOnBossBelowPercent=30,autoClickerFreq=1e3,autoRespawner,autoClicker,autoTargetSwapper,autoTargetSwapperElementUpdate,autoAbilityUser,autoItemUser,elementUpdateRate=6e4,userElementMultipliers=[1,1,1,1],userMaxElementMultiiplier=1,swapReason;"undefined"!=typeof unsafeWindow&&(unsafeWindow.startAutoClicker=startAutoClicker,unsafeWindow.startAutoRespawner=startAutoRespawner,unsafeWindow.startAutoTargetSwapper=startAutoTargetSwapper,unsafeWindow.startAutoAbilityUser=startAutoAbilityUser,unsafeWindow.startAutoItemUser=startAutoItemUser,unsafeWindow.startAllAutos=startAllAutos,unsafeWindow.stopAutoClicker=stopAutoClicker,unsafeWindow.stopAutoRespawner=stopAutoRespawner,unsafeWindow.stopAutoTargetSwapper=stopAutoTargetSwapper,unsafeWindow.stopAutoAbilityUser=stopAutoAbilityUser,unsafeWindow.stopAutoItemUser=stopAutoItemUser,unsafeWindow.stopAllAutos=stopAllAutos,unsafeWindow.disableAutoNukes=disableAutoNukes,unsafeWindow.castAbility=castAbility,unsafeWindow.hasAbility=hasAbility);var startAll=setInterval(function(){gameRunning()&&(startAllAutos(),addPointer(),clearInterval(startAll))},1e3);CSceneGame.prototype.ClearNewPlayer=function(){if(this.m_spriteFinger){{WebStorage.SetLocal("mg_how2click",1)}$J("#newplayer").hide()}};