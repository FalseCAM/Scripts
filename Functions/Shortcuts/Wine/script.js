var WineShortcut = function () {
    var that = this;
    that._shortcutManager = Bean("shortcutManager");
    that._appsManager = Bean("repositoryManager");
    that._fileSearcher = Bean("fileSearcher");
    that._winePrefixesDirectory = Bean("propertyReader").getProperty("application.user.wineprefix");

    that._category = "Other";
    that._description = "";

    that.name = function (name) {
        that._name = name;
        return that;
    };

    that.category = function (category) {
        that._category = category;
        return that;
    };

    that.description = function (description) {
        that._description = description;
        return that;
    };

    that.arguments = function(arguments) {
        that._arguments = arguments;
        return that;
    };

    that.search = function(search) {
        that._search = search;
        return that;
    };

    that.prefix = function(prefix) {
        that._prefix = prefix;
        return that;
    };

    that.miniature = function(miniature) {
      if(isArray(miniature)) {
          var application = that._appsManager.getApplication(miniature);
          if(application != null && application.miniatures != null && application.miniatures[0] != null) {
              that._miniature = application.miniatures[0];
          }
      }

        return that;
    };

    that.create = function () {
        var _shortcutPrefixDirectory = that._winePrefixesDirectory + "/" + that._prefix;

        var executables = that._fileSearcher.search(_shortcutPrefixDirectory, that._search);

        if (executables.length == 0) {
            throw "Executable " + that._search + " not found!"
        }

        var builder = new org.phoenicis.library.dto.ShortcutDTO.Builder()
            .withCategory(that._category)
            .withName(that._name)
            .withDescription(that._description)
            .withScript(JSON.stringify({
                type: "WINE",
                wineDebug: "-all",
                winePrefix: that._prefix,
                arguments: that._arguments,
                workingDirectory:executables[0].getParentFile().getAbsolutePath(),
                executable: executables[0].getAbsolutePath()
            }));

        if(that._miniature) {
            builder.withMiniature(that._miniature);
        }

        that._shortcutManager.createShortcut(
            builder.build()
        );
    }
};
