import Factory from './gameobjects/mesh/shatterimage/Factory.js';
import Creator from './gameobjects/mesh/shatterimage/Creator.js';
import ShatterImage from './gameobjects/mesh/shatterimage/ShatterImage.js';
import SetValue from './utils/object/SetValue.js';

class ShatterImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexShatterImage', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.ShatterImage', ShatterImage);

export default ShatterImagePlugin;