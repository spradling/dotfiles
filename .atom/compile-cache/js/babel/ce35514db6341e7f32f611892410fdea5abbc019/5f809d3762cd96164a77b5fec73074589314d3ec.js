Object.defineProperty(exports, '__esModule', {
  value: true
});
/** @babel */

var formatter = {
  space: function space(scope) {
    var softTabs = atom.config.get('editor.softTabs', { scope: scope });
    var tabLength = Number([atom.config.get('editor.tabLength', { scope: scope })]);
    if (softTabs) {
      return Array(tabLength + 1).join(' ');
    } else {
      return '\t';
    }
  },

  stringify: function stringify(obj, options) {
    var scope = (options != null ? options.scope : undefined) != null ? options.scope : null;
    var sorted = (options != null ? options.sorted : undefined) != null ? options.sorted : false;

    // lazy load requirements
    var JSONbig = require('json-bigint');
    var stringify = require('json-stable-stringify');
    require('bignumber.js');

    var space = formatter.space(scope);
    if (sorted) {
      return stringify(obj, {
        space: space,
        replacer: function replacer(key, value) {
          try {
            if (value.constructor.name === 'BigNumber') {
              return JSONbig.stringify(value);
            }
          } catch (error) {
            // ignore
          }
          return value;
        }
      });
    } else {
      return JSONbig.stringify(obj, null, space);
    }
  },

  parseAndValidate: function parseAndValidate(text) {
    var JSONbig = require('json-bigint'); // lazy load requirements
    try {
      return JSONbig.parse(text);
    } catch (error) {
      if (atom.config.get('pretty-json.notifyOnParseError')) {
        atom.notifications.addWarning('JSON Pretty: ' + error.name + ': ' + error.message + ' at character ' + error.at + ' near "' + error.text + '"');
      }
      throw error;
    }
  },

  pretty: function pretty(text, options) {
    var parsed = undefined;
    try {
      parsed = formatter.parseAndValidate(text);
    } catch (error) {
      return text;
    }
    return formatter.stringify(parsed, options);
  },

  minify: function minify(text) {
    try {
      formatter.parseAndValidate(text);
    } catch (error) {
      return text;
    }
    var uglify = require('jsonminify'); // lazy load requirements
    return uglify(text);
  },

  jsonify: function jsonify(text, options) {
    var vm = require('vm'); // lazy load requirements
    try {
      vm.runInThisContext('newObject = ' + text);
    } catch (error) {
      if (atom.config.get('pretty-json.notifyOnParseError')) {
        atom.notifications.addWarning('JSON Pretty: eval issue: ' + error);
      }
      return text;
    }
    return formatter.stringify(newObject, options); // eslint-disable-line no-undef
  }
};

