(function (ns, d3, _, $, undefined) {

    var defaults = {
        line: {
            marker: {
                enable: true,
                size: 2.5
            }
        }
    };


    function render(data, layer, options, id) {

        var x = _.bind(function (d) { return this.xScale(d.x) + this.rangeBand / 2; }, this);
        var y = _.bind(function (d) { return this.yScale(d.y); }, this);
        var normalizeData = data;

        var line = d3.svg.line()
            .x(function (d) { return x(d); })
            .y(function (d) { return y(d); });

        _.each(data, function (d, i) {
            appendPath.call(this, d.data, d.name, i+1);
        }, this);

        function appendPath(data, seriesName, seriesIndex) {
            seriesName = seriesName ? seriesName.replace(/\s/, '_') : '';

            var nonNullData = _.filter(data, function (d) { return d.y != null; });
            var markerSize = this.options.line.marker.size;
            var className = ['v-' + id, 's-' + seriesIndex, seriesName].join(' ');
            var path = layer.append('path').datum(nonNullData).attr('class', 'line ' + className);
            var renderPath = this.options.chart.animations ? renderAnimatedPath : renderSimplePath;
            var renderMakers = this.options.line.marker.enable ? renderLineMarkers : $.noop;

            renderPath();
            renderMakers();
            renderTooltipTrackers();


            function renderAnimatedPath() {
                if(!nonNullData[0]) return ;
                path.attr('d', line(nonNullData[0]))
                    .transition().duration(600)
                        .attrTween('d', pathTween);
            }

            function renderSimplePath() {
                path.attr('d', line);

            }

            function renderLineMarkers() {
                layer.append('g').attr('class', 'line-chart-markers')
                    .selectAll('dot')
                        .data(nonNullData)
                    .enter().append('circle')
                        .attr('class', 'dot ' + className)
                        .attr('r', markerSize)
                        .attr('cx', x)
                        .attr('cy', y);

            }

            function renderTooltipTrackers(){
                var trackerSize = 10;
                // add the tooltip trackers regardless
                layer.append('g').attr('class', 'tooltip-trackers')
                    .selectAll('tooltip-tracker')
                        .data(nonNullData)
                    .enter().append('circle')
                        .attr('class', 'tooltip-tracker')
                        .attr('opacity', 0)
                        .attr('r', trackerSize)
                        .attr('cx', x)
                        .attr('cy', y);
            }

            function pathTween() {
                var _data = nonNullData;
                var interpolate = d3.scale.quantile().domain([0,1])
                        .range(d3.range(1, _data.length + 1));
                return function(t) {
                    return line(_data.slice(0, interpolate(t)));
                };
            }
        }

        return this;
    }

    render.defaults = defaults;

    Narwhal.export('line', render);

})('Narwhal', window.d3, window._, window.jQuery);
