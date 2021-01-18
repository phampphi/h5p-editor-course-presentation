H5PEditor.CoursePresentation.TimeSettings = (function ($, EventDispatcher) {

  /**
   * Create a Time Settings.
   *
   * @class H5PEditor.CoursePresentation.TimeSettings
   * @extends H5P.EventDispatcher Allows pub/sub
   * @param {jQuery} $backgroundSlides Elements to paint
   */
  function TimeSettings($backgroundSlides) {
    var self = this;

    // Inheritance
    EventDispatcher.call(self);

    // Background selector wrapper
    var $timeSettings = $('<div>', {
      'class': 'h5p-time-settings'
    });

    // Description field
    var $descriptionField = $('<div>', {
      'class': 'h5p-time-settings-description',
      appendTo: $timeSettings
    });

    // Bg selector widget
    var $timeSettingsContent = $('<div>', {
      'class': 'h5p-time-settings-content',
      appendTo: $timeSettings
    });

    // Outsource readies
    self.passReadies = true;

    /**
       * Create a new background selector and add to collection
       *
       * @param {array|Object} fields Semantics for processing background selector
       * @param {Object} params Parameters belonging to semantics
       * @param {jQuery} $wrapper Element that we will append to
       * @param {bgOptions} [options] Additional background options
       */
    self.addTimeSettings = function (fields, params, $wrapper, options) {
      options = options || {};

      $timeSettings.toggleClass('show', options.isVisible);

      // Process semantics into background selector
      H5PEditor.processSemanticsChunk(H5P.jQuery.makeArray(fields), params, $timeSettingsContent, self);

      // Insert after previous index
      if (options.index && (options.index > 0) && (options.index < $wrapper.children().length)) {
        $timeSettings.insertAfter($wrapper.children('.single').eq(options.index - 1));
      }
      else {
        $timeSettings.appendTo($wrapper);
      }

      return self;
    };

    /**
       * Set description at the top of the background selector
       *
       * @param {string} description
       * @returns {H5PEditor.CoursePresentation.BackgroundSelector}
       */
    self.setDescription = function (description) {
      $descriptionField.html(description);

      return self;
    };

    /**
     * Remove background selector element, used when deleting slides.
     *
     * @returns {H5PEditor.CoursePresentation.BackgroundSelector}
     */
    self.removeElement = function () {
      if ($timeSettings) {
        $timeSettings.remove();
      }
      return self;
    };
  }

  // Inheritance
  TimeSettings.prototype = Object.create(EventDispatcher.prototype);
  TimeSettings.prototype.constructor = TimeSettings;

  return TimeSettings;
})(H5P.jQuery, H5P.EventDispatcher);
