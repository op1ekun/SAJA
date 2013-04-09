define([], function() {
    function ModuleInterface() {}
    
    ModuleInterface.prototype.init = function() {
            throw new Error("ModuleInterface::init is not implemented");
    }

    ModuleInterface.prototype.destroy = function() {
        throw new Error("ModuleInterface::destroy is not implemented");
    }
    
    ModuleInterface.prototype.attachEvents = function() {
        throw new Error("ModuleInterface::attachEvents is not implemented");
    }
    
    ModuleInterface.prototype.detachEvents = function() {
        throw new Error("ModuleInterface::detachEvents is not implemented");
    }
    
    ModuleInterface.prototype.render = function() {
        throw new Error("ModuleInterface::render is not implemented");
    }
    
    return ModuleInterface;
});
