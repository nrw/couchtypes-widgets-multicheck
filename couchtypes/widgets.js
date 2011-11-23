(function() {
  var Widget, _;

  Widget = require('couchtypes/widgets').Widget;

  _ = require('underscore')._;

  exports.multicheckbox = function(options) {
    var w;
    w = new Widget('multicheckbox', options);
    w.rows = options.rows || [];
    w.toHTML = function(name, value, raw, field, options) {
      var html, r, r_id, _i, _len, _ref;
      this.id = this._id(name, options.offset, options.path_extra);
      html = "<div id=\"" + this.id + "\">";
      html += "<input name=\"" + this._name(name, options.offset) + "\" " + "type=\"hidden\" value=\"[]\"/>";
      html += '<ul>';
      _ref = this.rows;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        r_id = this.id + '_' + r._id;
        html += '<li>';
        html += '<input type="checkbox" id="' + r_id + '" value="' + r.name + '" />';
        html += '<label for="' + r_id + '">' + r.name + '</label>';
        html += '</li>';
      }
      html += "</ul>";
      return html += "</div>";
    };
    w.clientInit = function(field, path, value, raw, errors, options) {
      var el;
      el = $('#' + this.id + ' input[type=hidden]').first();
      return $('#' + this.id + ' input[type=checkbox]').change(function(event) {
        var box, index, list;
        list = JSON.parse(el.attr("value"));
        box = event.target;
        index = list.indexOf(box.value);
        if (box.checked && index === -1) {
          list.push(box.value);
        } else if (index !== -1) {
          list = _.reject(list, function(id) {
            return id === box.value;
          });
        }
        return el.val(JSON.stringify(list));
      });
    };
    return w;
  };

}).call(this);
