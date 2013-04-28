define([], function() {
    /**
     * All these methods MUST BE implemented by modules!
     * This way every module will have standarized interface.
     * 
     * These methods (except init which accepts module instance's options)
     * should not receive any arguments to remain as loosely coupled as possible.
     * Application, which controls lifecycle of every module, should only know
     * eg. that there's a need to detachEvents, but shouldn't know 
     * what needs to be done to detach them.
     * 
     * This interface module will also help to test modules.
     * By providing smoke tests for interface methods a developer
     * will know when something is not implemented yet.
     * 
     * This set of methods is basic and should be extended developers
     * to match the requirements of their project. However
     * any extensions should be handled according to the forementioned rules.
     */
    function ModuleInterface(sandbox, node, options) {}
    
    // Called by application every time module should be started
    ModuleInterface.prototype.init = function() {
            throw new Error("ModuleInterface::init is not implemented");
    }

    // Called by application when module should be destroyed
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
    
    ModuleInterface.prototype.disable = function() {
        throw new Error("ModuleInterface::disable is not implemented");
    }
    
    ModuleInterface.prototype.enable = function() {
        throw new Error("ModuleInterface::enable is not implemented");
    }
    
    return ModuleInterface;
});