exports['default'] = formatter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9janNwcmFkbGluZy8uYXRvbS9wYWNrYWdlcy9wcmV0dHktanNvbi9zcmMvZm9ybWF0dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsSUFBTSxTQUFTLEdBQUc7QUFDaEIsT0FBSyxFQUFDLGVBQUMsS0FBSyxFQUFFO0FBQ1osUUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUM5RCxRQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMxRSxRQUFJLFFBQVEsRUFBRTtBQUNaLGFBQU8sS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDdEMsTUFBTTtBQUNMLGFBQU8sSUFBSSxDQUFBO0tBQ1o7R0FDRjs7QUFFRCxXQUFTLEVBQUMsbUJBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUN2QixRQUFNLEtBQUssR0FBRyxBQUFDLENBQUMsT0FBTyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQSxJQUFLLElBQUksR0FBSSxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtBQUM1RixRQUFNLE1BQU0sR0FBRyxBQUFDLENBQUMsT0FBTyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQSxJQUFLLElBQUksR0FBSSxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTs7O0FBR2hHLFFBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUN0QyxRQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtBQUNsRCxXQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7O0FBRXZCLFFBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDcEMsUUFBSSxNQUFNLEVBQUU7QUFDVixhQUFPLFNBQVMsQ0FBQyxHQUFHLEVBQUU7QUFDcEIsYUFBSyxFQUFMLEtBQUs7QUFDTCxnQkFBUSxFQUFDLGtCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDcEIsY0FBSTtBQUNGLGdCQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtBQUMxQyxxQkFBTyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ2hDO1dBQ0YsQ0FBQyxPQUFPLEtBQUssRUFBRTs7V0FFZjtBQUNELGlCQUFPLEtBQUssQ0FBQTtTQUNiO09BQ0YsQ0FDQSxDQUFBO0tBQ0YsTUFBTTtBQUNMLGFBQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO0tBQzNDO0dBQ0Y7O0FBRUQsa0JBQWdCLEVBQUMsMEJBQUMsSUFBSSxFQUFFO0FBQ3RCLFFBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUN0QyxRQUFJO0FBQ0YsYUFBTyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQzNCLENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDZCxVQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLEVBQUU7QUFDckQsWUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLG1CQUNYLEtBQUssQ0FBQyxJQUFJLFVBQUssS0FBSyxDQUFDLE9BQU8sc0JBQWlCLEtBQUssQ0FBQyxFQUFFLGVBQVUsS0FBSyxDQUFDLElBQUksT0FDMUYsQ0FBQTtPQUNGO0FBQ0QsWUFBTSxLQUFLLENBQUE7S0FDWjtHQUNGOztBQUVELFFBQU0sRUFBQyxnQkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3JCLFFBQUksTUFBTSxZQUFBLENBQUE7QUFDVixRQUFJO0FBQ0YsWUFBTSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUMxQyxDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2QsYUFBTyxJQUFJLENBQUE7S0FDWjtBQUNELFdBQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7R0FDNUM7O0FBRUQsUUFBTSxFQUFDLGdCQUFDLElBQUksRUFBRTtBQUNaLFFBQUk7QUFDRixlQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDakMsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNkLGFBQU8sSUFBSSxDQUFBO0tBQ1o7QUFDRCxRQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDcEMsV0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7R0FDcEI7O0FBRUQsU0FBTyxFQUFFLGlCQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDdkIsUUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLFFBQUk7QUFDRixRQUFFLENBQUMsZ0JBQWdCLGtCQUFnQixJQUFJLENBQUcsQ0FBQTtLQUMzQyxDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2QsVUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFO0FBQ3JELFlBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSwrQkFBNkIsS0FBSyxDQUFHLENBQUE7T0FDbkU7QUFDRCxhQUFPLElBQUksQ0FBQTtLQUNaO0FBQ0QsV0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtHQUMvQztDQUNGLENBQUE7O3FCQUVjLFNBQVMiLCJmaWxlIjoiL1VzZXJzL2Nqc3ByYWRsaW5nLy5hdG9tL3BhY2thZ2VzL3ByZXR0eS1qc29uL3NyYy9mb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGJhYmVsICovXG5cbmNvbnN0IGZvcm1hdHRlciA9IHtcbiAgc3BhY2UgKHNjb3BlKSB7XG4gICAgY29uc3Qgc29mdFRhYnMgPSBhdG9tLmNvbmZpZy5nZXQoJ2VkaXRvci5zb2Z0VGFicycsIHsgc2NvcGUgfSlcbiAgICBjb25zdCB0YWJMZW5ndGggPSBOdW1iZXIoW2F0b20uY29uZmlnLmdldCgnZWRpdG9yLnRhYkxlbmd0aCcsIHsgc2NvcGUgfSldKVxuICAgIGlmIChzb2Z0VGFicykge1xuICAgICAgcmV0dXJuIEFycmF5KHRhYkxlbmd0aCArIDEpLmpvaW4oJyAnKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1xcdCdcbiAgICB9XG4gIH0sXG5cbiAgc3RyaW5naWZ5IChvYmosIG9wdGlvbnMpIHtcbiAgICBjb25zdCBzY29wZSA9ICgob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5zY29wZSA6IHVuZGVmaW5lZCkgIT0gbnVsbCkgPyBvcHRpb25zLnNjb3BlIDogbnVsbFxuICAgIGNvbnN0IHNvcnRlZCA9ICgob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5zb3J0ZWQgOiB1bmRlZmluZWQpICE9IG51bGwpID8gb3B0aW9ucy5zb3J0ZWQgOiBmYWxzZVxuXG4gICAgLy8gbGF6eSBsb2FkIHJlcXVpcmVtZW50c1xuICAgIGNvbnN0IEpTT05iaWcgPSByZXF1aXJlKCdqc29uLWJpZ2ludCcpXG4gICAgY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdGFibGUtc3RyaW5naWZ5JylcbiAgICByZXF1aXJlKCdiaWdudW1iZXIuanMnKVxuXG4gICAgY29uc3Qgc3BhY2UgPSBmb3JtYXR0ZXIuc3BhY2Uoc2NvcGUpXG4gICAgaWYgKHNvcnRlZCkge1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeShvYmosIHtcbiAgICAgICAgc3BhY2UsXG4gICAgICAgIHJlcGxhY2VyIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQmlnTnVtYmVyJykge1xuICAgICAgICAgICAgICByZXR1cm4gSlNPTmJpZy5zdHJpbmdpZnkodmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIGlnbm9yZVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gSlNPTmJpZy5zdHJpbmdpZnkob2JqLCBudWxsLCBzcGFjZSlcbiAgICB9XG4gIH0sXG5cbiAgcGFyc2VBbmRWYWxpZGF0ZSAodGV4dCkge1xuICAgIGNvbnN0IEpTT05iaWcgPSByZXF1aXJlKCdqc29uLWJpZ2ludCcpIC8vIGxhenkgbG9hZCByZXF1aXJlbWVudHNcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT05iaWcucGFyc2UodGV4dClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGF0b20uY29uZmlnLmdldCgncHJldHR5LWpzb24ubm90aWZ5T25QYXJzZUVycm9yJykpIHtcbiAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoXG4gICAgICAgICAgYEpTT04gUHJldHR5OiAke2Vycm9yLm5hbWV9OiAke2Vycm9yLm1lc3NhZ2V9IGF0IGNoYXJhY3RlciAke2Vycm9yLmF0fSBuZWFyIFwiJHtlcnJvci50ZXh0fVwiYFxuICAgICAgICApXG4gICAgICB9XG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfSxcblxuICBwcmV0dHkgKHRleHQsIG9wdGlvbnMpIHtcbiAgICBsZXQgcGFyc2VkXG4gICAgdHJ5IHtcbiAgICAgIHBhcnNlZCA9IGZvcm1hdHRlci5wYXJzZUFuZFZhbGlkYXRlKHRleHQpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZXIuc3RyaW5naWZ5KHBhcnNlZCwgb3B0aW9ucylcbiAgfSxcblxuICBtaW5pZnkgKHRleHQpIHtcbiAgICB0cnkge1xuICAgICAgZm9ybWF0dGVyLnBhcnNlQW5kVmFsaWRhdGUodGV4dClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG4gICAgY29uc3QgdWdsaWZ5ID0gcmVxdWlyZSgnanNvbm1pbmlmeScpIC8vIGxhenkgbG9hZCByZXF1aXJlbWVudHNcbiAgICByZXR1cm4gdWdsaWZ5KHRleHQpXG4gIH0sXG5cbiAganNvbmlmeSAgKHRleHQsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB2bSA9IHJlcXVpcmUoJ3ZtJykgLy8gbGF6eSBsb2FkIHJlcXVpcmVtZW50c1xuICAgIHRyeSB7XG4gICAgICB2bS5ydW5JblRoaXNDb250ZXh0KGBuZXdPYmplY3QgPSAke3RleHR9YClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGF0b20uY29uZmlnLmdldCgncHJldHR5LWpzb24ubm90aWZ5T25QYXJzZUVycm9yJykpIHtcbiAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoYEpTT04gUHJldHR5OiBldmFsIGlzc3VlOiAke2Vycm9yfWApXG4gICAgICB9XG4gICAgICByZXR1cm4gdGV4dFxuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0dGVyLnN0cmluZ2lmeShuZXdPYmplY3QsIG9wdGlvbnMpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXR0ZXJcbiJdfQ==