#### **title** : { string }

<% if(defaultValue !== "[object Object]") { %>*default: <%= defaultValue %>* <% }%>

The title to display for this axis. 	    

**Example:**

    new Contour({
        el: '.myLineChart',
        yAxis: { title: 'Value', titlePadding: 40 }
      })
    .cartesian()
    .line(data)
    .render()

*[Try it.](<%= jsFiddleLink %>)*

**Notes:**

[`titlePadding`](#config_config.yAxis.titlePadding) determines the distance below the axis and [`chart.padding.left`](#config_config.chart.padding.left), in pixels, where the axis `title` is drawn. 

<% if(notes) { %><%= notes %><% } %>

